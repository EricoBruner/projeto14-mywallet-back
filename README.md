# Overview

This project is a backend application of an activity proposed by [@Driven](https://www.driven.com.br/). In this application it is possible to manage the back-end of an expense and income system through HTTP(s) requests following the REST convention.

# Demo

https://mywallet-api-rgbt.onrender.com

# How it works?

This project is a REST API to serve the application of a financial control website. It has two entities: `users` and `transactions`. `users` represent the user who will register to use the application. `Transactions` represent finances, which can be the inflow or outflow of money.

### users

Represents a user.

<details>
  <summary><code>POST /</code></summary>
  <br/>
  <li>Log in</li>
  <br/>
  Body of request:
  
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
</details>

<details>
  <summary><code>POST /signup</code></summary>
  <br/>
  <li>Create a new user.</li>
  <br/>
  Body of request:
  
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
</details>

### transactions

<details>
  <summary><code>POST /transaction/:type</code></summary>
  <br/>
  <li>Create a new user.</li>
  <br/>
  Parameters:
  <li>type (string): transaction type (can be just exit or entrance).</li>
  <br/>

Body of request:

```json
{
  "amount": "float",
  "description": "string"
}
```

</details>

<details>
  <summary><code>GET /transaction</code></summary>
  <br/>
  <li>Searches all transactions</li>
</details>

<details>
  <summary><code>GET /transaction/:id</code></summary>
  <br/>
  <li>Search for a transaction by id.</li>
  <br/>
  Parameters:
  <li>id (string): transaction id.</li>
</details>

<details>
  <summary><code>DELETE /transaction/:id</code></summary>
  <br/>
  <li>Delete a transaction by id.</li>
  <br/>
  Parameters:
  <li>id (string): transaction id.</li>
</details>

# Technologies

For this project, the following were used:

- Node (v 20.9.0);
- Express;
- Dayjs;
- Mongodb;
- Uuid;

# How to run in development

- Clone this repository
- Install all dependencies

  ```bash
  npm i
  ```

- Create a Mongodb database with any name you want
- Configure the `.env.development` file using the `.env.example` file (see "Running application locally or inside docker section" for details)

- Run the back-end in a development environment:

  ```bash
  npm run dev
  ```
