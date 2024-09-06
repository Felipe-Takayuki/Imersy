import { useEffect, useState } from "react"
import { ProjectType } from "./project"
import { GetTopRankersProject } from "../../../api/project"
import { RankerProjectCard } from "../../../components/project_card"

export function RankSection() {
    const [rankerProjects, setRankerProjects] = useState<ProjectType[]>([])
    const [typeSubscribe, setTypeSubscribe] = useState("medio");
    useEffect(() => {
        GetTopRankersProject(setRankerProjects, typeSubscribe)
    }, [typeSubscribe])
    return (
        <>
          <div className="flex mt-14">
            <button className={`underline text-white text-xl ${typeSubscribe == "medio" ? 'bg-blue-3':null} p-1 mr-3 max-sm:mr-0`}  onClick={() => setTypeSubscribe("medio")}>ensino médio</button>
            <button className={`underline text-white text-xl ${typeSubscribe == "tecnico" ? 'bg-blue-3':null} p-1`} onClick={() => setTypeSubscribe("tecnico")}>ensino técnico</button>
          </div>
         {rankerProjects !== null ? rankerProjects.map((rankerProject) => { return < RankerProjectCard key={rankerProject.id} description={rankerProject.description} owner_name={rankerProject.owner_name} project_url={rankerProject.project_url} title={rankerProject.title} video_url={rankerProject.video_url} avarage={rankerProject.avarage} />}): null}
        </>
    )
}