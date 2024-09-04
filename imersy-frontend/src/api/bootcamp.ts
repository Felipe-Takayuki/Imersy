import api from "./api";

export async function GetBootcamp() {
    try {
        const response = await api.get("/bootcamp");
        return JSON.stringify(response.data);
    } catch (error) {
        console.error(error);
    }
}


