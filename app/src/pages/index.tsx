import { Button, ButtonGroup, Flex, Heading } from "@chakra-ui/core";
import Link from "next/link";
import { useQuery } from "urql";

import { Container } from "../components/Container";
import { authQuery } from "../graphql/queries/authQuery";

const Index = () => {

  const [authResult, reexecuteQuery] = useQuery({
    query: authQuery
  })

  const {fetching, data} = authResult
  //console.log(authResult)

  let grettings

  if(fetching) {
    grettings =  "Stranger"
  }

  if(data?.auth) {
    grettings = data.auth.username
  }
  

  return (
    <Container height="100vh">
      <Flex flexDir="column" alignItems="center" justifyContent="center">
        <Heading mb={3}>Hello {grettings}</Heading>

        <ButtonGroup spacing={4}>
          <Link href="/login">
            <Button variant="solid" size="md">
              Login
            </Button>
          </Link>

          <Link href="/register">
            <Button variant="solid" size="md">
              Register
            </Button>
          </Link>
        </ButtonGroup>
      </Flex>
    </Container>
  );
};

export default Index;
