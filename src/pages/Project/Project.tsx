import { useParams } from "react-router";
import s from "./Project.module.css";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import { useState } from "react";
import useTasks from "../../hooks/useTasks";

const Project = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { id } = useParams();
  const { tasks, addTask } = useTasks(id);

  const handleAddTask = async () => {
    await addTask(title, description, "medium", null);
  };

  return (
    <div className={s.project}>
      <CustomHeader title="Your tasks" />
      <div className={s.content}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleAddTask}>Add</button>
      </div>
      {tasks.map((t) => (
        <div className={s.test}>
          <div>{t.title}</div>
          <div>{t.description}</div>
          <div>{t.due_date}</div>
        </div>
      ))}
    </div>
  );
};

export default Project;
