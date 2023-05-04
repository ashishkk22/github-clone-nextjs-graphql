import * as Yup from "yup";

export const SignInSchema = Yup.object().shape({
  username: Yup.string().required("Username is required !"),
  password: Yup.string()
    .min(6, "Must be at least 6 characters")
    .required("Password is required !"),
});
