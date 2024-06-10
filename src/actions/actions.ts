"use server";
import { newPostData } from "@/app/types";
import prisma from "@/lib/db";
import { connect } from "http2";
import { revalidatePath } from "next/cache";
import "server-only";

export async function addNewPost(data: FormData) {
  await prisma.post.create({
    data: {
      title: data.get("title") as string,
      slug: (data.get("title") as string).replace(/\s+/g, "-").toLowerCase(),
      content: data.get("content") as string,
      published: true,
      User: {
        //  таким образом мы связываем созданный пост с конкретным пользователем по какому-либо значению. В данном случае по email
        connect: {
          email: "testr@mail.ru",
        },
      },
    },
  });
  revalidatePath("/posts");
}

export async function editPost(FormData: FormData) {
  await prisma.post.update({
    // встроенный метод призмы для обновлении данных
    where: {
      // пишу условие для поиска
      id: FormData.get("id") as string,
    },
    data: {
      // в найденных данных меняю значения
      title: FormData.get("title") as string,
      slug: (FormData.get("title") as string)
        .replace(/\s+/g, "-")
        .toLowerCase(),
      content: FormData.get("content") as string,
    },
  });
  // TODO Как сделать очистку формы после отправки?
  revalidatePath("/posts"); // произвожу ревалидацию на странице
}

export async function deletePost(FormData: FormData) {
  await prisma.post.delete({
    where: {
      id: FormData.get("id") as string,
    },
  });
  revalidatePath("/posts");
}
