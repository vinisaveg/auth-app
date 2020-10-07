import { ChakraProvider } from "@chakra-ui/core";

import theme from "../theme";
import { AppProps } from "next/app";
import { Provider } from "urql";

import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { client } from "../utils/urql";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <ChakraProvider resetCSS theme={theme}>
        <DarkModeSwitch />
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
