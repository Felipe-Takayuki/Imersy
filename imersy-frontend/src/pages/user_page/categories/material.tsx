import { useEffect, useState } from "react";
import { api } from "../../../api/api";
import { useNavigate } from "react-router-dom";
import { MaterialClassCard } from "../../../components/materialclass_card";

interface MaterialClass {
    id:number
    title:string;
    owner_name: string;
    subject: string
    content: string 
}
export function MaterialSection() {
    const [materials, setMaterials] = useState<MaterialClass[]>([])

    useEffect(() => {
        api.get("/material-class").then(response => {setMaterials(response.data)})
    }, materials)
    return (
        <>
         <div>
            {materials.map(material => {
                return  <MaterialClassCard id={material.id} owner_name={material.owner_name} subject={material.subject} title={material.title} />
            })}
         </div>
        </>
    )
}