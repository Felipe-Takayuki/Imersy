import { useState } from "react";
import { Login } from "../../api/auth";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    return (
        <>
         <main className="flex justify-center items-center w-screen h-screen">
            <div className="w-1/3 bg-blue-2 px-12 py-12 rounded-xl">
              <h1 className="text-4xl  text-white font-medium">Login</h1>
              <form onSubmit={(event) => Login({event: event, email: email, password: password, navigate: navigate})} className="flex flex-col items-center">
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
              <input
               type="submit"
               value="Entrar"
               className="w-80 h-16 text-2xl text-center text-blue-2 font-semibold rounded-2xl bg-white mt-10 mb-7 "
              />
            <button className="underline text-center text-white text-xl" onClick={() => navigate("/register")}>Não possui conta?<br />Inscreva-se</button>

              </form>

            </div>
         </main>
        </>
    )

}