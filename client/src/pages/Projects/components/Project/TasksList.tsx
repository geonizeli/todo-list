import { List, ListSubheader } from "@mui/material";
import { useAuth } from "../../../../hooks/useAuth";
import { useProject } from "../../../../hooks/useProject";
import { Task, TasksListItem } from "./TasksListItem";

export type TaskListProps = {
  title: string;
  tasks: Task[];
};

export const TasksList = ({ title, tasks }: TaskListProps) => {
  const { apiClient } = useAuth();
  const { tasksMutate, project } = useProject();

  const handleCheck = (taskId: number) => {
    apiClient(`projects/${project.id}/tasks/${taskId}/finish`).then((res) => {
      tasksMutate();
    });
  };

  const handleDelete = (taskId: number) => {
    apiClient(`projects/${project.id}/tasks/${taskId}`, {
      method: "DELETE",
    }).then((res) => {
      tasksMutate();
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
