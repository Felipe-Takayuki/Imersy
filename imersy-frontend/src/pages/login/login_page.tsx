import { useState } from "react";
import { Login } from "../../api/auth";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showError, setShowError] = useState(false)
    const navigate = useNavigate()
    return (
        <>
         <main className="flex justify-center items-center w-screen h-screen">
            <div className=" flex flex-col w-1/3 bg-blue-2 p-12 rounded-xl max-lg:w-screen max-lg:rounded-none max-lg:h-full max-lg:justify-center" >
              <h1 className="text-4xl  text-white font-medium">Login</h1>
              <form onSubmit={(event) => Login({event: event, email: email, password: password, navigate: navigate, setShowError: setShowError})} className="flex flex-col items-center">
              <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={event => setEmail(event.target.value)}
                    placeholder="E-mail"
                    required
                    className="w-full rounded-2xl mt-20 h-14 border-4 border-white bg-blue-2 placeholder-gray text-2xl p-2 text-white focus:border-white focus:outline-none"
               />
              <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={event => setPassword(event.target.value)}
                    placeholder="Senha"
                    required
                    className="w-full rounded-2xl mt-3  h-14 border-4 border-white bg-blue-2 placeholder-gray text-2xl p-2 text-white focus:border-white focus:outline-none"
               />
                {showError ? (<><p className="mt-3 text-2xl text-error font-medium">e-mail ou a senha estão incorretos</p></>): null}
              <input
               type="submit"
               value="Entrar"
               className="w-80 mb-2 max-sm:w-60 h-16 text-2xl text-center  text-blue-2 font-semibold rounded-2xl bg-white mt-10  "
              />
            <button className="underline text-center text-white text-xl" onClick={() => navigate("/register")}>Não possui conta?<br />Inscreva-se</button>

              </form>

            </div>
         </main>
        </>
    )

}