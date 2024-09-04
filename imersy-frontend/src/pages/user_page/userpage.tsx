import { useEffect, useState } from "react";
import { NavBarUser } from "./navbar_user";
import { MaterialSection } from "./categories/material";
import { decodeToken } from "../../utils/decoded";
import { getToken } from "../../auth/auth";
import { ProjectSection } from "./categories/project";


export function UserPage() {
  const [userType, setUserType] = useState("") 
  const [activeButton, setActiveButton] = useState("material");
  
  useEffect(() => {
    var token = getToken()
    setUserType(decodeToken(token!).user_type)    
  },[] )
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
          className={`w-auto h-12 mx-7 px-3 py-1 rounded-full text-2xl text-center font-semibold ${activeButton === 'project' ? 'bg-white text-blue-2 border-white border-4' : 'bg-blue-2 text-white border-white border-4'}`}
          onClick={() => detectButtonClick("project")}  
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
        {activeButton == "material" ? <MaterialSection userType={userType} /> : activeButton == "project" ? <ProjectSection /> :null}
      </div>
      </main>

    </>
  );
}
