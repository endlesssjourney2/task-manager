import { useState } from "react";
import { useProjectsContext } from "../../../../context/ProjectsContext";
import s from "./AddInlineProject.module.css";
import { getRandomColor } from "../../../../helpers/getRandomColor";
import { ColorPicker } from "antd";
import { IconFolder } from "@tabler/icons-react";

const AddInlineProject = () => {
  const { addProject } = useProjectsContext();

  const [inlineTitle, setInlineTitle] = useState("");
  const [inlineColor, setInlineColor] = useState(getRandomColor());

  const handleInlineCreateProject = async (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") {
      if (!inlineTitle.trim()) return;
      await addProject(inlineTitle, inlineColor);
      setInlineTitle("");
      setInlineColor(getRandomColor());
    }
  };

  return (
    <div className={s.addInline}>
      <ColorPicker
        value={inlineColor}
        onChange={(v) => setInlineColor(v.toHexString())}
        placement="bottom"
      >
        <IconFolder
          color={inlineColor}
          size={20}
          style={{ cursor: "pointer" }}
        />
      </ColorPicker>
      <input
        className={s.inlineInput}
        value={inlineTitle}
        onChange={(e) => setInlineTitle(e.target.value)}
        onKeyDown={handleInlineCreateProject}
        placeholder="Project name..."
      />
    </div>
  );
};

export default AddInlineProject;
