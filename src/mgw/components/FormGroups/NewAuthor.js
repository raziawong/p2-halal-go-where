import helper from "../../utils/helper";
import { Grid, TextField } from "@mui/material";

export default function NewAuthor(props) {
  const { articleWatch, register, errors } = props;

  return (
    <Grid container spacing={4} sx={{ justifyContent: "center"}}>
      <Grid item xs={8}>
        <TextField
          fullWidth
          label="Display Name"
          name="displayName"
        />
      </Grid>
      <Grid item xs={8}>
        <TextField
          fullWidth
          label="Contact Name"
          name="name"
        />
      </Grid>
      <Grid item xs={8}>
        <TextField
          fullWidth
          label="Email"
          name="email"
        />
      </Grid>
    </Grid>
  );
}
