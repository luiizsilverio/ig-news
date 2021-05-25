import Link from 'next/Link'
import { useRouter } from 'next/router'

import styles from './styles.module.scss'
import { SignInButton } from '../SignInButton'

export function Header() {
  const { asPath } = useRouter()  //vai retornar "/"" ou "/posts"

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ig.news" />
        <nav>
          <Link href="/">
            <a className={ asPath === "/" ? styles.active : ""}>Home</a>
          </Link>
          <Link href="/posts">
          <a className={ asPath === "/posts" ? styles.active : ""}>Posts</a>
          </Link>
        </nav>
        
        <SignInButton />
      </div>
    </header>
  )
}

// o Link do Next é similar ao <a>, porém com a vantagem de não precisar recarregar
// as páginas que já foram carregadas.
// o atributo prefetch pré-carrega a página, deixando mais rápido,
// não é mais utilizado, pois o Next já pré-carrega por padrão.

