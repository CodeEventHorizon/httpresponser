/*
 * Author(s): Nikoloz Muladze
 * Date Created: 25/05/2023
 * Description: This code is used for returning HTTP response status codes
 * with their corresponding message, data and stack trace
 * REFS:
 * * Status Codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 * * Browser Compatibility: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#browser_compatibility
 */

const response = function (status, message, data, stack) {
  const res = {};
  res.status = status;
  if (message) res.message = message;
  res.stack = stack;
  res.data = data || {};
  return res;
};

//! Informational responses (100-199)

//! 100 Continue
/*
 * This interim response indicates that the client should continue
 * the request or ignore the reponse if the request is already finished
 */
const continueResponse = function (message) {
  return this.response(100, message);
};

//! 101 Switching Protocols
/*
 * This code is sent in response to an Upgrade request header from the client
 * and indicates the protocol the server is switching to
 */
const switchingProtocols = function (message) {
  return this.response(101, message);
};

//! 102 Processing (WebDAV)
/*
 * This code indicates that the server has received and
 * is processing the request, but no response is available yet.
 */
const processing = function (message) {
  return this.response(102, message);
};

//! Successful responses (200-299)

//! 200 OK
/*
 * The request succeeded. The result meaning of "success" depends on the HTTP method:
 * * GET: The resource has been fetched and transmitted in the message body.
 * * HEAD: The representation headers are included in the response without any message body.
 * * PUT or POST: The resource describing the result of the action is transmitted in the message body
 * * TRACE: The message body contains the request message as received by the server
 */
const success = function (data, key) {
  return this.response(200, '', data, key);
};

const successMessage = function (data, message, key) {
  return this.response(200, message, data);
};

//! 201 Created
/*
 * The request succeeded, and a new resource was created as a result.
 * This is typically the response sent after POST request, or some PUT requests.
 */
const created = function (key) {
  return this.response(201, { key: key || 'PENDING' });
};

//! 202 accepted
/*
 * The request has been received but not yet acted upon. it is noncommittal,
 * since there is no way in HTTP to later send an asynchronous response indicating
 * the outcome of the request. It is intended for cases where another process
 * or server handles the request, or for batch processing
 */
const accepted = function (key) {
  return this.response(202, { key: key || 'ACCEPTED' });
};

//! 203 Non-Authoritative Information
/*
 * This response code means the returned metadata is not exactly the same as is
 * available from the origin server, but is collected from local or a third-party copy.
 * This is mostly used for mirrors or backups of another resource.
 * Except for that specific case, the 200 OK response is preferred to this status
 */
const nonAuthoritativeInfo = function (message) {
  return this.response(203, message);
};

//! 204 No Content
/*
 * There is no content to send for this request, but the headers may be useful.
 * The user agent may update this cached headers for this resource with the new ones.
 */
const noContent = function (key) {
  return this.response(204, { key: key || 'NO_CONTENT' });
};

//! 205 Reset Content
/*
 * Tells the user agent to reset the document which sent this request
 */
const resetContent = function (message) {
  return this.response(205, message);
};

//! 206 Partial Content
/*
 * This response code is used when the Range header is sent from the client
 * to request only part of a resource
 */
const partialContent = function (message) {
  return this.response(206, message);
};

//! 207 Multi-Status (WebDAV)
/*
 * Conveys information about multiple resources, for situations where multiple
 * status codes might be appropriate.
 */
const multiStatus = function (message) {
  return this.response(207, message);
};

//! 208 Already Reported (WebDAV)
/*
 * Used inside a <dav:propstat> response element to avoid repeatedly enumerating
 * the internal members of multiple bindings to the same collection
 */
const alreadyReported = function (message) {
  return this.response(208, message);
};

//! 226 IM Used (HTTP Delta encoding)
/*
 * The server has fulfilled a GET request for the resource,
 * and the response is a representation of the result of
 * one or more instance-manipulations applied to the current instance
 */
const imUsed = function (message) {
  return this.response(226, message);
};

//! Redirection messages (300-399)

//! 300 Multiple Choices
/*
 * The request has more than one possible response. The user agent or user should
 * choose one of them. (There is no standardized way of choosing one of the responses,
 * but HTML links to the possibilites are recommended so the user can pick)
 */
const multipleChoices = function (message) {
  return this.response(300, message);
};

//! 301 Moved Permanently
/*
 * The URL of the requested resource has been changed permanently.
 * The new URL is given in the response.
 */
