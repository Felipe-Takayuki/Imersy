import { useNavigate } from "react-router-dom"
import "../../../public/icons/stars.svg"
import { NavBar } from "./navbar"
import { api } from "../../api/api"

export function HomePage() {
    const navigate = useNavigate()
    async function ToRegister() {
        try {
            const response = await api.get("/bootcamp")
            localStorage.setItem("bootcamp", JSON.stringify(response.data));
            navigate(`${response.data.id}/register`)
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <NavBar />
            <main className="h-full">
              <section className=" flex w-3/4 p-10 flex-col justify-center-center">
                <p className="font-light text-6xl text-white ">
                    Aproveite esta oportunidade<br />
                    E participe do nosso
                    <b className="font-bold"> Bootcamp <br /> Jovem Programador!</b>
                </p> 
                <button onClick={ToRegister} className="w-96 mt-10 h-36 text-5xl font-medium text-white text-center rounded-2xl bg-blue-2 mr-4 mb-40">Inscreva-se</button>
              </section>
              <section className=" flex bg-white  ">
                <div className="w-1/2 flex flex-col items-start p-16 justify-start">
                    <p className="text-5xl text-blue-1 mb-20">Por que participar
                    dos<b> Bootcamps?</b></p>
                       
                    <div className="flex items-center">
                        <img src="../../../public/icons/stars.svg" alt="estrelas" className="w-20" />
                        <span className="text-2xl text-blue-1 ml-10">Desenvolva soluções incríveis,<br /> concorrendo a <b>bolsas de estudo.</b></span>
                    </div>
                    
                    <div className="flex items-center mt-16">
                        <img src="../../../public/icons/gears.svg" alt="engrenagens" className="w-28" />
                        <span className="text-2xl text-blue-1 m-3">Ganhe experiência e <br />amplie o seu <br /><b>conhecimento</b></span>
                    </div>
                   
                </div>
                <div className="m-2 bg-white border border-l-2 border-blue-1"></div>
                <div className="w-1/2 flex flex-col items-start p-16 justify-start">                    
                    <p className="text-5xl text-blue-1 mb-20">O quê é o<b> Imersy?</b></p>
                    <span className="text-4xl text-blue-1">uma plataforma unimar, com o objetivo de facilitar a participação dos estudantes em bootcamps</span>
                </div>
              </section>
            </main>
            
        </>
    )
}

