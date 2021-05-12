
# Robot Art

## Deployed Site

Visit the deployed site at:

https://robot-art.herokuapp.com/
  
## Run Locally

- Clone the project

```bash
  git clone https://github.com/katherinepeterson/robot-art.git
```

- Go to the project directory

```bash
  cd robot-art
```

- Install dependencies

```bash
  npm install
```

- Configure environment variables in section below. You need an Amazon S3 bucket and a PostgreSQL database

- Migrate the Database

```bash
  npx prisma migrate dev
```

- Run the client and server in watch mode

```bash
  npm run dev
```

  
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL` 

`SECRET`

`AWSAccessKeyId`

`AWSSecretKey`

`Bucket`

  
## Tech Stack

**Client:** React, React Router, Styled Components, Styled System, Axios

**Server:** Node, Express, PostgreSQL, Prisma, Amazon S3

  