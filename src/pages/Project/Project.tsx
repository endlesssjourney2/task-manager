import { useParams } from "react-router";
import s from "./Project.module.css";

const Project = () => {
  const { id } = useParams();

  return <div className={s.project}>Here is your project ID: {id}</div>;
};

export default Project;
