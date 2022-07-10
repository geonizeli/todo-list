import { Add } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
} from "@mui/material";
import useSWR from "swr";
import { useAuth } from "../../../hooks/useAuth";
import { ProjectProvider } from "../../../providers/ProjectProvider";
import { createSWRFetcher } from "../../../utils/swrFetcher";
import { AddTask } from "./AddTask";
import { ProjectOptions } from "./ProjectOptions";
import { TaskListProps, TasksList } from "./TasksList";

export type APIProjectTasksList = {
  data: TaskListProps["tasks"];
};

export type ProjectProps = {
  id: number;
  name: string;
  projectMutate: Function;
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
    <ProjectProvider
      project={props}
      tasksMutate={mutate}
      projectMutate={props.projectMutate}
    >
      <Card sx={{ margin: 4 }}>
        <CardHeader action={<ProjectOptions />} title={props.name} />
        <CardContent>
          <AddTask />
          <TasksList title="To Do" tasks={uncompletedTasks} />
          <TasksList title="Done" tasks={completedTasks} />
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add task">
            <Add />
          </IconButton>
        </CardActions>
      </Card>
    </ProjectProvider>
  );
};
