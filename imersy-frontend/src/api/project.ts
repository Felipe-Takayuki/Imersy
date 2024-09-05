import { FormEvent } from "react";
import { getToken } from "../auth/auth";
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




export async function SendGrades(event:FormEvent<HTMLFormElement>,id:number, qualityGrade:string, creativityGrade:string  ) {
    event.preventDefault()
    const token = await getToken()
    try {
      const response = await api.post("/evaluate/project", {
        "project_id":id,
        "quality_grade": parseInt(qualityGrade),
        "creativity_grade": parseInt(creativityGrade)
    },{headers: {Authorization: `Bearer ${token}`}} )
    location.reload()
    return response.data
    } catch (error) {
      console.log(error)
    }
}