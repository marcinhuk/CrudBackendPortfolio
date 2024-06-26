# CRUD Backend Portfólio

## 🔨 Detalhes para execução do projeto:

1. Entrar no diretório onde o projeto será clonado;
2. Abrir o Git Bash;
3. Executar git clone https://github.com/marcinhuk/PainelDeChamadas-Frontend.git;
4. Executar cd ./PainelDeChamadas-Frontend;
5. Executar npm install;
6. Com o servidor do MySql/MariaDB já instalado no computador, criar um banco de dados;
7. Criar um usuário com permissão no banco criado;
8. Criar um arquivo chamado "constants.js" na raiz do projeto e incluir o objeto abaixo com as configurações do seu ambiente:

<pre><code>
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
			TIME: 3600, // tempo em segundos
			SECRET: 'mysecret'
		}
	})
</code></pre>

9. Descomentar a linha "await database.sync()" no arquivo "/src/app.js" para que as tabelas sejam criadas no banco de dados;
10. Executar npm start;
11. Ctrl+C para parar o servidor;
12. Comentar a linha "await database.sync()" no arquivo "/src/app.js";
13. Executar npm start.