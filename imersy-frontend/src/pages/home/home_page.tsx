import "../../../public/icons/stars.svg"
import { NavBar } from "./navbar"
import { useNavigate } from "react-router-dom"

export function HomePage() {
    const navigate = useNavigate()

    
    return (
        <>
            <NavBar />
            <main className="h-full">
              <section className=" flex w-3/4 p-10 flex-col max-md:p-2  justify-center-center">
                <p className="font-light text-6xl max-md:text-5xl text-white ">
                    Aproveite esta oportunidade<br />
                    E participe do nosso
                    <b className="font-bold"> Bootcamp <br /> Jovem Programador!</b>
                </p> 
                <button onClick={() => navigate("/register")} className="w-96 mt-10 h-36 text-5xl font-medium text-white text-center rounded-2xl bg-blue-2 mr-4 max-sm:mr-0  mb-40">Inscreva-se</button>
              </section>
              <section className=" flex bg-white max-lg:flex-col ">
                <div className="w-1/2 flex flex-col max-lg:w-full items-start p-16 max-lg:p-2 justify-start">
                    <p className="text-5xl max-md:text-4xl  text-blue-1 mb-20">Por que participar
                    dos<b> Bootcamps?</b></p>
                       
                    <div className="flex items-center">
                        <img src="../../../public/icons/stars.svg" alt="estrelas" className="w-20 max-lg:w-16 max-lg:mr-2" />
                        <span className="text-4xl text-blue-1 max-lg:ml-0 ml-10">Desenvolva soluções incríveis,<br /> concorrendo a <b>bolsas de estudo.</b></span>
                    </div>
                    
                    <div className="flex items-center mt-16  ">
                        <img src="../../../public/icons/gears.svg" alt="engrenagens" className="w-28 max-lg:w-20" />
                        <span className="text-4xl  text-blue-1 max-lg:mb-10 max-lg:ml-0 m-3">Ganhe experiência e <br />amplie o seu <br /><b>conhecimento</b></span>
                    </div>
                   
                </div>
                <div className="m-2 bg-white border border-l-2 border-blue-1"></div>
                <div className="w-1/2 flex flex-col items-start p-16 max-lg:p-2 justify-start max-lg:w-full max-lg:h-full max-lg:mb-20">                    
                    <p className="text-5xl max-md:text-4xl  text-blue-1 mb-20">O quê é o<b> Imersy?</b></p>
                    <span className="text-4xl text-blue-1">uma plataforma unimar, com o objetivo de facilitar a participação dos estudantes em bootcamps</span>
                </div>
              </section>
            </main>
            
        </>
    )
}

