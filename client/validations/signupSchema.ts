import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
  username: Yup.string().required("User name is required !"),
  password: Yup.string()
    .min(6, "Must be at least 6 characters")
    .required("Password is required !"),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("password")],
      "Confirm password must match with above password !"
    )
    .required("Confirm password is required !"),
  token: Yup.string().required("Github token is required !"),
});
