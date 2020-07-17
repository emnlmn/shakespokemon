import { Next, Request, RequestHandler, Response } from 'restify';
import { HttpError, InternalServerError } from 'restify-errors';

export default (callback: RequestHandler) => async (req: Request, res: Response, next: Next) => {
  try {
    await callback(req, res, next);
  } catch (err) {
    next(err instanceof HttpError ? err : new InternalServerError(err));
  }
};
