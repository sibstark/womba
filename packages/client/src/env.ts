export const isDev = () => {
    return import.meta.env.DEV;
};

export const isProd = !isDev();
