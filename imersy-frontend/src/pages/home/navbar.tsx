import { useNavigate } from "react-router-dom"


export function NavBar() {
    const navigate = useNavigate()
    return (
        <>
            <nav className="flex justify-between font-semibold items-center text-white p-2 h-44 max-md:20 bg-blue-3"> 
              <p className="text-4xl font-plex-mono ml-16 max-md:hidden font-semibold text-center max-md:ml-0">Imersy</p>
              <div className="flex max-md:w-full max-md:h-auto">
                <button className="w-56 h-16 text-2xl max-md:w-full text-center font-semibold rounded-2xl bg-blue-2 mr-4" onClick={() => navigate("/register")}>Inscreva-se</button>
                <button className="w-40 h-16 text-2xl max-md:w-full border-2 font-semibold rounded-2xl border-white mr-9 max-md:mr-0" onClick={() => navigate("/login")}>Entre</button>
              </div>
            </nav>
        </>
    )
}