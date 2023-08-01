import { Router } from "express";

import authRoutes from "./authRoutes";
import commentRoutes from "./commentRoutes";
import postRoutes from "./postRoutes";
import reactionRoutes from "./reactionRoutes";
import replyRoutes from "./replyRoutes";
import themeRoutes from "./themeRoutes";

const rootRouter = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/post", postRoutes);
rootRouter.use("/comment", commentRoutes);
rootRouter.use("/reactions", reactionRoutes);
rootRouter.use("/reply", replyRoutes);
rootRouter.use("/theme", themeRoutes);

export default rootRouter;
