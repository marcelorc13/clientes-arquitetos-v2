import { Router } from "express";
import GenerateController from "../controllers/generate-controller";

export const generateRouter = Router()

generateRouter.post("/xlsx", GenerateController.generateXlsx)