const movedPermanently = function (message) {
  return this.response(301, message);
};

//! 302 Found
/*
 * This response code means that the URI of requested resource
 * has been changed temporarily. Further changes in the URI might be made in the future.
 * Therefore, this same URI should be used by the client in future requests.
 */
const found = function (message) {
  return this.response(302, message);
};

//! 303 See Other
/*
 * The server sent this response to direct the client to get the request resource
 * at another URI with a GET request.
 */
const seeOther = function (message) {
  return this.response(303, message);
};

//! 304 Not Modified
/*
 * This is used for caching purposes. It tells the client that the response has not been modified,
 * so the client can continue to use the same cached version of the response.
 */
const notModified = function (message) {
  return this.response(304, message);
};

//! 307 Temporary Redirect
/*
 * The server sends this response to direct the client to get the requested resource
 * at another URI with the same method that was used in the prior request.
 * This has the same semantics as the 302 Found HTTP response code, with the exception
 * that user agent must not change the HTTP method used: if a POST was used in the first request,
 * a POST must be used in the second request.
 */
const temporaryRedirect = function (message) {
  return this.response(307, message);
};

//! 308 Permanent Redirect
/*
 * This means that the resource is now permanently located at another URI, specified by the
 * Location: HTTP Response header. This has the same semantics as the 301 Moved Permanently
 * HTTP response code, with the exception that the user agent must not change the HTTP method
 * used: if a POST was used in the first request, a POST must be used in the second request.
 */
const permanentRedirect = function (message) {
  return this.response(308, message);
};

//! Client error responses (400-499)

//! 400 Bad Request
/*
 * The server cannot or will not process the request due to something that is perceived to be
 * a client error (e.g., malformed request syntax, invalid request message framing, or
 * deceptive request routing).
 */
const badRequest = function (message) {
  return this.response(400, message);
};

//! 401 Unauthorized
/*
 * Although the HTTP standard specified "unauthorized", semantically this response means
 * "unauthenticated". That is, the client must authenticate itself to get the requested response.
 */
const unauthorized = function () {
  return this.response(401, 'Not Authorized');
};

//! 403 Forbidden
/*
 * The client does not have access rights to the content; that is, it is unauthorized,
 * so the server is refusing to give the requested resource. Unlike 401 Unauthorized,
 * the client's identity is known to the server
 */
const forbidden = function (message, data) {
  return this.response(403, message, data);
};

//! 404 Not Found
/*
 * The server cannot find the requested resource. In the browser, this means the URL
 * is not recognized. In an API, this can also mean that the endpoint is valid but
 * the resource itself does not exist. Servers may also send this response instead of
 * 403 Forbidden to hide the existence of a resource from an unauthorized client.
 * This response code is probably the most well known due to its frequent occurrence on the web.
 */
const notFound = function (key) {
  return this.response(404, { key: key || 'ERR_NOT_FOUND' });
};

//! 405 Method Not Allowed
/*
 * The request method is known by the server but is not supported by the target resource.
 * For example, an API may not allow calling DELETE to remove a resource.
 */
const methodNotAllowed = function (message) {
  return this.response(405, message);
};

//! 406 Not Acceptable
/*
 * This response is sent when the web server, after performing server-driven content negotiation,
 * doesn't find any content that conforms to the criteria given by the user agent.
 */
const notAcceptable = function (key) {
  return this.response(406, { key: key || 'NOT_ACCEPTABLE' });
};

//! 407 Proxy Authentication Required
/*
 * This is similar to 401 Unauthorized but authentication is needed to be done by proxy
 */
const proxyAuthenticationRequired = function (message) {
  return this.response(407, message);
};

//! 408 Request Timeout
const requestTimeout = function (message) {
  return this.response(408, message);
};

//! 409 Conflict
/*
 * This response is sent when a request conflicts with the current state of the server
 */
const conflict = function (message) {
  return this.response(409, message);
};

//! 410 Gone
/*
 * This response is sent when the requested content has been permanently deleted from server,
 * with no forwarding address. Clients are expected to remove their caches and links to the resource.
 * The HTTP specification intends this status code to be used for "limited-time, promotional services".
 * APIs should not feel compelled to indicate resources that have been deleted with this status code.
 */
const gone = function (message) {
  return this.response(410, message);
};

//! 411 Length Required
/*
 * Server rejected the request because the Content-Length
 * header field is not defined and the server requires it.
 */
