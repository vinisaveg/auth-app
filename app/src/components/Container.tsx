import { Flex, useColorMode, FlexProps } from "@chakra-ui/core";

export const Container = (props: FlexProps) => {
  const { colorMode } = useColorMode();

  const bgColor = { light: "white", dark: "black" };
  const color = { light: "black", dark: "white" };

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      {...props}
    />
  );
};
