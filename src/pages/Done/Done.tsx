import { DoneTasksProvider } from "../../context/DoneTasksContext";
import DoneContent from "./DoneContent";

const Done = () => {
  return (
    <DoneTasksProvider>
      <DoneContent />
    </DoneTasksProvider>
  );
};

export default Done;
