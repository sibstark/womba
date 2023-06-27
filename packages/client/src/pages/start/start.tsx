import { withProtection } from "@containers";

import { StartScreen } from "../../containers/StartScreen";
import "./styles.scss";

export const StartPage = withProtection(() => {
    return <StartScreen />;
});
