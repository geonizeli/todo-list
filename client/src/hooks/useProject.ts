import { useContext } from "react";
import { ProjectContext } from "../providers/ProjectProvider";

export const useProject = () => {
  const context = useContext(ProjectContext);

  if (context === null) {
    throw new Error("You probably forgot to put <ProjectProvider>.");
  }

  return context;
};
