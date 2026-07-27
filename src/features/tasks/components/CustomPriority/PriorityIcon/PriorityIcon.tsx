import s from "./PriorityIcon.module.css";
import type { FC } from "react";
import type { Priority } from "../../../../../types/task";
import { IconFlag } from "@tabler/icons-react";
import {
  PRIORITY_COLORS,
  PRIORITY_LABELS,
} from "../../../../../constants/priority";

type Props = {
  priority: Priority;
};

const PriorityIcon: FC<Props> = ({ priority }) => {
  return (
    <span className={s.label}>
      <IconFlag size={14} color={PRIORITY_COLORS[priority]} />
      <span className={s.priority}>{PRIORITY_LABELS[priority]}</span>
    </span>
  );
};

export default PriorityIcon;
