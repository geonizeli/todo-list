import { List, ListSubheader } from "@mui/material";
import { KeyedMutator } from "swr";
import { useAuth } from "../../../hooks/useAuth";
import { APIProjectTasksList } from "./Project";
import { Task, TasksListItem } from "./TasksListItem";

export type TaskListProps = {
  projectId: number;
  title: string;
  tasks: Task[];
  mutate: KeyedMutator<APIProjectTasksList>;
};

export const TasksList = ({
  projectId,
  title,
  tasks,
  mutate,
}: TaskListProps) => {
  const { apiClient } = useAuth();
  const handleCheck = (taskId: number) => {
    apiClient(`projects/${projectId}/tasks/${taskId}/finish`).then((res) => {
      mutate();
    });
  };

  const handleDelete = (taskId: number) => {
    apiClient(`projects/${projectId}/tasks/${taskId}`, {
      method: "DELETE",
    }).then((res) => {
      mutate();
    });
  };

  return (
    <List
      dense
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          {title}
        </ListSubheader>
      }
    >
      {tasks.map((task) => (
        <TasksListItem
          key={task.id}
          task={task}
          onCheck={handleCheck}
          onDelete={handleDelete}
        />
      ))}
    </List>
  );
};
