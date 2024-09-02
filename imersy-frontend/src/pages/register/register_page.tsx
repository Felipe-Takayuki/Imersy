import { useEffect, useState } from "react"
import { format } from "date-fns";

interface BootCamp {
    id:number;
    title:string;
    address:string;
    start_date:string; 
    end_date:string;
}

export function RegisterPage() {
    const [bootCamp, setBootcamp] = useState<BootCamp | undefined>();
   
    function GetBootcamp() {
        var data = localStorage.getItem("bootcamp")
        const parse = JSON.parse(data!);
        setBootcamp(parse)
        
    }
    var date = bootCamp ? format(bootCamp.start_date, "dd'/'LL").concat(' - ').concat(format(bootCamp.end_date, "dd'/'LL"))
    : null

    useEffect(() => {
        GetBootcamp();
    }, []);
    
    
    return (
        <>
        <div className="w-screen h-screen flex justify-center ">
            <div className="w-1/2 bg-blue-2 mt-9 p-9">
                <p className="font-medium text-white text-4xl">{bootCamp?.title}</p>
                <p className="font-medium text-gray text-xl">{date}</p>
                <p className="font-medium text-gray text-xl mb-12">{bootCamp?.address}</p>
                
                <form>
                <fieldset>
                    <legend className="text-3xl font-medium text-white">Tipo de inscrição</legend>
                    <div>
                        <input className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" id="subscribeChoice1" name="subscribeType" value="medio" />
                        <label className="text-2xl font-normal text-white mr-16"> Ensino médio</label>

                        <input className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" id="subscribeChoice2" name="subscribeType" value="tecnico" />
                        <label className="text-2xl font-normal text-white"> Ensino técnico</label>
                    </div>
                </fieldset>
                <fieldset className="mt-14">
                    <legend className="text-3xl font-medium text-white">Ano do ensino médio</legend>
                    <div>
                        <input className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" id="highScholl1" name="subscribeType" value="1" />
                        <label className="text-2xl font-normal text-white mr-16"> 1º</label>

                        <input className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" id="highScholl2" name="subscribeType" value="2" />
                        <label className="text-2xl font-normal text-white mr-16"> 2º</label>

                        <input className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" id="highScholl3" name="subscribeType" value="3" />
                        <label className="text-2xl font-normal text-white mr-16"> 3º</label>

                        <input className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" id="highScholl4" name="subscribeType" value="4" />
                        <label className="text-2xl font-normal text-white"> Completo</label>

                        
                    </div>
                </fieldset>
                <input type="text" name="name" id="name" placeholder="Nome" className=" mt-10 rounded-2xl w-full h-14 border-4 border-white bg-blue-2 placeholder-white text-2xl p-2 text-white focus:border-white focus:outline-none"/>
                <div className="flex">
                <input type="email" name="email" id="email" placeholder="E-mail" className=" mt-4 rounded-2xl w-3/5 h-14 border-4 border-white bg-blue-2 placeholder-white text-2xl p-2 text-white focus:border-white focus:outline-none"/>
                <input type="password" name="password" id="password" placeholder="Senha" className=" ml-1 mt-4 rounded-2xl w-2/5 h-14 border-4 border-white bg-blue-2 placeholder-white text-2xl p-2 text-white focus:border-white focus:outline-none"/>
                </div>
            </form>
            </div>
        </div>

        
        </>
    )
}