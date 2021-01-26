import { File } from "@/domain/models";
import { Request, Response, NextFunction } from "express";

export const fileHandler = (req: Request, _: Response, next: NextFunction) => {
  const { files } = req as Request & {
    files:
      | {
          [fieldname: string]: Express.Multer.File[];
        }
      | Express.Multer.File[];
  };

  const mappedFiles: File[] = (files as Express.Multer.File[] || []).map((file) => ({
    name: file.originalname,
    type: file.mimetype,
    content: file.buffer,
    size: file.size,
    extension: `${file.originalname.split(".").pop()}`,
  }));

  Object.assign(req.body, { files: mappedFiles });
  return next();
};
