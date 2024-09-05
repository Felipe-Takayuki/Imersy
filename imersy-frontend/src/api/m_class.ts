import { FormEvent } from "react";
import { getToken } from "../auth/auth";
import api from "./api";
import { MaterialClass } from "../pages/user_page/categories/material";

export async function WriteMaterialClass(event: FormEvent<HTMLFormElement>, title: string, subject: string, content: string) {
    event.preventDefault()
    try {
        const token = await getToken()
        api.post("/material-class", {
            title: title, 
            subject: subject,
            content: content
        }, {headers: {Authorization: `Bearer ${token}`}})
        location.reload()
    } catch (error) {
        console.log(error)
    }
}

export async function GetMaterial(setMaterials:React.Dispatch<React.SetStateAction<MaterialClass[]>>){
  try {
    const response = await api.get('material-class');
    setMaterials(response.data);
  } catch (error) {
    console.log('Erro ao buscar materiais:', error);
  }
}
export async function GetMaterialWContent(material_id:string |undefined, setMaterial: React.Dispatch<React.SetStateAction<MaterialClass | undefined>> ){
    try {
      const response = await api.get(`/material-class/${material_id}`)
      setMaterial(response.data)
    } catch (error) {
      console.log(error)
    }
  }