const lengthRequired = function (message) {
  return this.response(411, message);
};

//! 412 Precondition Failed
/*
 * The client has indicated preconditions in its headers which the server does not meet.
 */
const preconditionFailed = function (message) {
  return this.response(412, message);
};

//! 413 Payload Too Large
/*
 * Request entity is larger than limits defined by server. The server might close
 * the connection or return an Retry-After header field.
 */
const payloadTooLarge = function (message) {
  return this.response(413, message);
};

//! 414 URI Too Long
/*
 * The URI requested by the client is longer than the server is willing to interpret
 */
const uriTooLong = function (message) {
  return this.response(414, message);
};

//! 415 Unsupported Media Type
/*
 * The media format of the requested data is not supported by the server,
 * so the server is rejecting the request
 */
const unsupportedMediaType = function (message) {
  return this.response(415, message);
};

//! 416 Range Not Satisfiable
/*
 * The range specified by the Range header field in the request cannot be fulfilled.
 * It's possible that the range is outside the size of the target URI's data.
 */
const rangeNotSatisfiable = function (message) {
  return this.response(416, message);
};

//! 417 Expectation Failed
/*
 * This response code means the expectation indicated by the Expect request header
 * field cannot be met by the server
 */
const expectationFailed = function (message) {
  return this.response(417, message);
};

//! 418 I'm a teapot
/*
 * The server refuses the attempt to brew coffee with a teapot
 */
const teapot = function (message) {
  return this.response(418, message);
};

//! 421 Misdirected Request
/*
 * The request was directed at a sever that is not able to produce a response.
 * This can be sent by a server that is not configured to produce responses for
 * the combination of scheme and authority that are included in the request URI.
 */
const misdirectedRequest = function (message) {
  return this.response(421, message);
};

//! 422 Unprocessable Content (WebDAV)
/*
 * The request was well-formed but was unable to be followed due to semantic errors.
 */
const unprocessableContent = function (message) {
  return this.response(422, message);
};

//! 423 Locked (WebDAV)
/*
 * The resource that is being accessed is locked.
 */
const locked = function (message) {
  return this.response(423, message);
};

//! 424 Failed Dependency (WebDAV)
/*
 * The request failed due to failure of a previous request.
 */
const failedDependency = function (message) {
  return this.response(424, message);
};

//! 426 Upgrade Required
/*
 * The server refuses to perform the request using the current protocol
 * but might be willing to do so after the client upgrades to a different protocol.
 * The server sends an Upgrade header in a 426 response to indicate the required protocol(s).
 */
const upgradeRequired = function (message) {
  return this.response(426, message);
};

//! 428 Precondition Required
/*
 * The origin server requires the request to be conditional. This response is intended to prevent
 * the 'lost update' problem, where a client GETs a resource's state, modifies it and PUTs it back
 * to the server, when meanwhile a third party has modified the state on the server, leading to a conflict.
 */
const preconditionRequired = function (message) {
  return this.response(428, message);
};

//! 429 Too Many Requests
/*
 * The user has sent too many requests in a given amount of time ("rate limiting").
 */
const tooManyRequests = function (message) {
  return this.response(429, message);
};

//! 431 Request Header Fields Too Large
/*
 * The server is unwilling to process the request because its header fields are too large.
 * The request may be resubmitted after reducing the size of the request header fields.
 */
const requestHeaderFieldsTooLarge = function (message) {
  return this.response(431, message);
};

//! 451 Unavailable For Legal Reasons
/*
 * The user agent requested a resource that cannot legally be provided,
 * such as a web page censored by a government.
 */
const unavailableForLegalReasons = function (message) {
  return this.response(451, message);
};

//! Server error responses (500-599)

//! 500 Internal Server Error
/*
 * The server has encountered a situation it does not know how to handle.
 */
const error = function (err) {
  console.log(err);
  return this.response(500, 'Oops something went wrong');
};

//! 501 Not Implemented
/*
 * The request method is not supported by the server and cannot be handled.
 * The only methods that server are required to support
 * (and therefore that must not return this code) are GET and HEAD.
 */
const notImplemented = function (message) {
  return this.response(501, message);
};

//! 502 Bad Gateway
/*
 * This error response means that the server, while working as a gateway
 * to get a response needed to handle the request, got an invalid response
 */
const badGateway = function (message) {
  return this.response(502, message);
};

