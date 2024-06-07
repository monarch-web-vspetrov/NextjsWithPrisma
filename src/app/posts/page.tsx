import Link from "next/link";
import prisma from "@/lib/db";

async function PostsList() {
  const posts = await prisma.post.findMany({
    // условия фильтрации по статусу
    where: {
      published: true,
    },
    // условия соритровки постов
    orderBy: {
      createdAt: "desc",
    },
    // уточняющие условия выборки получаемых данных
    select: {
      id: true,
      title: true,
      slug: true,
    },
    // ограничение выборки по количеству. Может быть полезно для разбивки на страницы
    // take: 0
    // условия пропуска получаемых данных
    skip: 0,
  });

  console.log(posts);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1>Posts List ({posts.length}):</h1>
      <ul>
        {posts.map((post) => (
          <Link href={`/posts/${post.slug}`} key={post.id}>
            <li>{post.title}</li>
          </Link>
        ))}
        <li></li>
      </ul>
    </div>
  );
}

export default PostsList;
