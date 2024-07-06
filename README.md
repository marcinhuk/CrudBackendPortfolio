# CRUD Backend Portfolio

## 🔨 How to execute this project:


1. Go to the folder where the project will be cloned;
2. Open o Git Bash;
3. Run git clone https://github.com/marcinhuk/PainelDeChamadas-Frontend.git;
4. Run cd ./PainelDeChamadas-Frontend;
5. Run npm install;
6. With MySql/MariaDB server already installed and running, create a database;
7. Create a user with permissions on created database;
8. Create "constants.js" file in the root of the project and include the object below with your environment settings:

```javascript

	module.exports = Object.freeze({
		APP: {
			PORT: 3099,
		},
		MYSQL: {
			DIALECT: 'mysql',
			HOST: '127.0.0.1',
			PORT: 3306,
			DATABASE: 'database',
			USER: 'user',
			PASSWORD: 'password',
			LOGGING: false,
		},
		JWT: {
			TIME: 3600, // time in seconds
			SECRET: 'mysecret'
		},
		FILES: {
			AVATAR: __dirname+"//src//files//avatar//",
		},
	})

```

9. Uncomment the lines bellow in the file "/src/app.js" so that the tables, default user "admin" and default password "admin" are created in the database:

```javascript
		await database.sync()
		const User = require('./models/users')
		await User.create({ email: "admin", full_name: "admin", password: "admin"})
```

10. Run npm start;
11. Ctrl+C to stop the server;
12. Comment the line "await database.sync()" in the file "/src/app.js";
13. Run npm start.