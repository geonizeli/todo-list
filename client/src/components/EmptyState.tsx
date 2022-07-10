import { Grid, Typography } from "@mui/material";
import { ReactNode } from "react";

type EmptySateProps = {
  mini?: boolean;
  children: ReactNode;
};

export const EmptySate = ({ children, mini = false }: EmptySateProps) => {
  return (
    <Grid sx={{ textAlign: "center" }}>
      <Typography variant={mini ? "body2" : "subtitle1"}>{children}</Typography>
    </Grid>
  );
};
