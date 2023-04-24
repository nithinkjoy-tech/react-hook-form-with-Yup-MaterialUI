import {TextField, Button, Box} from "@mui/material";
import "./App.css";
import {useForm} from "react-hook-form";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

const schema = Yup.object().shape({
  name: Yup.string()
    .required()
    .min(3,"minimum 3 characters long")
    .matches(/^[A-Za-z]+$/, "Only alphabets allowed")
    .label("Name"),
  email: Yup.string().required().email("must be valid email").label("Email"),
});

type FormData = Yup.InferType<typeof schema>;

function App() {
  const {
    handleSubmit,
    formState: {errors},
    register,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const submit = (data: FormData) => {
    console.log(data);
  };

  const inputBoxStyles = {
    marginBottom: "1.2rem",
    '& .MuiSlider-thumb': {
      borderRadius: '1px',
    },
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Box >
        <TextField
          required
          id="name"
          label="Name"
          fullWidth
          margin="dense"
          sx={errors?.name ? {} : inputBoxStyles}
          helperText={errors?.name?.message}
          {...register("name")}
          error={errors.name ? true : false}
        />

        <TextField
          required
          id="email"
          label="Email"
          fullWidth
          margin="dense"
          sx={errors?.name ? {} : inputBoxStyles}
          helperText={errors?.email?.message}
          {...register("email")}
          error={errors.email ? true : false}
        />
        <Button
          variant="contained"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
      </Box>
    </form>
  );
}

export default App;
