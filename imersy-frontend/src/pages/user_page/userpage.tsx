import { useEffect, useState } from "react";
import { NavBarUser } from "./navbar_user";
import { MaterialSection } from "./categories/material";
import { decodeToken } from "../../utils/decoded";
import { getToken } from "../../auth/auth";
import { ProjectSection } from "./categories/project";
import { WriteSection } from "./categories/write_material";


export function UserPage() {
  const [userType, setUserType] = useState("") 
  const [categorie, setCategorie] = useState("material");
  
  useEffect(() => {
    var token = getToken()
    setUserType(decodeToken(token!).user_type)    
  },[] )
  function detectButtonClick(button: string) {
    setCategorie(button);
  };

  return (
    <>
    <NavBarUser />
      <main className="flex w-auto px-20 py-10 flex-col">
      <div className="">
        <button 
          className={`w-auto h-12 px-3 py-1 rounded-full text-2xl text-center font-semibold ${categorie === 'material' ? 'bg-white text-blue-2 border-white border-4' : 'bg-blue-2 text-white border-white border-4'}`}
          onClick={() => detectButtonClick("material")}
        >
          material de aula
        </button>
        <button 
          className={`w-auto h-12 mx-7 px-3 py-1 rounded-full text-2xl text-center font-semibold ${categorie === 'project' ? 'bg-white text-blue-2 border-white border-4' : 'bg-blue-2 text-white border-white border-4'}`}
          onClick={() => detectButtonClick("project")}  
        >
          {userType == "mentor" ? "projetos enviados" : "projeto" }
        </button>
        <button 
          className={`w-auto h-12 px-3 py-1 rounded-full text-2xl text-center font-semibold ${categorie === 'rank' ? 'bg-white text-blue-2 border-white border-4' : 'bg-blue-2 text-white border-white border-4'}`}
          onClick={() => detectButtonClick("rank")}
        >
          Rank
        </button>
      </div>
      <div>
        {categorie == "material" ? <MaterialSection userType={userType}  setCategory={setCategorie}/> : categorie == "project" ? <ProjectSection userType={userType} /> : categorie == "write-material" ? <WriteSection /> :null }
      </div>
      </main>

    </>
  );
}
