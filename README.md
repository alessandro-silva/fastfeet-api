<h1 align="center">
  <img alt="FastFeet" title="FastFeet" src=".github/logo.png" width="300px" />
</h1>

<h3 align="center">
  Fast Feet API
</h3>

> Uma API que ajuda você a gerenciar suas encomendas, entregas e entregadores de sua transportadora :rocket:

<p align="center">
  <img align="center" src="https://i.ibb.co/jwyt10w/fastfeetlogin.png" alt="Web-Signin" border="0">
</p>
<br>
<p align="center">
  <img align="center" src="https://i.ibb.co/FB4rJQ5/pagefast.png" alt="Web-Recipients" border="0">
</p>
<br>

# :scroll: Sumário

* [Recursos](#dart-recursos)
* [Instalação](#wrench-instalação)
* [Introdução](#surfer-introdução)
* [perguntas frequentes](#interrobang-perguntas-frequentes)

# :dart: Recursos

* Encomendas CRUD
* Entregadores CRUD
* Destinatários CRUD
* Problemas os entregadores podem adicionar problemas nas encomandas.

É importante mencionar que esta é uma das aplicações do **FastFeet System**

Para explorar os outros, clique nos links acima:
- [FastFeet Mobile](https://github.com/alessandro-silva/fastfeet-mobile)
- [FastFeet Web](https://github.com/alessandro-silva/fastfeet-web)

# :wrench: Instalação

**Você precisa instalar o [Node.js](https://nodejs.org/en/download/) e o [Yarn](https://yarnpkg.com/) primeiro e, em seguida, para clonar o projeto via HTTPS , execute este comando:**

```git clone https://github.com/alessandro-silva/fastfeet-api.git```

URLs SSH fornecem acesso a um repositório Git via SSH, um protocolo seguro. Se você possui uma chave SSH registrada na sua conta do Github, clone o projeto usando este comando:

```git clone git@github.com:alessandro-silva/fastfeet-api.git```


# :surfer: Introdução

Execute as transações para configurar o esquema do banco de dados

```npx sequelize-cli db:migrate```

Execute o seguinte comando para iniciar o aplicativo em um ambiente de desenvolvimento:

```
 // Inícia o servidor
  yarn dev

// Execute a fila responsável pelo trabalho de email
  yarn queue-dev
```

## :arrows_clockwise: Códigos de status

FastFeet retorna os seguintes códigos de status em sua API:

| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 422 | `UNPROCESSABLE ENTITY` |
| 400 | `BAD REQUEST` |
| 404 | `NOT FOUND` |
| 500 | `INTERNAL SERVER ERROR` |

# :interrobang: perguntas frequentes

**Pergunta:** Quais são as tecnologias utilizadas neste projeto?

**Resposta:** As tecnologias usadas neste projeto são [NodeJS](https://nodejs.org/en/) + [Express Framework](http://expressjs.com/en/) para lidar com o servidor e [Sequelize](https://sequelize.org/)

#:

Feito por [Alessandro Silva] (https://github.com/alessandro-silva) :book::earth_americas:
