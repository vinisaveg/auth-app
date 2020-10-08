import { Button, ButtonGroup, Flex, Heading } from "@chakra-ui/core";
import Link from "next/link";
import { useQuery } from "urql";

import { Container } from "../components/Container";
import { usersQuery } from "../graphql/queries/usersQuery";

const Index = () => {
  const [usersResult, reexecuteQuery] = useQuery({
    query: usersQuery,
  });

  const { data } = usersResult;
  console.log(data);

  return (
    <Container height="100vh">
      <Flex flexDir="column" alignItems="center" justifyContent="center">
        <Heading mb={3}>Hello Stranger!</Heading>

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
