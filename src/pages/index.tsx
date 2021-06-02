import { GetServerSideProps, GetStaticProps } from 'next'
import Head from 'next/head'

import styles from './home.module.scss'
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'

// Client-side
// Server-side Rendering (ex: comentários do post)
// Static Side Generation (ex: post do blog)

type HomeProps = {
  product: {
    priceId: string;
    amount: string;
  }
}

export default function Home(props: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Olá, bem-vindo</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Tenha acesso a todas as publicações <br />
            <span>por {props.product.amount} mensal</span>
          </p>
          <SubscribeButton />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

// GetServerSideProps: faz a chamada à API via SSR, para que seja visível aos
// motores de busca. Essa função é executada na camada do Next, e não no browser.
// export const getServerSideProps: GetServerSideProps = async() => {

// GetStaticProps: faz chamada à API via SSG (Static Side Generation), ou seja,
// o Next renderiza uma única vez a página e armazena o HTML estático.
// Da próxima vez que o cliente acessar a página, o Next busca o html armazenado.
// O único diferencial é a propriedade revalidate: quanto tempo em segundos
// esta página voltará a ser reconstruída.
// Só use quando o conteúdo for o mesmo para todos os clientes e não mudar 
// com frequência.

export const getStaticProps: GetStaticProps = async() => {
  // passar o API ID do preço do produto (ver no site stripe.com)
  const price = await stripe.prices
    .retrieve('price_1IZPgjD6KV1QJJSUe15pPirL'
      //, {expand: ['product']}   //caso precise obter outros dados do produto
    )

  const product = { 
    priceId: price.id, 
    amount: new Intl.NumberFormat('en-US', { //'pt-BR', {
      style: 'currency',
      currency: 'USD', //'BRL',
    }).format(price.unit_amount / 100),
  }

  return  {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,   //24 horas
  }
}
