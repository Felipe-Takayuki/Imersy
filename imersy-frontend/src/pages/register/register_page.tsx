import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useNavigate} from "react-router-dom";
import { RegisterEvent } from "../../api/auth";
import { GetBootcamp } from "../../api/bootcamp";

interface BootCamp {
  id: number;
  title: string;
  address: string;
  start_date: string;
  end_date: string;
}

export function RegisterPage() {
  const navigate = useNavigate()
  const [bootCamp, setBootcamp] = useState<BootCamp | undefined>();
  const [selectedSubscribeType, setSelectedSubscribeType] = useState("");
  const [selectedHighScholl, setSelectedHighScholl] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userCPF, setUserCPF] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userScholl, setUserScholl] = useState("");


  function handleSubscribeType(event: React.ChangeEvent<HTMLInputElement>) {
    setSelectedSubscribeType(event.target.value);
  }

  function handleHighScholl(event: React.ChangeEvent<HTMLInputElement>) {
    setSelectedHighScholl(event.target.value);
  }
  

  async function GetInfoBootcamp() {
    var data = await GetBootcamp()
    const parse = JSON.parse(data!);
    console.log(parse)
    setBootcamp(parse);
  }
  var date = bootCamp
    ? format(bootCamp.start_date, "dd'/'LL")
        .concat(" - ")
        .concat(format(bootCamp.end_date, "dd'/'LL"))
    : null;

  useEffect(() => {
    GetInfoBootcamp();
  }, []);

  return (
    <>
      <div className="w-vh h-vh flex justify-center  ">
        <div className=" h-vh w-1/2 bg-blue-2 mt-9 p-9">
          <p className="font-medium text-white text-4xl">{bootCamp?.title}</p>
          <p className="font-medium text-gray text-xl">{date}</p>
          <p className="font-medium text-gray text-xl mb-12">
            {bootCamp?.address}
          </p>

          <form  className="flex flex-col items-center" onSubmit={(e) => RegisterEvent({event: e, id: 1, highScholl: selectedHighScholl, navigate: navigate, phoneNumber: userPhone, selectedSubscribeType: selectedSubscribeType, setUserPassword: setUserPassword, userCPF: userCPF, userEmail: userEmail, userName: userName, userPassword: userPassword, userScholl: userScholl })}>
            <fieldset className="w-full  ">
              <legend className="text-3xl font-medium text-white">
                Tipo de inscrição
              </legend>
              <div>
                <input
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  type="radio"
                  id="subscribeChoice1"
                  name="subscribeType"
                  checked={selectedSubscribeType === "medio"}
                  onChange={handleSubscribeType}
                  value="medio"
                />
                <label className="text-2xl font-normal text-white mr-16"> Ensino médio</label>

                <input
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  type="radio"
                  id="subscribeChoice2"
                  name="subscribeType"
                  value="tecnico"
                  checked={selectedSubscribeType === "tecnico"}
                  onChange={handleSubscribeType}
                />
                <label className="text-2xl font-normal text-white"> Ensino técnico</label>
              </div>
            </fieldset>
            <fieldset className="mt-14 w-full ">
              <legend className="text-3xl font-medium text-white">
                Ano do ensino médio
              </legend>
              <div>
                <input
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  type="radio"
                  id="highScholl1"
                  name="highScholl"
                  value="1"
                  checked={selectedHighScholl === "1"}
                  onChange={handleHighScholl}
                />
                <label className="text-2xl font-normal text-white mr-16"> 1º </label>
                <input
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  type="radio"
                  id="highScholl2"
                  name="highScholl"
                  value="2"
                  checked={selectedHighScholl === "2"}
                  
                  onChange={handleHighScholl}
                />
                <label className="text-2xl font-normal text-white mr-16"> 2º</label>

                <input
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  type="radio"
                  id="highScholl3"
                  name="highScholl"
                  value="3"
                  checked={selectedHighScholl === "3"}
                  onChange={handleHighScholl}
                />
                <label className="text-2xl font-normal text-white mr-16"> 3º</label>

                <input
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  type="radio"
                  id="highScholl4"
                  name="highScholl"
                  value="4"
                  checked={selectedHighScholl === "4"}
                  onChange={handleHighScholl}
                />
                <label className="text-2xl font-normal text-white"> Completo </label>
              </div>
            </fieldset>
            <div className="mt-10 w-full">
              <p className="text-2xl font-medium text-white ml-2">Nome</p>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="ex: Felipe Takayuki"
                onChange={event => setUserName(event.target.value)}
                required
                className=" rounded-2xl w-full h-14 border-4 border-white bg-blue-2 placeholder-gray text-2xl p-2 text-white focus:border-white focus:outline-none"
              />
              <div className="flex w-full mt-4">
                <div className="w-3/5 ">
                  <p className="text-2xl font-medium text-white ml-2">E-mail</p>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={event => setUserEmail(event.target.value)}
                    placeholder="ex: felipe@email.com"
                    required
                    className="w-full rounded-2xl  h-14 border-4 border-white bg-blue-2 placeholder-gray text-2xl p-2 text-white focus:border-white focus:outline-none"
                  />
                </div>
                <div className="w-2/5">
                  <p className="text-2xl font-medium text-white ml-2">Senha</p>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={event => setUserPassword(event.target.value)}
                    maxLength={8}
                    required
                    className="w-full ml-1  rounded-2xl h-14 border-4 border-white bg-blue-2 placeholder-white text-2xl p-2 text-white focus:border-white focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="mt-20 w-full">
              <p className="text-2xl font-medium text-white ml-2">CPF</p>
              <input
                type="text"
                pattern="^[0-9]+$"
                maxLength={11}
                name="cpf"
                id="cpf"
                placeholder="ex: 44455544455"
                onChange={event => setUserCPF(event.target.value)}
                required
                className=" mb-4 rounded-2xl w-full h-14 border-4 border-white bg-blue-2 placeholder-gray text-2xl p-2 text-white focus:border-white focus:outline-none"
              />
              <p className="text-2xl font-medium text-white ml-2">Telefone</p>
              <input
                type="text"
                pattern="^[0-9]+$"
                maxLength={11}
                name="phone"
                id="phone"
                placeholder="ex: 14997996699"
                onChange={event => setUserPhone(event.target.value)}
                required
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none mb-4 rounded-2xl w-full h-14 border-4 border-white bg-blue-2 placeholder-gray text-2xl p-2 text-white focus:border-white focus:outline-none"
              />
              <p className="text-2xl font-medium text-white ml-2">Escola</p>
              <input
                type="text"
                name="scholl"
                id="escola"
                placeholder="ex: ETEC ANTONIO DEVISATE"
                onChange={event => setUserScholl(event.target.value)}
                required
                className="rounded-2xl w-full h-14 border-4 border-white bg-blue-2 placeholder-gray text-2xl p-2 text-white focus:border-white focus:outline-none"
              />
            </div>

            <input
              type="submit"

              value="Confirmar Inscrição"
              className="w-80 h-16 text-2xl text-center text-blue-2 font-semibold rounded-2xl bg-white mt-10 mb-40 "
            />
          </form>
        </div>
      </div>
    </>
  );
}
