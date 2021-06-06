import { Request, Response, NextFunction, Router } from "express";

import { BirdModel } from "../models";

const birdsRouter = Router();

birdsRouter.use((_req: Request, _res: Response, next: NextFunction) => {
  console.log("Time: ", Date.now());
  next();
});

/**
 * @swagger
 * /bird?id={id}:
 *   get:
 *     summary: Get bird by id
 *     description: This will return the bird
 *     tags:
 *       - /bird
 *     responses:
 *       200:
 *         description: that bird
 *         schema:
 *           type: object
 *           properties:
 *             bird:
 *               type: object
 *               description: that bird
 */
birdsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const bird = await BirdModel.findById(req.query.id);

    res.send(bird);
  } catch (err) {
    console.log("\n");
    console.error(err);
  }
});

/**
 * @swagger
 * /bird/list:
 *   get:
 *     summary: Get a list of birds
 *     description: This will return a list of birds
 *     tags:
 *       - /bird
 *     responses:
 *       200:
 *         description: list of birds
 *         schema:
 *           type: object
 *           properties:
 *             bird:
 *               type: object
 *               description: list of birds
 */
birdsRouter.get("/list", async (_req: Request, res: Response) => {
  try {
    const birds = await BirdModel.find({});

    res.send(birds);
  } catch (err) {
    console.log("\n");
    console.error(err);
    res.send(err);
  }
});

/**
 * @swagger
 * /bird/create:
 *   post:
 *     summary: Create a bird
 *     description: This will create a new bird
 *     tags:
 *       - /bird
 *     parameters:
 *       - name: name
 *         in: json
 *         required: true
 *       - name: description
 *         in: json
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: that bird
 *         schema:
 *           type: object
 *           properties:
 *             bird:
 *               type: object
 *               description: that bird
 */
birdsRouter.post("/create", async (req: Request, res: Response) => {
  try {
    const bird = await BirdModel.create(req.body);

    res.send(bird);
  } catch (err) {
    console.log("\n");
    console.error(err);
  }
});

/**
 * @swagger
 * /bird/update:
 *   put:
 *     summary: Update bird by id
 *     description: Return that bird
 *     tags:
 *       - /bird
 *     parameters:
 *       - name: id
 *         in: json
 *         required: true
 *       - name: name
 *         in: json
 *         required: false
 *       - name: description
 *         in: json
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: that bird
 *         schema:
 *           type: object
 *           properties:
 *             bird:
 *               type: object
 *               description: that bird
 */
birdsRouter.put("/update", async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    await BirdModel.update({ _id: req.body.id }, { name, description });
    res.send();
  } catch (err) {
    console.log("\n");
    console.error(err);
    res.send(err);
  }
});

/**
 * @swagger
 * /bird?id={id}:
 *   delete:
 *     summary: Delete bird by id
 *     description: This will delete the bird
 *     tags:
 *       - /bird
 *     responses:
 *       200:
 */
birdsRouter.delete("/", async (req: Request, res: Response) => {
  try {
    const bird = await BirdModel.findById(req.query.id).remove().exec();

    res.send(bird);
  } catch (err) {
    console.log("\n");
    console.error(err);
  }
});

export { birdsRouter };
