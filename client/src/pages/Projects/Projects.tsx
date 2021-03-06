import { Box } from "@mui/material";
import useSWR from "swr";
import { EmptySate } from "../../components/EmptyState";
import { useAuth } from "../../hooks/useAuth";
import { createSWRFetcher } from "../../utils/swrFetcher";
import { NewProjectAction } from "./components/NewProjectAction";
import { Project } from "./components/Project";

export type APIProjectList = {
  data: {
    id: number;
    name: string;
  }[];
};

export const Projects = () => {
  const { token } = useAuth();
  const fetcher = createSWRFetcher(token);
  const { data, mutate } = useSWR<APIProjectList>("projects", fetcher);

  return (
    <>
      <NewProjectAction mutate={mutate} />
      <Box
        sx={{
          display: "grid",
          gridAutoColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        }}
      >
        {(!!data?.data.length) ? null : (
          <EmptySate>You didn't have any project yet</EmptySate>
        )}
        {data?.data.map((project) => (
          <Project projectMutate={mutate} key={project.id} {...project} />
        ))}
      </Box>
    </>
  );
};
