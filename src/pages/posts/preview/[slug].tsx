import React, { useEffect } from 'react'
import { GetStaticProps } from 'next'
import { getSession, useSession } from 'next-auth/client'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { RichText } from 'prismic-dom'

import { getPrismicClient } from '../../../services/prismic'
import styles from '../post.module.scss'

type PostProps = {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  }
}

export default function PostPreview({ post }: PostProps) {
  const [session] = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session?.activeSubscription) {
      router.push(`/posts/${post.slug}`)
    }
  }, [session])

  return (
    <>
      <Head>
        <title>{ post.title } | Ignews</title>        
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{ post.title }</h1>
          <time>{ post.updatedAt }</time>

          <div 
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />

          <div className={styles.continueReading}>
            Deseja continuar lendo?
            <Link href="/">
              <a key={ post.slug }>Assine já 🤓</a>              
            </Link>
          </div>
        </article>
      </main>
    </>
  )
}

// getStaticPaths define quais rotas (paths) o Next vai 
// renderizar durante a building. O Next vai gerar de forma
// estática as páginas que forem passadas para paths.
// Ex: paths: [ { params: { slug: 'transicao-planetaria' }}]
// Se não especificar, o Next gera de forma estática conforme
// o usuário acessa a página.
// fallback: true, false ou 'blocking'.
// blocking: só exibe a página após carregar

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params
  
  const prismic = getPrismicClient()

  const response = await prismic.getByUID('post', String(slug), {})

  const vdata = new Date(response.last_publication_date)
    .toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })  
  
  const container = response.data.container

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: container ? RichText.asHtml(container.splice(0, 3)) : '',
    //content: RichText.asHtml(response.data.container.splice(0, 3)),
    updatedAt: vdata
  }

  return {
    props: { post },  
    revalidate: 60 * 30 // recarrega a cada 30 minutos
  }
}
