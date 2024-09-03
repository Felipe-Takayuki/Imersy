import { NavigateFunction } from "react-router-dom";
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
export async function ToRegister(navigate:NavigateFunction) {
    try {
        const response = await api.get("/bootcamp")
        localStorage.setItem("bootcamp", JSON.stringify(response.data));
        navigate(`${response.data.id}/register`)
    }
    catch (error) {
        console.log(error)
    }
}


