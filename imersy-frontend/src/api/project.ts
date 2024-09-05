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

export async function SendGradesProject({projectID,qualityGrade, creativityGrade}:{projectID:number, qualityGrade:number, creativityGrade:number }) {
    try {
        const response = await api.post("/evaluate/project", {
            "project_id":projectID,
            "quality_grade": qualityGrade,
            "creativity_grade":creativityGrade
        },{headers: {Authorization: `Bearer ${getToken}`}} )
        return response.data
    } catch (error) {
        return error
    }
    
}