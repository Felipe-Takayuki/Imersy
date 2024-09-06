import { useState } from "react";
import { SendProject } from "../../../api/project";

export function WriteProjectSection() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [videoURL, setVideoURL] = useState("")
    const [projectURL, setProjecURL] = useState("")
    return (
    <>
   
        <form className="flex flex-col" onSubmit={(e) => SendProject(e, title, description, videoURL, projectURL)}>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Nome do projeto"
          required
          onChange={(event) => (setTitle(event.target.value))}
          className="w-2/5 rounded-2xl mt-28 max-lg:w-full h-14 border-4 border-white bg-blue-2 placeholder-white text-2xl p-2 text-white focus:border-white focus:outline-none"
        />
        <input
          type="text"
          name="description"
          id="description"
          placeholder="Descrição breve ..."
          required
          onChange={(event) => (setDescription(event.target.value))}
          className="w-2/5 rounded-2xl max-lg:w-full mt-4 h-14 border-4 border-white bg-blue-2 placeholder-white text-2xl p-2 text-white focus:border-white focus:outline-none"
        />
        <input
          type="url"
          name="video_url"
          placeholder="link do vídeo"
          id="video_url"
          onChange={(event) => (setVideoURL(event.target.value))}
          className="w-1/3 max-lg:w-3/4 border-b-4 mt-10 max-sm:w-full  text-white bg-blue-1 border-white focus:outline-none text-2xl placeholder-white"
        />
        <input
          type="url"
          name="project_url"
          placeholder="link do projeto"
          id="project_url"
          onChange={(event) => (setProjecURL(event.target.value))}
          className="w-1/3 text-white max-lg:w-3/4 border-b-4 max-sm:w-full mt-10 bg-blue-1 border-white focus:outline-none text-2xl placeholder-white"
        />
        <input type="submit" className="mt-16 px-20 w-1/4 max-lg:w-3/4 max-lg:h-auto h-auto py-7 text-3xl rounded-2xl text-white bg-blue-2" value={"Enviar"} />
        </form>


    </>
  );
}
