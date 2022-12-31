import { NextRequest, NextResponse } from 'next/server'
import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge'

export default withMiddlewareAuthRequired(function middleware(
    request: NextRequest
) {
    return NextResponse.next()
})

export const config = {
    matcher: [
        '/api/users',
        '/api/users/documents/delete',
        '/api/users/documents/new',
        '/api/users/documents/save',
    ],
}
