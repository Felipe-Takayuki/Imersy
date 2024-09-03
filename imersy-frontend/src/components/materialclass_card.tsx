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
        navigate(`/home/material/${materialID}`)
    }
    return (
        <>
         <div className="p-5 bg-blue-3">
            <div>
                <h2 className="font-medium text-4xl text-white">{title}</h2>
                <p className="text-gray text-2xl">{owner_name}</p>
            </div>
            <div>
                <p className="mb-7 text-white w-full">assunto da aula: <span className="text-gray">{subject}</span></p>
                <button className="underline text-white" onClick={() => ToMaterial(id)}>{`acessar material >`}</button>
            </div>
         </div>
        </>
    )
}