import { type FC } from "react";
import s from "./TaskInfoBadge.module.css";
import type { Priority, Status } from "../../../types/task";
import { capitalizeFirst } from "../../../helpers/capitalizeFirst";
import { PRIORITY_COLORS } from "../../../constants/priority";
import { Tooltip } from "antd";
import { IconFlag } from "@tabler/icons-react";
import { STATUS_COLORS, STATUS_ICONS } from "../../../constants/status";

type Props = {
  status: Status;
  priority: Priority;
};

const TaskInfoBadge: FC<Props> = ({ status, priority }) => {
  const StatusIcon = STATUS_ICONS[status];

  return (
    <Tooltip
      title={
        <>
          <div>Priority: {capitalizeFirst(priority)}</div>
          <div>Status: {capitalizeFirst(status)}</div>
        </>
      }
      placement="left"
      color={"blue"}
    >
      <div className={s.info}>
        <IconFlag size={18} color={PRIORITY_COLORS[priority]} />
        <StatusIcon size={18} color={STATUS_COLORS[status]} />
      </div>
    </Tooltip>
  );
};

export default TaskInfoBadge;
