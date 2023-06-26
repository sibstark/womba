import { loginUser } from "@pages/login/slice";
import { Button } from "@ui/components";
import { ValidationMessage } from "@utils";
import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import { FormControlInputTemplate, TChildrenArguments, withForm } from "../form";

import "./styles.scss";

type TLoginForm = {
    login: string;
    password: string;
};

type RenderLoginFormProps = TChildrenArguments<TLoginForm>;

const RenderLoginForm: React.FC<RenderLoginFormProps> = props => {
    const dispatch = useDispatch();
    const [auth, setAuth] = useState({ login: "", password: "" });

    const options = useMemo(
        () => ({
            required: ValidationMessage.Required
        }),
        []
    );

    const onSubmit = () => {
        dispatch(loginUser(auth));
    };

    return (
        <>
            <FormControlInputTemplate<TLoginForm>
                {...props}
                title="Login"
                placeholder="Enter your login"
                name="login"
                options={options}
                onChange={e => {
                    setAuth({
                        login: e.target.value,
                        password: auth.password
                    });
                }}
            />
            <FormControlInputTemplate<TLoginForm>
                {...props}
                title="Password"
                placeholder="Enter your password"
                name="password"
                options={options}
                inputProps={{
                    type: "password"
                }}
                onChange={e => {
                    setAuth({
                        login: auth.login,
                        password: e.target.value
                    });
                }}
            />
            <div className="button-container">
                <Button type="submit" className="button--purple w-80" onSubmit={onSubmit}>
                    Log In
                </Button>
            </div>
        </>
    );
};

export const LoginForm = withForm<TLoginForm>(
    {
        onValid: () => console.log("onValid"),
        props: {
            defaultValues: {
                login: "",
                password: ""
            }
        }
    },
    RenderLoginForm
);
