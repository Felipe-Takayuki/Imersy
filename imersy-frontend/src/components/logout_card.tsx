import { useEffect, useState } from "react";
import { getToken, logOut } from "../auth/auth";
import { decodeToken } from "../utils/decoded";
import { useNavigate } from "react-router-dom";

export function LogOutModal({setShowUserCard}:{setShowUserCard:(show:boolean) => void}) {
  const [name, setName] = useState("");
  const navigate = useNavigate()
  useEffect(() => {
    var token = getToken();
    setName(decodeToken(token!).name);
  }, [])
  return (
    <div className="fixed bg-blue-2/40 inset-0 w-full flex justify-end ">
      <div className="relative w-1/4 p-2 h-2/5 max-sm:m-2 m-4 max-lg:w-2/5 max-md:w-1/2 max-sm:w-full rounded-2xl bg-blue-2">
        <div className="flex items-center">
          <div className="flex items-center">
            <img
            src="../../public/icons/user.svg"
            alt="user icon"
            className="mr-2 w-12"
            />
            <span className="text-2xl text-white">{name}</span>
          </div>
          <button className="w-full text-end mr-5 text-2xl text-white" onClick={() => setShowUserCard(false)}>x</button>
        </div>
        <div className="flex flex-col mt-20  items-start justify-end ">
            <button className="underline text-white text-2xl" onClick={() => navigate("/login") }>trocar de conta</button>
            <button className="underline text-white text-2xl" onClick={logOut}>sair</button>
        </div>


      </div>
    </div>
  );
}