//! 503 Service Unavailable
/*
 * The server is not ready to handle the request. Common causes are a server
 * that is down for maintenance or that is overloaded. Note that together with this response,
 * a user-friendly page explaining the problem should be sent. This response should be used for
 * temporary conditions and the Retry-After HTTP header should, if possible,
 * contain the estimated time before the recovery of the service. The webmaster must also take care about
 * the caching-related headers that are sent along with this response,
 * as these temporary condition responses should usually not be cached.
 */
const serviceUnavailable = function (message) {
  return this.response(503, message);
};

//! 504 Gateway Timeout
/*
 * This error response is given when the server is acting as a gateway and cannot get a response in time.
 */
const gatewayTimeout = function (message) {
  return this.response(504, message);
};

//! 505 HTTP version Not Supported
/*
 * The HTTP version used in the request is not supported by the server.
 */
const httpVersionNotSupported = function (message) {
  return this.response(505, message);
};

//! 506 Variant Also Negotiates
/*
 * The server has an internal configuration error: the chosen variant resource is configured
 * to engage in transparent content negotiation itself,
 * and is therefore not a proper end point in the negotiation process.
 */
const variantAlsoNegotiates = function (message) {
  return this.response(506, message);
};

//! 507 Insufficient Storage (WebDAV)
/*
 * The method could not be performed on the resource because the server is unable
 * to store the representation needed to successfully complete the request.
 */
const insufficientStorage = function (message) {
  return this.response(507, message);
};

//! 508 Loop Detected (WebDAV)
/*
 * The server detected an infinite loop while processing the request.
 */
const loopDetected = function (message) {
  return this.response(508, message);
};

//! 510 Not Extended
/*
 * Further extensions to the request are required for the server to fulfill it.
 */
const notExtended = function (message) {
  return this.response(510, message);
};

//! 511 Network Authentication Required
/*
 * Indicates that the client needs to authenticate to gain network access.
 */
const networkAuthenticationRequired = function (message) {
  return this.response(511, message);
};

//! AWS Elastic Load Balancer

//! 460
/*
 * Client closed the connection with the load balancer before the idle timeout period elapsed.
 * Typically when client timeout is sooner than the Elastic Load Balancer's timeout.
 */
const http460 = function (message) {
  return this.response(460, message);
};

//! 463
/*
 * The load balancer received an X-Forwarded-For request header with more than 30 IP addresses.
 */
const http463 = function (message) {
  return this.response(463, message);
};

//! 464
/*
 * Incompatible protocol versions between Client and Origin server.
 * Possible causes:
 * * The request protocol is an HTTP/1.1, while the target group protocol version is a gRPC or HTTP/2.
 * * The request protocol is a gRPC, while the target group protocol version is an HTTP/1.1.
 * * The request protocol is an HTTP/2 and the request is not POST, while target group protocol version is a gRPC.
 */
const http464 = function (message) {
  return this.response(464, message);
};

//! 561 Unauthorized
/*
 * An error around authentication returned by a server registered with a load balancer.
 * You configured a listener rule to authenticate users, but
 * the identity provider (idP) returned an error code when authenticating the user
 */
const http561 = function (message) {
  return this.response(561, message);
};

export default {
  response,
  continueResponse,
  switchingProtocols,
  processing,
  success,
  successMessage,
  created,
  accepted,
  nonAuthoritativeInfo,
  noContent,
  resetContent,
  partialContent,
  multiStatus,
  alreadyReported,
  imUsed,
  multipleChoices,
  movedPermanently,
  found,
  seeOther,
  notModified,
  temporaryRedirect,
  permanentRedirect,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  methodNotAllowed,
  notAcceptable,
  proxyAuthenticationRequired,
  requestTimeout,
  conflict,
  gone,
  lengthRequired,
  preconditionFailed,
  payloadTooLarge,
  uriTooLong,
  unsupportedMediaType,
  rangeNotSatisfiable,
  expectationFailed,
  teapot,
  misdirectedRequest,
  unprocessableContent,
  locked,
  failedDependency,
  upgradeRequired,
  preconditionRequired,
  tooManyRequests,
  requestHeaderFieldsTooLarge,
  unavailableForLegalReasons,
  error,
  notImplemented,
  badGateway,
  serviceUnavailable,
  gatewayTimeout,
  httpVersionNotSupported,
  variantAlsoNegotiates,
  insufficientStorage,
  loopDetected,
  notExtended,
  networkAuthenticationRequired,
  http460,
  http463,
  http464,
  http561
};
