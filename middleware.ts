import { NextResponse, NextRequest } from 'next/server';
import { parse } from 'cookie';  // 'cookie' is a utility to parse cookie headers

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname; // Get the pathname of the request

    // Only run middleware logic for the '/dashboard' path
    if (pathname.startsWith('/dashboard')) {
        const cookieHeader = request.headers.get('cookie');
        const cookies = parse(cookieHeader || '');  // Safely parse cookies or an empty string if undefined
        const isAuthenticated = cookies.auth === 'true';  // Check if the 'auth' cookie is set to 'true'

        if (!isAuthenticated) {
            const redirectUrl = request.nextUrl.clone();
            redirectUrl.pathname = '/404';
            // Redirect to the 404 page if not authenticated
            return NextResponse.rewrite(redirectUrl);
        }
    }
}
