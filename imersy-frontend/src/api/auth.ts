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
    setUserPassword: React.Dispatch<React.SetStateAction<string>>
    event: FormEvent<HTMLFormElement>
}

export async function RegisterEvent({event, id, highScholl, phoneNumber, selectedSubscribeType, userCPF,userEmail, userName,userPassword,userScholl,navigate, setUserPassword}:RegisterProps) {
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
    } catch (error) {
      console.error(error);
    }
  }


interface LoginProps{
  event: FormEvent<HTMLFormElement>,
  email: string
  password: string
  navigate: NavigateFunction
}
export async function Login({event, email, password, navigate}:LoginProps) {
  event.preventDefault();
  try {
    const response = await api.post("/login", {
      email: email,
      password: password
    })
    setToken(response.data.token)
    navigate("/user-page")
  } catch (error) {
    console.log(error);
  }
}

