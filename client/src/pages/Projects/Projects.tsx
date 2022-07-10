import { Box } from "@mui/material";
import useSWR from "swr";
import { useAuth } from "../../hooks/useAuth";
import { createSWRFetcher } from "../../utils/swrFetcher";
import { Project } from "./components/Project";

type APIProjectList = {
  data: {
    id: number;
    name: string;
  }[];
};

export const Projects = () => {
  const { token } = useAuth();
  const fetcher = createSWRFetcher(token);
  const { data } = useSWR<APIProjectList>("projects", fetcher);

  return (
    <Box sx={{ display: "grid", gridAutoColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
      {data?.data.map((project) => (
        <Project key={project.id} {...project} />
      ))}
    </Box>
  );
};
