import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import { sign } from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = 'your_secret_key_here';
// Create a new user
// interface UserData {
//     // Define the properties of the user data
// }



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






function signToken(arg0: { id: string; }, arg1: string) {
    throw new Error('Function not implemented.');
}
// function signToken(arg0: { id: string; }, arg1: string) {
//     throw new Error('Function not implemented.');
// }
// function signToken(arg0: { id: string; }, arg1: string) {
//     throw new Error('Function not implemented.');
// }
// const createUser = async (data: UserData): Promise<UserData> => {
//     try {
//         const user = await prisma.user.create({
//             data,
//         });
//         return user;
//     } catch (error) {
//         console.error('Error creating user:', error);
//         throw error;
//     }
// };

// // Get a user by ID
// interface User {
//     id: number;
//     name: string;
//     email: string;
//     // Add more properties as needed
// }

// const getUserById = async (id: number): Promise<User | null> => {
//     try {
//         const user = await prisma.user.findUnique({
//             where: {
//                 id,
//             },
//         });
//         return user;
//     } catch (error) {
//         console.error('Error getting user by ID:', error);
//         throw error;
//     }
// };

// // Update a user by ID
// interface UpdateUserData {
//     // Define the properties of the user data that can be updated
// }

// const updateUserById = async (id: number, data: UpdateUserData): Promise<User | null> => {
//     try {
//         const user = await prisma.user.update({
//             where: {
//                 id,
//             },
//             data,
//         });
//         return user;
//     } catch (error) {
//         console.error('Error updating user by ID:', error);
//         throw error;
//     }
// };

// // Delete a user by ID
// const deleteUserById = async (id: number): Promise<User | null> => {
//     try {
//         const user = await prisma.user.delete({
//             where: {
//                 id,
//             },
//         });
//         return user;
//     } catch (error) {
//         console.error('Error deleting user by ID:', error);
//         throw error;
//     }
// };

// export { createUser, getUserById, updateUserById, deleteUserById };

