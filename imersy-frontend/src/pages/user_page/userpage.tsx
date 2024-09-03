import { createContext, useContext, useState } from "react";
import { NavBarUser } from "./navbar_user";
import { MaterialSection } from "./categories/material";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);
export function UserPage() {

  const [activeButton, setActiveButton] = useState("material");
 
  function detectButtonClick(button: string) {
    setActiveButton(button);
  };
  return (
    <>
    <NavBarUser />
      <main className="flex w-auto px-20 py-10 flex-col">
      <div className="">
        <button 
          className={`w-auto h-12 px-3 py-1 rounded-full text-2xl text-center font-semibold ${activeButton === 'material' ? 'bg-white text-blue-2 border-white border-4' : 'bg-blue-2 text-white border-white border-4'}`}
          onClick={() => detectButtonClick("material")}
        >
          material de aula
        </button>
        <button 
          className={`w-auto h-12 mx-7 px-3 py-1 rounded-full text-2xl text-center font-semibold ${activeButton === 'projeto' ? 'bg-white text-blue-2 border-white border-4' : 'bg-blue-2 text-white border-white border-4'}`}
          onClick={() => detectButtonClick("projeto")}  
        >
          Enviar Projeto
        </button>
        <button 
          className={`w-auto h-12 px-3 py-1 rounded-full text-2xl text-center font-semibold ${activeButton === 'rank' ? 'bg-white text-blue-2 border-white border-4' : 'bg-blue-2 text-white border-white border-4'}`}
          onClick={() => detectButtonClick("rank")}
        >
          Rank
        </button>
      </div>
      <div>
        {activeButton == "material" ? <MaterialSection /> : null}
      </div>
      </main>

    </>
  );
}
