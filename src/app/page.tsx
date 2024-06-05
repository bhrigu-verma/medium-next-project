// 'use client';
import React from 'react';
import Link from 'next/link';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home = () => {
  const { data, error } = useSWR('/api/blogs', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const blogs = data.map((blog: { id: number; title: string }) => (
    <li key={blog.id}>
      <Link href={`/blogs/${blog.id}`}>
        <a>{blog.title}</a>
      </Link>
    </li>
  ));

  return (
    <div>
      <h1>Blogs</h1>
      <Link href="/blogs/create">
        <button>Create Blog</button>
      </Link>
      <ul>{blogs}</ul>
    </div>
  );
};

export default Home;
