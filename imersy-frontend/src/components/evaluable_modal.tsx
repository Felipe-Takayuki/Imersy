import { useState } from "react"
import { SendGrades } from "../api/project"

export function EvaluableModal({id, setShowModal}:{id:number, setShowModal: React.Dispatch<React.SetStateAction<boolean>>}) {
    const [qualityGrade, setQualityGrade] = useState("")
    const [creativityGrade, setCreativityGrade] = useState("")

    return (
        <div className="fixed inset-0 bg-white/40 flex items-center justify-center 	">
          <div className="w-1/4 h-auto border-4 border-white rounded-2xl bg-blue-2 flex flex-col px-10 py-5 ">
            <button className="w-full text-end text-2xl text-white" onClick={() => setShowModal(false)}>x</button>
            
            <form onSubmit={ (event) => SendGrades(event,id,qualityGrade,creativityGrade)} className="flex flex-col items-center" method="post">
            <p className="font-medium text-3xl text-white">Avaliar as notas</p>

            <input
                    type="number"
                    min={0}
                    max={10}
                    name="qualityGrade"
                    id="qualityGrade"
                    placeholder="qualidade do código"
                    required
                    onChange={(event) => setQualityGrade(event.target.value)}
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full mt-6 rounded-2xl  h-14 border-4 border-white bg-blue-2 placeholder-white text-2xl p-2 text-white focus:border-white focus:outline-none"
            />
            <input
                    type="number"
                    min={0}
                    max={10}
                    name="criativityGrade"
                    id="qualityGrade"
                    placeholder="criatividade"
                    required
                    onChange={(event) => setCreativityGrade(event.target.value)}
                    className=" [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full mt-4 rounded-2xl mb-10  h-14 border-4 border-white bg-blue-2 placeholder-white text-2xl p-2 text-white focus:border-white focus:outline-none"
            />
            <input type="submit" value="Enviar" className="bg-white text-blue-2 px-24 py-4 rounded-xl text-xl font-medium"/>
            </form>
          </div>
        </div>
    )
}