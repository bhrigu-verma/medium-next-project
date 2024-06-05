import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
 // Import the PrismaClient
 // Import the prisma object

 export async function GET(req: NextRequest) {
  const prisma = new PrismaClient();
  
  try {
    const body = await req.json();
    const { id } = body as { id: string };

    // Validate the ID
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    // Fetch the blog post
    const blog = await prisma.post.findUnique({ where: { id: String(id) } });

    // Check if the blog post exists
    if (!blog) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
export async function PUT(req: NextRequest) {
  const prisma = new PrismaClient();
  
  try {
    const body = await req.json();
    const { id, title, content } = body as { id: string; title: string; content: string };

    // Validate the request body
    if (!id || !title || !content) {
      return NextResponse.json({ error: 'ID, title, and content are required' }, { status: 400 });
    }

    // Update the blog post
    const updatedBlog = await prisma.post.update({
      where: { id: String(id) },
      data: { title, content },
    });

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error('Error updating post:', error);

    // Check if the error is due to the post not being found
    if ((error as any).code === 'P2025') {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
export async function DELETE(req: NextRequest) {
  const prisma = new PrismaClient();
  
  try {
    // Parse the request body
    const body = await req.json();
    const { id } = body as { id: string };

    // Validate the ID
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    // Delete the post
    await prisma.post.delete({ where: { id: String(id) } });

    // Return a success response
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    // Ensure Prisma Client is disconnected
    await prisma.$disconnect();
  }
}
