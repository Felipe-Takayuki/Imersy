import { BootCamp } from "../pages/register/register_page";
import api from "./api";

export async function GetBootcamp(setBootcamp: React.Dispatch<React.SetStateAction<BootCamp | undefined>>) {
    try {
        const response = await api.get("/bootcamp");
        setBootcamp(response.data)
    } catch (error) {
        console.error(error);
    }
}


