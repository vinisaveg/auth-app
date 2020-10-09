import React, { FunctionComponent } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/dist/client/router";
import {useMutation} from 'urql'

import { Container } from "../components/Container";
import { Button, Flex, Heading, Spinner } from "@chakra-ui/core";
import { validationSchema } from "../utils/validationSchema";
import InputField from "../components/InputField";
import { loginUserMutation } from "../graphql/mutaions/loginUserMutation";

const Login: FunctionComponent = () => {
  const router = useRouter();

  const [loginResult, login] = useMutation(loginUserMutation)

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values, actions) => {
      const response = await login(values)
      console.log(response.data)

      router.push("/");
    },
    validationSchema: validationSchema,
  });

  return (
    <Container height="100vh">
      <Heading mb={5}>Login</Heading>

      <form onSubmit={formik.handleSubmit}>
        <Flex justifyContent="center" alignItems="center" flexDir="column">
          <InputField
            label="username"
            placeholder="Username"
            type="text"
            value={formik.values.username}
            error={formik.errors.username}
            handleChange={formik.handleChange}
          />

          <InputField
            label="password"
            placeholder="Password"
            type="password"
            value={formik.values.password}
            error={formik.errors.password}
            handleChange={formik.handleChange}
          />

          <Button type="submit" w="100%" alignSelf="flex-end" mt={5}>
            {formik.isSubmitting ? <Spinner /> : "Login"}
          </Button>
        </Flex>
      </form>
    </Container>
  );
};

export default Login;
