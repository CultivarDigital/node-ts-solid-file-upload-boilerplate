import { Router, Request, Response } from "express";
import { container } from "tsyringe";
import multer from "multer";
import { Joi, Segments, errors, celebrate } from "celebrate";

import { FileUploadController } from "@/presentation/controllers";
import { fileHandler } from "@/presentation/middlewares/file-handler";

const upload = multer();

const uploadRouter = Router();

const fileUploadController = container.resolve(FileUploadController);

uploadRouter.post(
  "/",
  // celebrate({
  //   [Segments.BODY]: Joi.object().keys({
  //     files: Joi.required(),
  //   }),
  // }),
  upload.array("files", 5),
  fileHandler,
  async (req: Request, res: Response) => {
    const { statusCode, body } = await fileUploadController.handle({
      body: req.body,
    });
    return res.status(statusCode).json(body);
  }
);

uploadRouter.use(errors());

export default uploadRouter;
