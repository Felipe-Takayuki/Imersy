import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../../api/api"
import { MaterialClass } from "../user_page/categories/material"
import ReactMarkdown from "react-markdown"
import { NavBarUser } from "../user_page/navbar_user"



export function MaterialClassPage() {
    const {material_id} = useParams()
    const navigate = useNavigate()
    const [material, setMaterial] = useState<MaterialClass>()
    useEffect(() => {
        async function GetMaterialWContent() {
          try {
            const response = await api.get(`/material-class/${material_id}`)
            setMaterial(response.data)
          } catch (error) {
            console.log(error)
          }
        }
        GetMaterialWContent()
    }, [material_id])
    return (
    <>
    <NavBarUser />
    <main className="text-white p-10">
        <button onClick={() => navigate("/user-page")}><img src="../../public/icons/arrow-left.svg" alt="arrow-left" className="w-6 mb-14"/></button>
        <p className="text-3xl">{material?.title}</p>
        <p className="text-gray text-2xl mb-24">conteúdo:{material?.subject}</p>
        <ReactMarkdown children={material?.content!} className="text-2xl"></ReactMarkdown>

    </main>
     
    </>)
}