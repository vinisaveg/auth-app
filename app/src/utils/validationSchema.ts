import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username too short!")
    .max(25, "Username too long!")
    .required("Username is required!"),
  password: Yup.string()
    .min(5, "Password too short!")
    .max(36, "Password too long!")
    .required("Password is required!"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), ""],
    "Passwords must match!"
  ),
});
