import fetch, { HeadersInit } from "node-fetch";

export async function fetchUserData(headers: HeadersInit) {
    try {
        const url = process.env.API_URL + "/auth/user";
        const response = await fetch(url, {
            headers
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch user data: code ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error("Error fetching user data:", error);

        return undefined;
    }
}
