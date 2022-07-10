import { createContext } from "react";

type ProjectProviderValue = {
  project: {
    id: number;
    name: string;
  };
  projectMutate: Function;
  tasksMutate: Function;
};

export const ProjectContext = createContext<ProjectProviderValue | null>(null);

type ProjectProviderProps = ProjectProviderValue & {
  children: React.ReactNode;
};

export const ProjectProvider = ({
  children,
  ...rest
}: ProjectProviderProps) => {
  return (
    <ProjectContext.Provider value={rest}>{children}</ProjectContext.Provider>
  );
};
