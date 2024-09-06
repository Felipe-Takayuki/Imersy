import { logOut } from "../../auth/auth";


export function NavBarUser() {
    return (
        <>
            <nav className="flex justify-between font-semibold items-center text-white p-2 max-md:h-20 h-44 bg-blue-3"> 
              <p className="max-md:ml-2 text-4xl font-plex-mono ml-16 font-semibold text-center">Imersy</p>
              <button onClick={() => logOut()} className=" mr-6 underline font-light text-xl"> sair </button>
            </nav>
        </>
    )
}