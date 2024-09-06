import { useEffect, useState } from "react"
import { ProjectEvaluableCard } from "../../../components/project_card";
import { GetProjectsCategorie, GetProjectUser } from "../../../api/project";
import { WriteProjectSection } from "./write_project";

export interface ProjectType{
    id: number
    title: string 
    owner_name: string,
    description: string,
    video_url: string
    project_url: string
}
export function ProjectSection({userType}:{userType: string}) {
    const [projects, setProjects] = useState<ProjectType[]>([])
    const [project, setProject] = useState<ProjectType>()
    const [typeSubscribe, setTypeSubscribe] = useState("medio");

    useEffect(() => { 
        userType == "mentor" ? GetProjectsCategorie(setProjects, typeSubscribe) : GetProjectUser(setProject)
    }, [typeSubscribe])
    return (
        <>
         {userType == "mentor" ? (
          <div className="flex mt-14">
            <button className={`underline text-white text-xl ${typeSubscribe == "medio" ? 'bg-blue-3':null} p-1 mr-3`}  onClick={() => setTypeSubscribe("medio")}>ensino médio</button>
            <button className={`underline text-white text-xl ${typeSubscribe == "tecnico" ? 'bg-blue-3':null} p-1`} onClick={() => setTypeSubscribe("tecnico")}>ensino técnico</button>
          </div>
         ) : null }
         {
           userType == "mentor" ?
            projects !== null ? projects.map((project) => { return <ProjectEvaluableCard  id={project.id} owner_name={project.owner_name} userType={userType} description={project.description} project_url={project.project_url} title={project.title} video_url={project.video_url} key={project.id} /> } ): null
          : !!project ? <ProjectEvaluableCard id={project?.id!} owner_name={project?.owner_name!} description={project?.description!} project_url={project?.project_url!} title={project?.title!} userType={userType} video_url={project?.video_url!} key={project?.id}/> : <WriteProjectSection  /> 
          } 
        </>
    )
}