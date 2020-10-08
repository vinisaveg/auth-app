export const registerUserMutation = `
    mutation($username: String!, $password: String!) {
        register(options: {username: $username, password: $password}) {
            id
            username
        }
    }
`;
