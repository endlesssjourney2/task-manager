import { useParams } from "react-router";
import s from "./Project.module.css";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import useTasks from "../../hooks/useTasks";
import TasksInputs from "./components/TasksInputs/TasksInputs";

const Project = () => {
  const { id } = useParams();
  const { tasks, addTask, removeTask } = useTasks(id);

  const handleAddTask = async (
    title: string,
    description: string,
    priority: string,
    date: string,
  ) => {
    const result = await addTask(title, description, priority, date);
    return result;
  };

  return (
    <div className={s.project}>
      <CustomHeader title="Your tasks" />
      <div className={s.content}>
        <TasksInputs handleCreateTask={handleAddTask} />
      </div>
      {tasks.map((t) => (
        <div className={s.test}>
          <div>{t.title}</div>
          <div>{t.description}</div>
          <div>{t.due_date}</div>
          <button onClick={() => removeTask(t.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Project;
