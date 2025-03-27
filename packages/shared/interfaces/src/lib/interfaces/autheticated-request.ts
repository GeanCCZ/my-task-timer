import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: {
    userID: string;
  };
}
