import { useState } from "react";
import { useProjectsContext } from "../../../../context/ProjectsContext";
import s from "./AddInlineProject.module.css";
import { getRandomColor } from "../../../../helpers/getRandomColor";
import { ColorPicker, Input } from "antd";
import {
  IconCancel,
  IconFolder,
  IconPlus,
  IconRestore,
} from "@tabler/icons-react";

const AddInlineProject = () => {
  const { addProject, actionLoading } = useProjectsContext();

  const [inlineTitle, setInlineTitle] = useState("");
  const [inlineColor, setInlineColor] = useState(getRandomColor());
  const [isAdding, setIsAdding] = useState(false);

  const reset = () => {
    setInlineTitle("");
    setInlineColor(getRandomColor());
  };

  const handleCancel = () => {
    setIsAdding(false);
    reset();
  };

  const handleAddProject = async () => {
    const result = await addProject(inlineTitle, inlineColor);
    if (result) {
      reset();
    }
  };

  return (
    <>
      {!isAdding && (
        <div className={s.addProject} onClick={() => setIsAdding(true)}>
          <span className={s.addProjectTitle}>Add project +</span>
        </div>
      )}

      {isAdding && (
        <div className={s.addingContainer}>
          <div className={s.input}>
            <Input.TextArea
              autoFocus
              rows={1}
              autoSize={{ minRows: 1, maxRows: 3 }}
              placeholder="Project title"
              value={inlineTitle}
              onChange={(e) => setInlineTitle(e.target.value)}
              className={s.titleInput}
            />
          </div>
          <div className={s.bottom}>
            <ColorPicker
              value={inlineColor}
              onChange={(v) => setInlineColor(v.toHexString())}
              placement="bottom"
            >
              <div
                className={s.color}
                style={{ borderColor: inlineColor, color: inlineColor }}
              >
                <IconFolder className={s.icon} color={inlineColor} size={16} />
                <span>Color</span>
              </div>
            </ColorPicker>

            <div className={s.buttons}>
              <button
                className={`${s.btn} ${s.cancelBtn}`}
                onClick={handleCancel}
                disabled={actionLoading}
              >
                <IconCancel size={16} />
                Cancel
              </button>
              <button
                className={`${s.btn} ${s.resetBtn}`}
                onClick={reset}
                disabled={actionLoading}
              >
                <IconRestore size={16} />
                Reset
              </button>
              <button
                className={`${s.btn} ${s.addBtn}`}
                onClick={handleAddProject}
                disabled={actionLoading}
              >
                <IconPlus size={16} />
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddInlineProject;
