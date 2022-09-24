# portfolio-api
personal portfolio mario torres lepe.
full CRUD API-REST with users, comments and roles, validate with jwt.
## Start 🚀
These instructions will allow you to get a working copy of the project on your local machine for development and testing purposes.

### Technologies 📋

_Used Technologies_

```
node
```
```
express
```
```
sequelize
```
```
postgres
```

### INstalation 🔧

_Instalation steps_

_Create .env file in main folder_

```
PORT= example_port
DB_USER=example_dbUser
DB_PASS=example_Pass
DB_NAME=example_db
DB_HOST=localhost
DB_DIALECT=postgres or mysql (view documentation sequelize db support)
SECRET_KEY=jwt_secret_key
```

_Ejecute npm install command to install packages_

```
npm install
```

_run migrations (for more commands viw package.json file)_

```
npm run db:migrate
```

## Documentation 🛠️

* [Sequelize](https://sequelize.org/docs/v6/other-topics/migrations/) - ORM
* [Bcrypt.js](https://www.npmjs.com/package/bcryptjs) - Password encript
* [express-validator](https://express-validator.github.io/docs/) - Validator request
* [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Token

## Author Mario Torres ✒️


