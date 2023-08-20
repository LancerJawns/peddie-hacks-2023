import { Router } from "express";
import plantRouter from "./plant/plant.route";
import { getUserById } from "../../db/user/User";
import { authenticateUser } from "../oauth/oauth.route";
import { validate } from "../../validator";
import { body } from "express-validator";
import prisma from "../../db/db";
import { Prisma } from "@prisma/client";

const userRouter = Router();

userRouter.use(authenticateUser);

userRouter.get("/me", async (req, res) => {
  const user = await getUserById(req.userId!);

  res.status(200).json({
    user: {
      id: user?.id,
      username: user?.username,
      plantTime: user?.plantTime,
    },
  });
});

userRouter.post(
  "/changePlantTime",
  validate([body("time").isInt()]),
  async (req, res) => {
    const time = req.body.time;

    const user = await getUserById(req.userId!);

    if (!user) {
      req.userId = undefined;
      return res.status(404).json({ message: "User not found" });
    }

    prisma.user
      .update({
        where: {
          id: req.userId!,
        },
        data: {
          plantTime: new Date(time),
        },
      })
      .then(() => {
        res.status(200).json({ message: "Changed plant time successfully" });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: `Unable to change plant time: ${err.message}` });
      });
  }
);

userRouter.use("/plant", plantRouter);

export default userRouter;
