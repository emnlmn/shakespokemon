import { Next, Request, RequestHandler, Response } from 'restify';

export default (req: Request, res: Response, next: Next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  return next();
};