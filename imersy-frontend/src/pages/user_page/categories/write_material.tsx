import MDEditor, { commands } from "@uiw/react-md-editor";
import { useState } from "react";
import { WriteMaterialClass } from "../../../api/m_class";

export function WriteSection() {
  const [content, setContent] = useState<string | undefined>("");
  const [title, setTitle] = useState<string | undefined>("");
  const [subject, setSubject] = useState<string | undefined>("");
  return (
    <>
      <div>
        <form onSubmit={(event) => WriteMaterialClass(event, title!, subject!, content!)}>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Nome da aula"
          onChange={(event) => setTitle(event.target.value)}
          required
          className="w-3/4 rounded-2xl mt-28 h-14 border-4 border-white bg-blue-2 placeholder-white text-2xl p-2 text-white focus:border-white focus:outline-none"
        />
        <input
          type="text"
          name="subject"
          id="subject"
          placeholder="Conteúdo"
          required
          onChange={(event) => setSubject(event.target.value)}
          className="w-3/4 rounded-2xl mt-4 h-14 border-4 border-white bg-blue-2 placeholder-white text-2xl p-2 text-white focus:border-white focus:outline-none"
        />
        <MDEditor
          className="w-3/4 text-2xl text-blue mb-2 mt-4 "
          data-color-mode="light"
          commands={[ commands.title1, commands.title2, commands.title3, commands.codeBlock, commands.unorderedListCommand, commands.bold, commands.italic ]}
          value={content}
          preview={"edit"}
          onChange={(textMD: string | any) => setContent(textMD)}
        />
        <input type="submit" className="mt-2 px-20 w-1/4 h-auto py-7 text-3xl rounded-2xl text-white bg-blue-2" value={"Enviar"} />
        </form>

      </div>
    </>
  );
}
