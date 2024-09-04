import { useEffect, useState } from "react"
import api from "../../../api/api";
import { ProjectCard } from "../../../components/project_card";

interface ProjectType{
    id: number
    title: string 
    owner_name: string,
    description: string,
    video_url: string
    project_url: string
}
export function ProjectSection() {
    const [projects, setProjects] = useState<ProjectType[]>([])
    useEffect(() => {
        const Projects = async () => {
            try {
              const response = await api.get('/project/tecnico');
              setProjects(response.data);
            } catch (error) {
              console.log('Erro ao buscar materiais:', error);
            }
        };
        Projects()
    }, [])
    return (
        <>
         {projects !== null ? projects.map((project) => { return <ProjectCard owner_name={project.owner_name}  description={project.description} project_url={project.project_url} title={project.title} video_url={project.video_url} key={project.id} /> } ): null}
        </>
    )
}