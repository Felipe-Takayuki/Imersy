
interface ProjectProps{
    title:string 
    owner_name: string
    description:string
    video_url:string
    project_url:string
}
export function ProjectCard({ title, owner_name, description, project_url, video_url}:ProjectProps) {
    return (
        <>
            <div className="p-5 bg-blue-3 w-1/2 rounded-2xl mt-12">
                <p className="font-medium text-4xl text-white">{title}</p>
                <p className="text-gray text-xl mb-4">{owner_name}</p>
                <p className="text-white text-xl mb-8">{description}</p>
                <div> <a href={video_url} className="flex items-center underline text-white text-xl"> <img src="../../public/icons/Youtube.svg"  />Vídeo do youtube</a>  </div>
                
            </div>
        
        </>
    )
}