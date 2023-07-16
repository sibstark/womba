export const isDev = () => process.env.NODE_ENV === "development";
export const isProduction = () => process.env.NODE_ENV === "production";

export const dbHost = process.env.DB_HOST ?? "test_host";
export const dbUser = process.env.DB_USER ?? "db_user";
export const dbPassword = process.env.DB_PASSWORD ?? "db_password";
export const dbName = process.env.DB_NAME ?? "db_name";

export const API_URL = "https://ya-praktikum.tech/api/v2";
