import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { sign } from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = 'your_secret_key_here';

export default async function signinHandler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findFirst({
            where: {
                email: email,
                password: password
            }
        });
        if (user) {
            // Generate JWT token
            const token = sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
            // Return the token in the response
            return res.status(200).json({ token: token });
        } else {
            // Respond with error for invalid credentials
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error signing in:', error);
        // Respond with internal server error
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
