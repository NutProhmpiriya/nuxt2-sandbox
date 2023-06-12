import { Middleware } from '@nuxt/types'

const authMiddleware: Middleware = (context) => {
    console.log('authMiddleware', JSON.stringify(context))
}

export default authMiddleware
