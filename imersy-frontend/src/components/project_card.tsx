import { useState } from "react"
import { EvaluableModal } from "./evaluable_modal"

interface ProjectProps{
    id?: number
    title:string 
    owner_name: string
    description:string
    video_url:string
    project_url:string
    avarage?: number
    userType?: string
}

export function ProjectEvaluableCard({id, title, owner_name, userType, description, project_url, video_url} :ProjectProps) {
    const [showModal, setShowModal] = useState(false)
    return (
        <>
            <div className="p-5 bg-blue-3 w-1/2 rounded-2xl mt-12 ">
                <p className="font-medium text-4xl text-white">{title}</p>
                <p className="text-gray text-xl mb-4">{owner_name}</p>
                <p className="text-white text-xl mb-8">{description}</p>
                <a href={video_url} className="flex items-center underline text-white text-xl"><img src="../../public/icons/Youtube.svg"  />Vídeo do youtube</a> 
                <a href={project_url} className="flex items-center underline text-white text-xl"><img src="../../public/icons/github.svg"  /> Link do projeto</a>
                {userType == "mentor" ? (<button className="mt-5 bg-blue-4 p-3 flex items-center text-white text-2xl rounded-xl " onClick={() => setShowModal(!showModal)}>Avaliar <img className="ml-4" src="../../public/icons/arrow.svg"  /></button>) : null }
                {showModal ? <EvaluableModal id={id!} setShowModal={setShowModal}  /> : null }
            </div>
        
        </>
    )
}

export function RankerProjectCard({title, owner_name, description, project_url, video_url, avarage} :ProjectProps) {
    return (
        <>
        <div className="p-5 bg-blue-3 w-1/2 rounded-2xl max-lg:w-full mt-12">
            <p className="font-medium text-4xl text-white">{title}</p>
            <p className="text-gray text-xl mb-4">{owner_name}</p>
            <p className="text-white text-xl mb-8">{description}</p>
            <a href={video_url} className="flex items-center underline text-white text-xl"><img src="../../public/icons/Youtube.svg"  />Vídeo do youtube</a> 
            <a href={project_url} className="flex items-center underline text-white text-xl"><img src="../../public/icons/github.svg"  /> Link do projeto</a>
            <p className="mt-6 text-white text-xl">Pontuação: <span className="text-gray">{avarage}</span></p>
        </div>
        </>
    )
}