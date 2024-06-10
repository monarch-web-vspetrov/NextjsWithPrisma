import Link from "next/link";
import prisma from "@/lib/db";
import { addNewPost, deletePost, editPost } from "@/actions/actions";

async function PostsList() {
  // поиск по всем постам в БД
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
    // skip: 0,
  });

  // поиск по конкретному автору в бд
  const postsWithAuthor = await prisma.post.findMany({
    where: {
      published: true,
      authorId: {
        not: null,
      },
    },
  });

  const postsCount = prisma.post.count();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1>Posts List ({postsCount}):</h1>
      <ul>
        {postsWithAuthor.map((post) => (
          <Link href={`/posts/${post.slug}`} key={post.id}>
            <li>{post.title}</li>
          </Link>
        ))}
      </ul>

      <form action={addNewPost} className="flex flex-wrap max-w-28 mt-5 gap-2 ">
        <input
          type="text"
          id="title"
          name="title"
          className="border-2 border-solid border-gray-500 rounded-md w-full p-1"
          placeholder="title"
          required
        />
        <textarea
          name="content"
          id="content"
          className="border-2 border-solid border-gray-500 rounded-md w-full p-1"
          placeholder="content"
          required
        ></textarea>
        <button
          type="submit"
          className="border-2 border-solid border-gray-500 rounded-md"
        >
          Submit
        </button>
      </form>
      <form action={editPost} className="flex flex-wrap max-w-28 mt-5 gap-2 ">
        Редактировать пост
        <input type="text" name="id" id="id" />
        <input
          type="text"
          id="title"
          name="title"
          className="border-2 border-solid border-gray-500 rounded-md w-full p-1"
          placeholder="title"
          required
        />
        <textarea
          name="content"
          id="content"
          className="border-2 border-solid border-gray-500 rounded-md w-full p-1"
          placeholder="content"
          required
        ></textarea>
        <button
          type="submit"
          className="border-2 border-solid border-gray-500 rounded-md"
        >
          Submit
        </button>
      </form>
      <form action={deletePost} className="flex flex-wrap max-w-28 mt-5 gap-2 ">
        Удалить пост
        <input type="text" name="id" id="id" />
        <button
          type="submit"
          className="border-2 border-solid border-gray-500 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default PostsList;
