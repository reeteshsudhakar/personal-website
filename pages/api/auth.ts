import type { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from 'cookie';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const response = await fetch(process.env.AUTH_ENDPOINT + '?password=' + encodeURIComponent(req.body.password));

        if (!response.ok) {
            // Handle the case where the external API response indicates an error
            console.error('Error response from external API:', response.status);
            return res.status(500).json({ message: 'Error calling external API' });
        }

        const data = await response.json();

        if (data.message) {
            const cookie = serialize('auth', 'true', {
                path: '/',
                httpOnly: true, // Important for security: makes the cookie inaccessible to client-side JavaScript
                secure: process.env.NODE_ENV !== 'development', // On production, use 'secure' flag
                sameSite: 'strict', // Helps to mitigate CSRF attacks
                maxAge: 60 * 60, // Cookie expires in one hour
            });

            // Set the cookie in the response header
            res.setHeader('Set-Cookie', cookie);

            res.status(200).json({ authenticated: true });
        } else {
            res.status(200).json({ authenticated: false });
        }
    } catch (error) {
        console.error('Error fetching authentication information:', error)
        res.status(503).json({ message: '503 error - service is unavailable.' })
    }
}