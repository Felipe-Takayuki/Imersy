import { useEffect, useState } from "react";
import { NavBarUser } from "./navbar_user";
import { MaterialSection } from "./categories/material";
import { decodeToken } from "../../utils/decoded";
import { getToken } from "../../auth/auth";
import { ProjectSection } from "./categories/project";
import { WriteSection } from "./categories/write_material";
import { RankSection } from "./categories/rank";

export function UserPage() {
  const [userType, setUserType] = useState("");
  const [categorie, setCategorie] = useState(!localStorage.getItem("categorie") ? "material":localStorage.getItem("categorie"));

  useEffect(() => {
    var token = getToken();
    setUserType(decodeToken(token!).user_type);
  }, []);
  function detectCategoryClick(button: string) {
    setCategorie(button);
    localStorage.setItem("categorie", button);
  }

  return (
    <>
      <NavBarUser />
      <main className="flex w-auto px-20 max-sm:px-10 py-10 flex-col">
        <div className="flex max-md:flex-col h-full max-md:justify-evenly">
          <button
            className={`w-auto max-md:w-full  h-12 px-3 py-1 rounded-full text-2xl text-center font-semibold ${
              categorie === "material"
                ? "bg-white text-blue-2 border-white border-4"
                : "bg-blue-2 text-white border-white border-4"
            }`}
            onClick={() => detectCategoryClick("material")}
          >
            material de aula
          </button>
          <button
            className={`w-auto max-md:my-2 max-md:mx-0 h-12 mx-7 px-3 py-1 rounded-full text-2xl text-center font-semibold ${
              categorie === "project"
                ? "bg-white text-blue-2 border-white border-4"
                : "bg-blue-2 text-white border-white border-4"
            }`}
            onClick={() => detectCategoryClick("project")}
          >
            {userType == "mentor" ? "projetos enviados" : "projeto"}
          </button>
          <button
            className={`w-auto h-12 px-3 py-1 rounded-full text-2xl text-center font-semibold ${
              categorie === "rank"
                ? "bg-white text-blue-2 border-white border-4"
                : "bg-blue-2 text-white border-white border-4"
            }`}
            onClick={() => detectCategoryClick("rank")}
          >
            rank
          </button>
        </div>
        <div>
          {categorie == "material" ? (
            <MaterialSection userType={userType} setCategory={setCategorie} />
          ) : categorie == "project" ? (
            <ProjectSection userType={userType} />
          ) : categorie == "write-material" ? (
            <WriteSection />
          ) : categorie == "rank" ? (
            <RankSection />
          ) : null}
        </div>
      </main>
    </>
  );
}
