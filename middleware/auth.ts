import { NextRequest, NextResponse } from 'next/server'
import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge'

export default withMiddlewareAuthRequired(function middleware(
    request: NextRequest
) {
    if (request.nextUrl.pathname === '/api/users') {
        return NextResponse.redirect(request.url)
    }
    return NextResponse.next()
})

export const config = {
    matcher: '/api/users',
}
