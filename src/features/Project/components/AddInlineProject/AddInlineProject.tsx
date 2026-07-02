import type { FC } from "react";
import s from "./AddInlineProject.module.css";

type Props = {
  value: string;
  setValue: (value: string) => void;
  handleInlineCreateProject: (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => Promise<void>;
};

const AddInlineProject: FC<Props> = ({
  value,
  setValue,
  handleInlineCreateProject,
}) => {
  return (
    <div className={s.addInline}>
      <input
        className={s.inlineInput}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleInlineCreateProject}
        placeholder="Project name..."
      />
    </div>
  );
};

export default AddInlineProject;
