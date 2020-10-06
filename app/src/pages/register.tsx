import React, { FunctionComponent } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/dist/client/router";
import { Button, Flex, Heading, Spinner } from "@chakra-ui/core";

import { validationSchema } from "../utils/validationSchema";
import { Container } from "../components/Container";
import InputField from "../components/InputField";

const Register: FunctionComponent = () => {
  const router = useRouter();

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
            type="text"
            value={formik.values.password}
            handleChange={formik.handleChange}
          />

          <InputField
            label="confirmPassword"
            placeholder="Confirm Password"
            error={formik.errors.confirmPassword}
            type="text"
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
