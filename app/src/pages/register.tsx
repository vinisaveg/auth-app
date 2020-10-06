import React, { FunctionComponent } from "react";
import { useFormik } from "formik";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
} from "@chakra-ui/core";
import { useRouter } from "next/dist/client/router";
import * as Yup from "yup";

import { Container } from "../components/Container";

const Register: FunctionComponent = () => {
  const router = useRouter();

  const registerSchema = Yup.object().shape({
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

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values, actions) => {
      console.log(values);
      actions.resetForm();
      router.push("/");
    },
    validationSchema: registerSchema,
  });

  return (
    <Container height="100vh">
      <Heading mb={5}>Register</Heading>

      <form onSubmit={formik.handleSubmit}>
        <Flex justifyContent="center" alignItems="center" flexDir="column">
          <FormControl>
            <FormLabel htmlFor="username">
              {formik.errors.username ? formik.errors.username : null}
            </FormLabel>

            <Input
              value={formik.values.username}
              type="text"
              id="username"
              placeholder="Username"
              onChange={formik.handleChange}
            />
          </FormControl>

          <FormControl mt={3}>
            <FormLabel htmlFor="password">
              {formik.errors.password ? formik.errors.password : null}
            </FormLabel>
            <Input
              isRequired
              value={formik.values.password}
              type="password"
              id="password"
              placeholder="Password"
              onChange={formik.handleChange}
            />
          </FormControl>

          <FormControl mt={3}>
            <FormLabel htmlFor="confirmPassword">
              {formik.errors.confirmPassword
                ? formik.errors.confirmPassword
                : null}
            </FormLabel>
            <Input
              isRequired
              value={formik.values.confirmPassword}
              type="password"
              id="confirmPassword"
              placeholder="Confirm password"
              onChange={formik.handleChange}
            />
          </FormControl>

          <Button type="submit" w="100%" alignSelf="flex-end" mt={5}>
            {formik.isSubmitting ? <Spinner /> : "Register"}
          </Button>
        </Flex>
      </form>
    </Container>
  );
};

export default Register;
