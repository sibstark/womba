import { store } from "@redux/store";
import { registerUser } from "@redux/user";
import { SignupRequest } from "@types";
import { Button } from "@ui/components";
import {
    emailValidation,
    loginValidation,
    nameValidation,
    passValidation,
    phoneValidation,
    ValidationMessage
} from "@utils";
import React from "react";

import "./styles.scss";

import { TChildrenArguments, withForm, FormControlInputTemplate } from "../form";

type TRegistrationForm = SignupRequest & {
    confirmPassword: string;
};
type RenderRegistrationFormProps = TChildrenArguments<TRegistrationForm>;
const onSubmit = (data: TRegistrationForm) => {
    store.dispatch(registerUser(data));
};

const RenderRegistrationForm: React.FC<RenderRegistrationFormProps> = props => {
    const { formState, watch } = props;

    return (
        <>
            <FormControlInputTemplate<TRegistrationForm>
                {...props}
                placeholder="Enter your name"
                name="first_name"
                title="Name"
                options={{
                    required: ValidationMessage.Required,
                    validate: nameValidation
                }}
            />
            <FormControlInputTemplate<TRegistrationForm>
                {...props}
                placeholder="Enter your surname"
                name="second_name"
                title="Surname"
                options={{
                    required: ValidationMessage.Required,
                    validate: nameValidation
                }}
            />
            <FormControlInputTemplate<TRegistrationForm>
                {...props}
                placeholder="Enter your email"
                name="email"
                title="Email"
                options={{
                    required: ValidationMessage.Required,
                    validate: emailValidation
                }}
            />
            <FormControlInputTemplate<TRegistrationForm>
                {...props}
                placeholder="Enter your phone"
                name="phone"
                title="Phone"
                options={{
                    required: ValidationMessage.Required,
                    validate: phoneValidation
                }}
            />
            <FormControlInputTemplate<TRegistrationForm>
                {...props}
                placeholder="Enter your logi"
                name="login"
                title="Login"
                options={{
                    required: ValidationMessage.Required,
                    validate: loginValidation
                }}
            />
            <FormControlInputTemplate<TRegistrationForm>
                {...props}
                placeholder="Enter your password"
                name="password"
                title="Password"
                options={{
                    required: ValidationMessage.Required,
                    validate: passValidation
                }}
                inputProps={{
                    type: "password"
                }}
            />
            <FormControlInputTemplate<TRegistrationForm>
                {...props}
                placeholder="Enter your password"
                name="confirmPassword"
                title="Confirm password"
                options={{
                    required: ValidationMessage.Required,
                    validate: (val: string) => {
                        if (watch("password") !== val) {
                            return "Пароли не совпадают";
                        }

                        return true;
                    }
                }}
                inputProps={{
                    type: "password"
                }}
            />
            <div className="button-container">
                <Button
                    type="submit"
                    disabled={formState.isSubmitting}
                    className="button--purple w-80"
                >
                    Sign Up
                </Button>
            </div>
        </>
    );
};

export const RegistrationForm = withForm<TRegistrationForm>(
    {
        onValid: onSubmit,
        props: {
            defaultValues: {
                first_name: "",
                second_name: "",
                email: "",
                phone: "",
                login: "",
                password: "",
                confirmPassword: ""
            }
        }
    },
    RenderRegistrationForm
);
