import { DatePicker, Input } from "antd";
import type { Dayjs } from "dayjs";
import { useState, type FC } from "react";
import s from "./TasksInputs.module.css";
import dayjs from "dayjs";

type Props = {
  handleCreateTask: (
    title: string,
    description: string,
    priority: string,
    date: string | null,
  ) => Promise<boolean>;
};

const TasksInputs: FC<Props> = ({ handleCreateTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Dayjs | null>(null);

  const onClick = async () => {
    const result = await handleCreateTask(
      title,
      description,
      "medium",
      date ? date.format("YYYY-MM-DD") : null,
    );
    if (result) {
      setTitle("");
      setDescription("");
      setDate(null);
    }
  };

  return (
    <div className={s.inputs}>
      <Input
        size="large"
        placeholder="Title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={s.input}
      />
      <Input
        size="large"
        placeholder="Description"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={s.input}
      />
      <DatePicker
        disabledDate={(curr) => curr.isBefore(dayjs(), "day")}
        size="large"
        placeholder="End date"
        value={date}
        onChange={(d) => setDate(d)}
        className={s.datePicker}
      />
      <button onClick={onClick}>Add</button>
    </div>
  );
};

export default TasksInputs;
