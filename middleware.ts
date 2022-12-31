import { NextRequest, NextResponse } from 'next/server'
import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge'

export default withMiddlewareAuthRequired(function middleware(
    request: NextRequest
) {
    console.log(request.nextUrl.pathname)
    if (request.nextUrl.pathname == '/api/users') {
        return NextResponse.redirect('/api/users')
    }
    return NextResponse.next()
})

export const config = {
    matcher: '/api/users',
}
