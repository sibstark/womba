import { Anonymous, Protection } from "@containers";
import { getUserAuthorized, loadUser, userInitialization } from "@redux/user";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";

import Layout from "../../ui/components/Layout";
import { Routes } from "../router";

import "./styles.scss";

const RootLayout = () => {
    const dispatch = useDispatch<any>();
    const fetching = useSelector(userInitialization);
    const isAuthorized = useSelector(getUserAuthorized);

    useEffect(() => {
        if (!isAuthorized) {
            dispatch(loadUser());
        }
    }, [isAuthorized]);

    if (fetching) {
        return <div>Загрузка</div>;
    }

    return (
        <>
            <div className="header">
                <div className="header_logo">WOMBA 2048</div>
                <div className="header_nav">
                    <Anonymous>
                        <NavLink className="header_nav__item" to={Routes.Login}>
                            Sign In
                        </NavLink>
                        <NavLink className="header_nav__item" to={Routes.Registration}>
                            Sign Up
                        </NavLink>
                    </Anonymous>
                    <Protection>
                        <NavLink className="header_nav__item" to={Routes.Forum}>
                            Forum
                        </NavLink>
                        <NavLink className="header_nav__item" to={Routes.Rules}>
                            Rules
                        </NavLink>
                        <NavLink className="header_nav__item" to={Routes.Game}>
                            Game
                        </NavLink>
                    </Protection>
                </div>
            </div>
            <Layout>
                <Outlet />
            </Layout>
        </>
    );
};

export default RootLayout;
