import { LoginForm, withAnonymous } from "@containers";
import "./styles.scss";

export const LoginPage = withAnonymous(() => {
    return (
        <div className="login">
            <div className="login__title">Sign in</div>
            <LoginForm />
        </div>
    );
});
