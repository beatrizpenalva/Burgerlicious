<h1 align="center" id="top"> 🍔🍟 Burgerlicious </h1>

<p align="center">
    A web app to manage orders in a restaurant
    ⚡ To access click <a href="https://burgerlicious-git-main-cbalieiro.vercel.app/">here</a>! ⚡
</p>

<p align="center">
 <a href="#-challenge">Challenge</a> •
 <a href="#-about">About</a> •
 <a href="#-development">Development</a> • 
 <a href="#-getting-started">Getting Started</a> • 
 <a href="#-build-with">Build With</a> • 
 <a href="#-acknowledgments-and-credits">Acknowledgments and credits</a> • 
 <a href="#-authors">Authors</a>
</p>

---

##

Login for testing:

> 💁 **Hall** 
>
> Login - camilaoliveira@burgerlicious.com
> 
> Password - burguinho

> 👨‍🍳 **Kitchen**  
> 
> Login - biapenalva@burgerlicious.com
> 
> Password - burguinho

---

## 🎯 Challenge

Esse projeto foi desenvolvido em dupla durante o bootcamp da Laboratoria. A [proposta]((https://github.com/Laboratoria/SAP005-burger-queen)) foi desenvolver uma aplicação  gerenciamento de pedidos em uma hamburgueria, priorizando uma interface para tablets, utilizando o React.JS e consumindo uma [API](https://lab-api-bq.herokuapp.com/api-docs/).

<p align="center">
    <img src="https://media4.giphy.com/media/xT3i1ibda1zFQF1wbe/giphy.gif?cid=ecf05e47xiar1m6clhf9t7ov2088ehrs2bh1hhtwq4nstfaq&rid=giphy.gif"></img>
</p>

<p align="right">
  <a href="#top"> Back to the top. </a>
</p>

---

## 💡 About
A Burgerlicious é uma rede de fast food 24 horas. Devido ao seu sucesso e expansão, a rede precisa de um sistema para ajudar a gerenciar os pedidos dos clientes, facilitando o trabalho e comunicação entre o atendimento no salão e a cozinha.  

A interface deve mostrar os dois menus servidos no restaurante, café da manhã e resto do dia, detalhando todos os produtos. O atendimento deve anotar o pedido dos clientes, visualizar em tempo real o resumo do pedido com o custo total e enviar para a cozinha. Essa por sua vez pode avisar ao salão os pedidos que estão prontos para serem servidos.

<p align="right">
  <a href="#top"> Back to the top. </a>
</p>

---

## 💻 Development

### 📋 Planning

Esse trabalho foi desenvolvido sob demanda e já recebemos as definições de histórias de usuário do Product Owner, a partir disso o [planejamento](https://trello.com/b/iATzyG7R/burgerlicious-%F0%9F%8D%94) foi organizado seguindo o modelo de Kanban e dividindo uma história de usuário por sprint. No total foram implementadas quatro histórias em quatro sprints de uma semanda cada. A estratégia adotada para escrever o código foi o code review, sendo um dos itens da definição de pronto de cada história. 📋

### ⚙️ Features

##### 👨‍🍳 Cadastro e login
- [x] Funcionários do salão e da cozinha podem se cadastrar na plataforma web fornecendo:
  - [x] nome e sobrenome
  - [x] e-mail
  - [x] senha
  - [x] função
    - salão
    - cozinha  
- [x] Ao concluir o registro com êxito o usuário é redirecionado à página de login
- [x] O login é realizado com e-mail e senha e o funcionário é redirecionado para a página referente à sua função.

##

##### 🍟 Criar novos pedidos
- [x] O atendente pode criar novas comandas informando:
  - [x] produtos e quantidade
  - [x] nome do cliente
  - [x] número da mesa
- [x] O usuário pode filtrar o menu por café da manhã e cardápio de hambúrguer
- [x] No resumo do pedido o usuário ainda pode:
    - [x] Aumentar ou diminuir a quantidade de um produto
    - [x] Deletar um produto
    - [x] Visualizar o valor total do pedido à medida que os produtos são selecionados ou deletados
- [x] O usuário só consegue enviar a comanda para a cozinha com todos os campos obrigatórios preenchidos

##

##### 📋 Gerenciar pedidos
- [x] Os funcionários da cozinha conseguem:
  - [x] receber as comandas do salão
  - [x] informar quando os pedidos começarem a ser preparados
  - [x] enviar os pedidos finalizados para o salão 
  - [x] visualizar o histórico de pedidos

##

### 🎨 User Interface

A paleta de cores foi desenvolvida em tons pastéis com base nas cores dos ingredientes clássicos de um hambúrguer:

<p align="center">
    🍞 Bread 🥩 Meat 🥬 Lettuce 🍅 Tomato 🧀 Cheese
</p>

#### Color palette

<p align="center">
  <img alt="color-palette" title="#color-palette" src="./src/img/color-palette.svg" />
</p>

#### Logo

A logo escolhida compõe com a estética divertida que os tons pastéis trazem para a marca e foi desenvolvida por [Icons8](https://icons8.com/vector-creator/), feito apenas algumas alterações pelas autoras. 

<p align="center">
    <img width="350" src="./src/img/logo.png"></img>
</p>

#### Typography

Icons: [Material Design](https://material.io/) | Typography: [Poppins](https://fonts.google.com/specimen/Poppins?)

#### Prototype

Os protótipos foram desenvolvidos priorizando o formato de tablet, conforme requerido no desafio. Além do desenvolvimento de wireframes, desenvolvemos um protótipo [interativo](https://www.figma.com/proto/VE1qAvPVorjSDtMrSbGmBr/BurguerIicious?node-id=27%3A3175&scaling=scale-down) da história 2, simulando a jornada dos funcionários do salão ao interagir com o app. Para ver os protótipos de baixa fidelidade e de alta fidelidade é só clicar [aqui](https://www.figma.com/file/VE1qAvPVorjSDtMrSbGmBr/BurguerIicious?node-id=28%3A1381).

##### Low fidelity tablet prototype

<p align="center">
    <img align="center" src="./src/img/prototype-low-fidelity.svg"></img>
    <br>
    🔎 Click on the image to enlarge 
</p>

##### High fidelity tablet prototype

<p align="center">
    <img align="center" src="./src/img/prototype-high-fidelity.svg"></img>
    <br>
    🔎 Click on the image to enlarge 
</p>

##

### 🕵️‍♀️ Usability test

Realizamos teste de usabilidade com o protótipo de baixa fidelidade e com a aplicação à medida que cada história de usuário era concluída. Os pontos levantados foram:

&nbsp;
⚠️ O usário sentiu falta de uma declaração de campo obrigatório no preenchimento de formulário.

&nbsp;
✔️ Inserimos mensagens em todos os campos obrigatórios e informamos o formato da informação requerida.

&nbsp;
⚠️ O usário não entendeu o que o ícone de logout simbolizava.

&nbsp;
✔️ Trocamos o ícone e inserimos uma informação em texto.

&nbsp;
⚠️ O usuário gostaria de alterar a quantidade de produtos no resumo do pedido para evitar ter que voltar na seção do menu onde o item está listado. 

&nbsp;
✔️ Incorporamos o botão de quantidade para cada produto no resumo do pedido. 

&nbsp;
⚠️ O usuário gostaria de saber visualmente quais opções de hambúrguer foram selecionadas antes de adicionar ao pedido.

&nbsp;
✔️ Trocamos a cor dos itens ao serem selecionados. 

&nbsp;
⚠️ O usuário sentiu falta de uma mensagem confirmando que o pedido foi enviado com sucesso para a cozinha. 

&nbsp;
✔️ Inserimos micro-interações que avisam ao usuário quando uma ação é cancelada, concluída com sucesso ou mal sucedida.

##

### 🚧 Future implementations

&nbsp;
📌 Implementar comunicação em tempo real entre as aplicações, front e back-end, para notificar a cozinha de novas comandas e o salão de pedidos prontos para entrega. 

&nbsp;
📌 Validação do e-mail dos usuários.

&nbsp;
📌 Implementar uma interface de autoatendimento. 

&nbsp;
📌 Criar uma seção de comentários nas comandas.

&nbsp;
📌 Bloquear o acesso ao menu que não estivesse disponível no turno, evitando transtornos.

<p align="right">
  <a href="#top"> Back to the top. </a>
</p>

---

## 🚀 Getting Started

🔰 Before running the app, you need to have installed these tools on your computer: Git and Node.js.
```bash

# Fork the repository

# To clone this repository on your computer run:
$ git clone https://github.com/beatrizpenalva/burgerlicious.git

# To install the dependencies in your project's directory run:
$ npm install

# To execute the app on development  mode run:
$ npm run start

# The app will be open on port:3000 - access http://localhost:3000

```
##

👊 To contribute to this project:

```bash

# After installing the repository on your computer, create a new branch with your updates:
$ git checkout -b my-feature

# Save your changes
$ git add .

# Create a commit message telling what you did: 
$ git commit -m "feature: My new feature"

# Send your contribution to this repository
$ git push origin my-feature

```

<p align="right">
  <a href="#top"> Back to the top. </a>
</p>

---

## 👩‍💻 Build With

&nbsp;
🛠 JavaScript (ES6)

&nbsp;
🛠 HTML5

&nbsp;
🛠 [React.JS](https://reactjs.org/)

&nbsp;
🛠 CSS3

&nbsp;
🛠 [React-Bootstrap](https://react-bootstrap.github.io/)

<p align="right">
  <a href="#top"> Back to the top. </a>
</p>

---

## 🦸 Authors

<table align="center">
  <tr>
    <td align="center">
        <a href="https://www.linkedin.com/in/beatrizpenalva/">
            <img 
                 style="border-radius: 50%" 
                 src="https://avatars.githubusercontent.com/u/71418199?v=4" 
                 width="100px"
            />
            <br/>
            <sub> <b> Beatriz Penalva </b> </sub>
        </a>
        <br/>
        <a href="https://github.com/beatrizpenalva/" title="GitHub"> 👩‍💻 </a>
    </td>
    <td align="center">
        <a href="https://www.linkedin.com/in/camilabalieiro/">
            <img 
                 style="border-radius: 50%" 
                 src="https://avatars.githubusercontent.com/u/71615963?v=4" 
                 width="100px" 
             />
             <br/>
             <sub> <b> Camila Oliveira </b> </sub>
        </a>
        <br/>
        <a href="https://github.com/cbalieiro" title="GitHub"> 👩‍💻 </a>
    </td>
  </tr>
</table>

<p align="center">
    Project developed in <a href="https://www.laboratoria.la/">Laboratoria</a> Bootcamp 💛
</p>

<p align="center">
  <img src="https://i.giphy.com/media/23is0rmCx5UlBoNxsZ/giphy.webp" alt="Woman saying: two words, girl code"></img>
</p>

<p align="right">
  <a href="#top"> Back to the top. </a>
</p>
    
