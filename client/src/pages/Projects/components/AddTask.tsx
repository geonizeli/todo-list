import AddTaskIcon from "@mui/icons-material/AddTask";
import { Box, Button, TextField, Toolbar } from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { KeyedMutator } from "swr";
import { useAuth } from "../../../hooks/useAuth";
import { APIProjectTasksList } from "./Project";

type NewTaskForm = {
  description: string;
};

export type AddTaskProps = {
  projectId: number;
  mutate: KeyedMutator<APIProjectTasksList>;
};

export const AddTask = ({ projectId, mutate }: AddTaskProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { apiClient } = useAuth();
  const { register, handleSubmit, reset } = useForm<NewTaskForm>();

  const onSubmit: SubmitHandler<NewTaskForm> = (data) => {
    setIsLoading(true);
    apiClient(`projects/${projectId}/tasks`, {
      method: "POST",
      body: JSON.stringify(data),
    }).then(() => {
      mutate();
      reset();
      setIsLoading(false);
    });
  };

  return (
    <Box onSubmit={handleSubmit(onSubmit)} component={"form"}>
      <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
        <TextField
          disabled={isLoading}
          placeholder="New task description "
          variant="standard"
          {...register("description")}
        />
        <Button
          disabled={isLoading}
          type="submit"
          size="small"
          variant="outlined"
          sx={{ marginLeft: "1rem" }}
          startIcon={<AddTaskIcon />}
        >
          Add task
        </Button>
      </Toolbar>
    </Box>
  );
};
