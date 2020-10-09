export const loginUserMutation = `
    mutation($username: String!, $password: String!) {
        login(options: {username: $username, password: $password}) {
            id
            username
        }
    }
`