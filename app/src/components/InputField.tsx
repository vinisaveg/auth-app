import { FormControl, FormLabel, Input } from "@chakra-ui/core";
import React, { FunctionComponent } from "react";

interface InputFieldProps {
  label: "username" | "password" | "confirmPassword";
  placeholder: string;
  type: string;
  value: string;
  error: string | undefined;
  handleChange: any;
}

const InputField: FunctionComponent<InputFieldProps> = ({
  label,
  type,
  placeholder,
  value,
  error,
  handleChange,
}) => {
  return (
    <FormControl>
      <FormLabel htmlFor={label}>{error ? error : null}</FormLabel>

      <Input
        value={value}
        type={type}
        id={label}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </FormControl>
  );
};

export default InputField;
