import { useState } from "react";
import { LogOutModal } from "../../components/logout_card";


export function NavBarUser() {
    const [showConfigModal, setShowConfigModal] = useState(false)
    return (
        <>
            <nav className="flex justify-between font-semibold items-center text-white p-2 max-md:h-20 h-44 bg-blue-3"> 
              <p className="max-md:ml-2 text-4xl font-plex-mono ml-16 font-semibold text-center">Imersy</p>
              <button onClick={() => setShowConfigModal(true)} className=" mr-6 underline font-light text-xl"> <img src="public/icons/user.svg" className={`${showConfigModal ? "hidden" : null} max-md:w-14`} />  </button>
            </nav>
            {showConfigModal ? <LogOutModal setShowUserCard={setShowConfigModal} /> : null}
        </>
    )
}