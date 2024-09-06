import { FormEvent } from "react";
import api from "./api";
import { NavigateFunction } from "react-router-dom";
import { setToken } from "../auth/auth";

interface RegisterProps{
    id: number;
    selectedSubscribeType: string;
    highScholl: string;
    userName: string;
    userEmail: string;
    userPassword: string;
    userCPF: string;
    userScholl: string;
    phoneNumber: string;
    navigate: NavigateFunction;
    setUserPassword: (password:string) => void 
    setShowError: (show:boolean) => void
    event: FormEvent<HTMLFormElement>
}

export async function RegisterEvent({event, id, highScholl, phoneNumber, selectedSubscribeType, userCPF,userEmail, userName,userPassword,userScholl,navigate, setUserPassword, setShowError}:RegisterProps) {
    event.preventDefault();

    try {
      const response = await api.post(`${id}/register`, {
        teach_type: selectedSubscribeType,
        high_scholl: parseInt(highScholl),
        name: userName,
        email: userEmail,
        password: userPassword,
        cpf: userCPF,
        scholl: userScholl,
        phone_number: parseInt(phoneNumber),
      });
      setToken(response.data.token)
      setUserPassword("");
      localStorage.removeItem("bootcamp")
      setTimeout(() => {
        navigate("/user-page");
      }, 3000);
      setShowError(false)

    } catch (error) {
      setShowError(true)
    }
  }


interface LoginProps{
  event: FormEvent<HTMLFormElement>,
  email: string
  password: string
  navigate: NavigateFunction
  setShowError: (show:boolean) => void
}
export async function Login({event, email, password, navigate, setShowError}:LoginProps) {
  event.preventDefault();
  try {
    const response = await api.post("/login", {
      email: email,
      password: password
    })
    setToken(response.data.token)
    setShowError(false)
    navigate("/user-page")
  } catch (error) {
    setShowError(true)
  }
}

