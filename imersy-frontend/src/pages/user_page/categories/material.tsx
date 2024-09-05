import { useEffect, useState } from "react";
import  api  from "../../../api/api";
import { MaterialClassCard } from "../../../components/materialclass_card";

export interface MaterialClass {
    id:number
    title:string;
    owner_name: string;
    subject: string
    content: string 
}


export function MaterialSection({userType, setCategory}:{userType:string, setCategory:(category:string)=>void }) {
    const [materials, setMaterials] = useState<MaterialClass[]>([])
    
    useEffect(() => {
        const Materials = async () => {
            try {
              const response = await api.get('material-class');
              setMaterials(response.data);
            } catch (error) {
              console.log('Erro ao buscar materiais:', error);
            }
        };
        Materials()
    }, [])
    return (
        <>
         <div>
            {
            userType == "mentor" ? <>
             <button className="mt-12 px-20 py-7 text-3xl rounded-2xl text-white bg-blue-2" onClick={() => setCategory("write-material") }>Escrever aula</button>
            </>: 
            null}

            {
             materials !== null ? 
             materials.map(material => {
                return  <MaterialClassCard key={material.id} id={material.id} owner_name={material.owner_name} subject={material.subject} title={material.title} />
            }) : null
        
        }
         </div>
        </>
    )
}