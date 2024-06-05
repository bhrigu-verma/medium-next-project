import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from '../../lib/middleware/auth';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  // Apply the middleware
  const authResult = await authMiddleware(req);
  if (authResult && authResult.status === 401) {
    return authResult; // Return if unauthorized
  }

  const blogs = await prisma.post.findMany();
  return NextResponse.json(blogs);
}

export async function POST(req: NextRequest) {
  // Apply the middleware
  const authResult = await authMiddleware(req);
  if (authResult && authResult.status === 401) {
    return authResult; // Return if unauthorized
  }

  try {
    const body = await req.json();
    const userId = (req as any).userId; // Get the user ID from the request

    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        author: { connect: { id: userId } },
      },
    });

    return NextResponse.json({ status: 200, post });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
