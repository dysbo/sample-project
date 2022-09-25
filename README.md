# Sample Project

This project has a basic CRUD structure and sqlite database strategy to demonstrate adding and enhancing API
functionality.

## Running Locally

This project uses Typescript, Sequelize, and Express to run a small database and Node server for basic CRUD operations.

1. Install dependencies:
   ```shell
   npm install
   ```
2. Run application:
   ```shell
   npm run dev
   ```
3. `db.sqlite` file will be created at root, which houses the database.  This file may be deleted at any time, it will
   be re-created and migrations will be run on it if it does not exist when running the dev server locally.

## Running in Production

This project is not meant to be run in production, don't do it. :)

## Summary of Current Functionality

Currently, the endpoints on the `/teacher` routes are partially implemented:

| method + route               | description                              | body                                                                           |
|------------------------------|------------------------------------------|--------------------------------------------------------------------------------|
| `GET /teacher`               | retrieves all teachers                   | none                                                                           |
| `GET /teacher/:teacherId`    | retrieves teacher by its assigned ID     | none                                                                           |
| `PUT /teacher`               | creates a teacher with the provided data | `{`<br />`firstName: 'Mary',`<br />`lastName: 'Sue'`<br />`}`                  |
| `PUT /teacher/:teacherId`    | not yet implemented                      | `{`<br />`id: 1234`<br />`firstName: 'Larry',`<br />`lastName: 'Lou'`<br />`}` |
| `DELETE /teacher/:teacherId` | not yet implemented                      | none                                                                           |


