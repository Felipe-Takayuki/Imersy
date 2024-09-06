import { FormEvent } from "react";
import { getToken } from "../auth/auth";
import api from "./api";
import { ProjectType } from "../pages/user_page/categories/project";

export async function GetProjectsCategorie(setProjects:React.Dispatch<React.SetStateAction<ProjectType[]>> , typeSubscribe:string) {
    try {
        const token = await getToken()
        const response = await api.get(`/project/${typeSubscribe}`, {headers: {Authorization: `Bearer ${token}`}});
        setProjects(response.data);
      } catch (error) {
        console.log('Erro ao buscar materiais:', error);
      }
}

export async function GetProjectUser(setProject: React.Dispatch<React.SetStateAction<ProjectType | undefined>>) {
    try {
        const token = await getToken();
        const response = await api.get('/project', {headers: {Authorization: `Bearer ${token}`}})
        setProject(response.data)
      } catch (error) {
        console.log(error)
      }
}

export async function SendProject(event:FormEvent<HTMLFormElement>, title:string, description:string, videoURL: string, projectURL: string) {
  event.preventDefault()
    try {
      const token = await getToken()
      api.post("/project", {
        title: title,
        description: description,
        video_url: videoURL,
        project_url: projectURL
      }, {headers: {Authorization: `Bearer ${token}`}} )

      location.reload()
    } catch (error) {
      console.log(error)
    }
}

export async function GetTopRankersProject(setRankersProject:React.Dispatch<React.SetStateAction<ProjectType[]>>, typeSubscribe: string)
  {
  try {
    const response = await api.get(`/rank/${typeSubscribe}`)
    setRankersProject(response.data)
  } catch (error) {
    console.log(error)
  }
}
export async function SendGrades(event:FormEvent<HTMLFormElement>,id:number, qualityGrade:string, creativityGrade:string ) {
    event.preventDefault()
    const token = await getToken()
    try {
     await api.post("/evaluate/project", {
        "project_id":id,
        "quality_grade": parseInt(qualityGrade),
        "creativity_grade": parseInt(creativityGrade)
    },{headers: {Authorization: `Bearer ${token}`}} )
      location.reload()
    } catch (error) {
      console.log(error)
    }
}