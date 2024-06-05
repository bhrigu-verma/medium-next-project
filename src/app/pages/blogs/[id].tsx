import { useRouter } from 'next/router';
import useSWR from 'swr';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BlogDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(id ? `/api/blogs/${id}` : null, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const deleteBlog = async () => {
    await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    });
    router.push('/');
  };

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
      <button onClick={deleteBlog}>Delete</button>
      <Link href={`/blogs/edit/${id}`}>
        <a>Edit</a>
      </Link>
    </div>
  );
}
