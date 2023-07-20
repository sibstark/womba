export const isDev = () => process.env.NODE_ENV === "development";
export const isProduction = () => process.env.NODE_ENV === "production";

export const dbUser = process.env.DB_USER ?? "root";
export const dbPassword = process.env.DB_PASSWORD ?? "123";
export const dbName = process.env.DB_NAME ?? "womba";

export const API_URL = "https://ya-praktikum.tech/api/v2";
