import { api } from "./api";

export async function GetBootcamp() {
    try {
        const response = await api.get("/bootcamp");
        localStorage.setItem("title", response.data.title)
        localStorage.setItem("address", response.data.address)
        return response.data;
    } catch (error) {
        console.error(error);
    }
}