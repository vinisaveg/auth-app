# auth-app

> An application to register, sign in and leave.

## Installation :construction_worker:

First clone this repository

```

    git clone https://github.com/vinisaveg/auth-app.git

```

Installing the server dependencies

```
    cd server
    yarn install
    
```

Go to mikro-orm.config.ts, and insert your database info

```
   dbName: "auth_app",
   type: "postgresql",
   user: "postgres",
   password: <YOUR DB PASSWORD HERE>,
    
```

Running the server

```
    yarn create:migration
    
    yarn watch
    
    yarn dev
    
```

Installing the app dependencies

```
    cd app
    yarn install
    
```

Running the app

```
    yarn dev
    
```

Happy Coding! :wink:
