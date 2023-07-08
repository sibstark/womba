import iconGameEnd from "./icons/2048.png";

import debugResolve from "../../logger/debugResolve";

const debug = debugResolve("Notificator");

const PERMISSION_DENIED = "denied";
const PERMISSION_DEFAULT = "default";

const TITLE_GAME_ENDED_NOTIFICATION = "Game ended notification";
const TAG_GAME_ENDED_NOTIFICATION = "Game ended";

const resolveNotificator = async () => {
    let isPermissionGranted = false;

    if (!("Notification" in window)) {
        debug("Notifications are not available");

        isPermissionGranted = false;
    }

    const permission = await Notification.requestPermission();

    if (permission === PERMISSION_DENIED || permission === PERMISSION_DEFAULT) {
        debug("Permission denied");

        isPermissionGranted = false;
    } else {
        isPermissionGranted = true;
    }

    const resetPermission = () => {
        isPermissionGranted = false;
    };

    return {
        notifyGameEnd: (body: string, cb: (isAllowedNotify: boolean) => void) => {
            cb(isPermissionGranted);

            if (isPermissionGranted) {
                const notificator = new Notification(TITLE_GAME_ENDED_NOTIFICATION, {
                    body,
                    icon: iconGameEnd,
                    tag: TAG_GAME_ENDED_NOTIFICATION
                });

                notificator.addEventListener("ended", resetPermission);

                return () => {
                    notificator.addEventListener("ended", resetPermission);
                };
            }
        }
    };
};

export default resolveNotificator;
