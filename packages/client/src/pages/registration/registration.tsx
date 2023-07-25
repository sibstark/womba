import { RegistrationForm, withAnonymous } from "@containers";
import "./styles.scss";

export const RegistrationPage = withAnonymous(() => {
    return (
        <div className="registration">
            <div className="registration__title">Sign up</div>
            <RegistrationForm />
        </div>
    );
});
