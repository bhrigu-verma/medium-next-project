import useSWR from 'swr';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR('/api/blogs', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Blog List</h1>
      <Link href="/blogs/create">
        <a>Create New Blog</a>
      </Link>
      {data.map((blog: any) => (
        <div key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
          <Link href={`/blogs/${blog.id}`}>
            <a>Read more</a>
          </Link>
        </div>
      ))}
    </div>
  );
}
