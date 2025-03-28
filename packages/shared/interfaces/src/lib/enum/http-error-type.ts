export const HttpErrorType = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  BAD_REQUEST: 'BAD_REQUEST',
  NOT_FOUND: 'NOT_FOUND',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  CONFLICT: 'CONFLICT',
} as const;


// {
//   "error": true,
//   "status": 404,
//   "message": "User not found",
//   "list": {
//    if error true return the request body
//   if error false return response
// },
//   "timestamp": "2024-03-27T12:34:56.789Z",
// }
