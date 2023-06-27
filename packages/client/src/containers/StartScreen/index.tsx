import { Button } from "@ui/components";

import { Typography } from "../../ui/components/Typography";

export const StartScreen = () => {
    return (
        <>
            <div className="start__wrapper">
                <div className="logo__wrapper">
                    <Typography variant="h2" component="h2">
                        WOMBA
                    </Typography>
                    <div className="logo">
                        <Typography variant="p" component="p">
                            2
                        </Typography>
                        <Typography variant="p" component="p">
                            0
                        </Typography>
                        <Typography variant="p" component="p">
                            4
                        </Typography>
                        <Typography variant="p" component="p">
                            8
                        </Typography>
                    </div>
                </div>
                <Button>Начать играть</Button>
            </div>
        </>
    );
};
