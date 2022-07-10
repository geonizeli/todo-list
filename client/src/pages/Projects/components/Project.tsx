import { Add } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
} from "@mui/material";
import useSWR from "swr";
import { useAuth } from "../../../hooks/useAuth";
import { createSWRFetcher } from "../../../utils/swrFetcher";
import { TaskListProps, TasksList } from "./TasksList";
import { AddTask } from "./AddTask";
export type APIProjectTasksList = {
  data: TaskListProps["tasks"];
};

export type ProjectProps = {
  id: number;
  name: string;
};

export const Project = (props: ProjectProps) => {
  const { token } = useAuth();
  const fetcher = createSWRFetcher(token);

  const { data, mutate } = useSWR<APIProjectTasksList>(
    `projects/${props.id}/tasks`,
    fetcher
  );

  const uncompletedTasks = data?.data.filter((task) => !task.finishedAt) ?? [];
  const completedTasks = data?.data.filter((task) => task.finishedAt) ?? [];

  return (
    <Card sx={{ margin: 4 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.name}
      />
      <CardContent>
        <AddTask projectId={props.id} mutate={mutate} />
        <TasksList
          projectId={props.id}
          mutate={mutate}
          title="To Do"
          tasks={uncompletedTasks}
        />
        <TasksList
          projectId={props.id}
          mutate={mutate}
          title="Done"
          tasks={completedTasks}
        />
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add task">
          <Add />
        </IconButton>
      </CardActions>
    </Card>
  );
};
