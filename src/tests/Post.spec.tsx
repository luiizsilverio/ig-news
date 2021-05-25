import { render, screen } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import { getSession } from 'next-auth/client'

import Post, { getServerSideProps } from '../pages/posts/[slug]'
import { getPrismicClient } from '../services/prismic'

const post = { 
    slug: 'my-new-post', 
    title: 'My New Post', 
    content: '<p>Lorem ipsum</p>', 
    updatedAt: "10 de abril" 
}

jest.mock('next-auth/client')
jest.mock('../services/prismic')

describe('Post Page', () => {

    it('renderiza corretamente', () => {
        render(<Post post={post} />)

        expect(screen.getByText("My New Post")).toBeInTheDocument()
        expect(screen.getByText("Lorem ipsum")).toBeInTheDocument()
    })

    it('redireciona usuário se não estiver autenticado', async () => {
        const getSessionMocked = mocked(getSession)

        getSessionMocked.mockResolvedValueOnce(null)

        const response = await getServerSideProps({
            params: { slug: 'my-new-post' }
        } as any)

        expect(response).toEqual(
            expect.objectContaining({  
                redirect: expect.objectContaining({
                   destination: '/' 
                })
            })
        )
    })

})
