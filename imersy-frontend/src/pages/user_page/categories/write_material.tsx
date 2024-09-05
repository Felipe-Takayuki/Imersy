import MDEditor, { commands } from "@uiw/react-md-editor";
import { useState } from "react";

export function WriteSection() {
  const [content, setContent] = useState<string | undefined>("");
  return (
    <>
      <div>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Nome da aula"
          required
          className="w-3/4 rounded-2xl mt-28 h-14 border-4 border-white bg-blue-2 placeholder-white text-2xl p-2 text-white focus:border-white focus:outline-none"
        />
        <input
          type="text"
          name="subject"
          id="subject"
          placeholder="Conteúdo"
          required
          className="w-3/4 rounded-2xl mt-4 h-14 border-4 border-white bg-blue-2 placeholder-white text-2xl p-2 text-white focus:border-white focus:outline-none"
        />
        <MDEditor
          className="bg-white text-black"
          value={content}
          onChange={(writedContent) => setContent(writedContent)}
          data-color-mode="light"
          commands={[commands.bold, commands.title1, commands.title2, commands.title3, commands.codeBlock]}
        />
      </div>
    </>
  );
}
