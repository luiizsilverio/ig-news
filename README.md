# ig.News 📰🤓

## Conteúdo
* [Sobre o Projeto](#sobre-o-projeto)
* [Tecnologias](#hammer_and_wrench-tecnologias)
* [Screenshots](#camera_flash-screenshots)
* [Iniciando o Projeto](#car-Iniciando-o-projeto)
* [Licença](#balance_scale-licença)
* [Contato](#email-contato)

## Sobre o projeto
Ig.News é uma aplicação que disponibiliza Artigos (posts) sobre variados assuntos.
Desenvolvida em React / Next, o login da aplicação é feito pela rede social Github.<br />
Os artigos são armazenados no CMS Prismic e só podem ser acessados mediante assinatura mensal.<br />
A assinatura mensal é feita por meio da API de pagamentos Stripe.<br />
Sem a assinatura, só é possível visualizar uma prévia dos artigos.<br />
A aplicação possui 2 páginas: Home e Posts.<br />
Em Home, podemos assinar a assinatura mensal na API do Stripe.<br />
Em Posts, acessamos os artigos.<br /><br />
A aplicação está disponível [aqui](https://ig-news-theta.vercel.app).

## :hammer_and_wrench: Tecnologias
* <ins>React / Next</ins>
* <ins>Typescript</ins>
* Login social com <ins>NextAuth</ins>
* Acesso à API de pagamentos do <ins>Stripe</ins>
* Acesso à API do <ins>Prismic</ins>
* Estilização com <ins>SASS</ins>

## :camera_flash: Screenshots
![](https://github.com/luiizsilverio/ig-news/blob/main/public/images/ignews.gif)

## :car: Iniciando o projeto
* Baixe o repositório com ```git clone```
* Digite ```yarn``` para inicializar o projeto.
* Crie uma cópia do arquivo ```.env.local.example``` e renomeie para ```.env.local```.
* Para funcionar, precisa criar uma conta no Stripe, Github, Prismic e FaunaDB e informar as respectivas chaves no arquivo ```.env.local```.
* digite ```yarn dev``` no terminal e acesse a aplicação em http://localhost:3000

## :balance_scale: Licença
Este projeto está licenciado sob a [licença MIT](LICENSE).

## :email: Contato

E-mail: [**luiiz.silverio@gmail.com**](mailto:luiiz.silverio@gmail.com)
