import { render, screen } from '@testing-library/react'
import { ActiveLink } from '.'

// mock é imitação. No caso, está forçando a rota "/"
jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                asPath: '/'
            }
        }
    }
})

// describe define uma categoria de testes
// cada teste dentro dessa categoria começa com test ou it

describe('ActiveLink Component', () => {

    test('está renderizando corretamente', () => {
        render(
            <ActiveLink href="/" activeClassName="active">
                <a>Home</a>
            </ActiveLink>
        )
        
        //mostra o código html do ActiveLink no terminal
        screen.debug() 
        
        // getByText passa o texto que eu espero encontrar
        expect(screen.getByText('Home')).toBeInTheDocument()
    })

    test('link ativo está recebendo a classe active', () => {
        render(
            <ActiveLink href="/" activeClassName="active">
                <a>Home</a>
            </ActiveLink>
        )
        
        expect(screen.getByText('Home')).toHaveClass('active')
    })
})