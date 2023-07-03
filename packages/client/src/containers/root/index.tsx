import { RouterProvider } from "react-router-dom";

import router from "../router";

export const Root = () => {
    return <RouterProvider router={router} />;
};
