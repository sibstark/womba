import { store } from "@redux/store";
import { loginUser } from "@redux/user";
import { SigninRequest } from "@types";
import { Button } from "@ui/components";
import { ValidationMessage } from "@utils";
import React from "react";

import { FormControlInputTemplate, TChildrenArguments, withForm } from "../form";
import "./styles.scss";

type RenderLoginFormProps = TChildrenArguments<SigninRequest>;
const options = {
    required: ValidationMessage.Required
};
const RenderLoginForm: React.FC<RenderLoginFormProps> = props => {
    return (
        <>
            <FormControlInputTemplate<SigninRequest>
                {...props}
                title="Логин"
                placeholder="Enter your login"
                name="login"
                options={options}
            />
            <FormControlInputTemplate<SigninRequest>
                {...props}
                title="Password"
                placeholder="Enter your password"
                name="password"
                options={options}
                inputProps={{
                    type: "password"
                }}
            />
            <div className="button-container">
                <Button type="submit" className="button--purple w-80">
                    Авторизоваться
                </Button>
            </div>
        </>
    );
};

export const LoginForm = withForm<SigninRequest>(
    {
        onValid: data => {
            store.dispatch(loginUser(data));
        },
        props: {
            defaultValues: {
                login: "",
                password: ""
            }
        }
    },
    RenderLoginForm
);
