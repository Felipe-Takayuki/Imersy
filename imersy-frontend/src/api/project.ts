import api from "./api";

export async function GetProjects() {
    try {
        const response = await api.get("/project")
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}