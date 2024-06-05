'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const BlogDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data, error } = useSWR(id ? `/api/blogs/${id}` : null, fetcher);

  const deleteBlog = async () => {
    await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    });
    router.push('/');
  };

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
      <button onClick={deleteBlog}>Delete</button>
      <button onClick={() => router.push(`/blogs/edit/${id}`)}>Edit</button>
    </div>
  );
};

export default BlogDetails;
