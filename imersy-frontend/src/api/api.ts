import axios from "axios";
import { getToken } from "../auth/auth";

const api = axios.create({baseURL: "http://localhost:3000", 
headers:{
    Authorization: `Bearer ${getToken()}`
}})

export default api;