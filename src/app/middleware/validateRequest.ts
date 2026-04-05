import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

const validateRequest =
  (schema: ZodType<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });

      // Object.assign(req, parsed);

      req.body = parsed.body;
      // req.query = parsed.query;
      // req.params = parsed.params;
      // req.cookies = parsed.cookies;

      next();
    } catch (error) {
      next(error);
    }
  };

export default validateRequest;
