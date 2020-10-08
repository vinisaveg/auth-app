import React, { FunctionComponent } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/dist/client/router";
import { Button, Flex, Heading, Spinner } from "@chakra-ui/core";
import { useMutation } from "urql";

import { validationSchema } from "../utils/validationSchema";
import { Container } from "../components/Container";
import InputField from "../components/InputField";
import { registerUserMutation } from "../graphql/mutaions/registerUserMutation";

const Register: FunctionComponent = () => {
  const router = useRouter();

  const [registerResult, register] = useMutation(registerUserMutation);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values, actions) => {
      const response = await register(values);

      console.log(response.data.register);

      router.push("/");
    },
    validationSchema: validationSchema,
  });

  return (
    <Container height="100vh">
      <Heading mb={5}>Register</Heading>

      <form onSubmit={formik.handleSubmit}>
        <Flex justifyContent="center" alignItems="center" flexDir="column">
          <InputField
            label="username"
            placeholder="Username"
            error={formik.errors.username}
            type="text"
            value={formik.values.username}
            handleChange={formik.handleChange}
          />

          <InputField
            label="password"
            placeholder="Password"
            error={formik.errors.password}
            type="password"
            value={formik.values.password}
            handleChange={formik.handleChange}
          />

          <InputField
            label="confirmPassword"
            placeholder="Confirm Password"
            error={formik.errors.confirmPassword}
            type="password"
            value={formik.values.confirmPassword}
            handleChange={formik.handleChange}
          />

          <Button type="submit" w="100%" alignSelf="flex-end" mt={5}>
            {formik.isSubmitting ? <Spinner /> : "Register"}
          </Button>
        </Flex>
      </form>
    </Container>
  );
};

export default Register;
