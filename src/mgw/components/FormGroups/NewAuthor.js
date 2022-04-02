import helper from "../../utils/helper";
import { Grid, TextField } from "@mui/material";

export default function NewAuthor(props) {
  const { register, errors } = props;

  return (
    <Grid container spacing={4} sx={{ justifyContent: "center"}}>
      <Grid item xs={8}>
        <TextField
          fullWidth
          label="Display Name"
          name="displayName"
          error={!!errors?.displayName}
          helperText={errors?.displayName?.message}
          {...register("displayName", {
            pattern: {
              value: helper.regex.displayName,
              message: helper.templates.special,
            },
            maxLength: {
              value: 80,
              message: helper.templates.maxLength(80),
            },
          })}
        />
      </Grid>
      <Grid item xs={8}>
        <TextField
          fullWidth
          label="Contact Name"
          name="name"
          error={!!errors?.name}
          helperText={errors?.name?.message}
          {...register("name", {
            required: {
              value: true,
              message: helper.templates.required,
            },
            pattern: {
              value: helper.regex.displayName,
              message: helper.templates.special,
            },
            maxLength: {
              value: 80,
              message: helper.templates.maxLength(80),
            },
          })}
        />
      </Grid>
      <Grid item xs={8}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          error={!!errors?.email}
          helperText={errors?.email?.message}
          {...register("email", {
            required: {
              value: true,
              message: helper.templates.required,
            },
            pattern: {
              value: helper.regex.email,
              message: helper.templates.email,
            },
          })}
        />
      </Grid>
    </Grid>
  );
}
