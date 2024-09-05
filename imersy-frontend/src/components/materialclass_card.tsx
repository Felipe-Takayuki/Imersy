import { useNavigate } from "react-router-dom"

interface MaterialClassCardProps {
    id:number
    title:string;
    owner_name: string;
    subject: string
}

export function MaterialClassCard({id, title, owner_name, subject}:MaterialClassCardProps) {
    const navigate = useNavigate()
    function ToMaterial(materialID: number) {
        navigate(`/user-page/material/${materialID}`)
    }
    return (
        <>
         <div className="p-5 bg-blue-3 w-1/2 rounded-2xl mt-12">
            <div>
                <h2 className="font-medium text-4xl text-white">{title}</h2>
                <p className="text-gray text-xl mb-10">{owner_name}</p>
            </div>
            <div>
                <p className="mb-3 text-white text-xl">assunto da aula: <span className="text-gray">{subject}</span></p>
                <button className="underline text-white text-xl" onClick={() => ToMaterial(id)}>{`acessar material`}</button>
            </div>
         </div>
        </>
    )
}