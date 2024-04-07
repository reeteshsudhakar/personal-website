import { NextApiRequest, NextApiResponse } from 'next';
import { parseCookies } from 'nookies';

export default function authStatus(req: NextApiRequest, res: NextApiResponse) {
    // Parse the cookies from the request
    const cookies = parseCookies({ req });
    const isAuthenticated = cookies.auth === 'true'; // Check if the 'auth' cookie is set to 'true'

    // Send back the authentication status
    res.status(200).json({ isAuthenticated });
}
