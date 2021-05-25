import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { ReactElement, cloneElement } from "react";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  activeClassName: string;
}

export function ActiveLink({ children, activeClassName, ...rest }: ActiveLinkProps) {
  const { asPath } = useRouter()

  const className = asPath === rest.href ? activeClassName : ''

  return (
    <Link {...rest}>
      { cloneElement(children, {className}) }
    </Link>
  )
}

// cloneElement: clona um elemento e modifica qualquer propriedade.
// Optei por não utilizar este componente ActiveLink, em substituição aos <Link> 
// da página Header. Achei que seria adicionar uma complexidade desnecessária.
