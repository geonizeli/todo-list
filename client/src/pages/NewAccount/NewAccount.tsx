import { LoadingButton } from "@mui/lab";
import { Alert, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { createApiClient } from "../../utils/apiFetch";

type NewAccountForm = {
  email: string;
  password: string;
};

export const NewAccount = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const apiClient = createApiClient();

  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewAccountForm>();

  const onSubmit: SubmitHandler<NewAccountForm> = (data) => {
    setLoading(true);

    apiClient("users", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        const result = await res.json();
        if (result.error) {
          setError(result.error);
        } else {
          login(data.email, data.password);
        }
      })
      .finally(() => setLoading(false));
  };
  return (
    <div>
      <h1>New Account Page</h1>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={!!errors.email}
          helperText={errors.email?.message}
          disabled={loading}
          autoFocus
          margin="dense"
          fullWidth
          label="Email Address"
          type="email"
          variant="standard"
          required
          {...register("email", {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
        <TextField
          error={!!errors.password}
          helperText={errors.password?.message}
          disabled={loading}
          margin="dense"
          fullWidth
          label="Password"
          type="password"
          variant="standard"
          required
          {...register("password", { minLength: 8 })}
        />
        <Stack direction="row-reverse" spacing={3}>
          <LoadingButton type="submit" loading={loading} variant="contained">
            Create account
          </LoadingButton>
        </Stack>
      </form>
    </div>
  );
};
