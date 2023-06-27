
import { ApplicationErrorPage } from "@pages/400";
import { ServerErrorPage } from "@pages/500";
import { ForumPage } from "@pages/forum";
import { GamePage } from "@pages/Game";
import { LeaderBoardPage } from "@pages/Leaderboard";
import { LoginPage } from "@pages/login";
import ProfilePage from "@pages/Profile";
import { RegistrationPage } from "@pages/registration";
import { RulesPage } from "@pages/rules";
import { StartPage } from "@pages/start";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import { Routes } from "./routes";

import Home from "../Home";
import Layout from "../Layout";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={Routes.Login} element={<LoginPage />} />
            <Route path={Routes.Forum} element={<ForumPage />} />
            <Route path={Routes.Registration} element={<RegistrationPage />} />
            <Route path={Routes.Login} element={<LoginPage />} />
            <Route path={Routes.Profile} element={<ProfilePage />} />
            <Route path={Routes.LeaderBoard} element={<LeaderBoardPage />} />
            <Route path={Routes.Start} element={<StartPage />} />
            <Route path={Routes.Profile} element={<ProfilePage />} />
            <Route path={Routes.Rules} element={<RulesPage />} />
            <Route path={Routes.ApplicationError} element={<ApplicationErrorPage />} />
            <Route path={Routes.ServerError} element={<ServerErrorPage />} />
            <Route path={Routes.Game} element={<GamePage />} />
        </Route>
    )
);

export * from "./routes";
export default router;
