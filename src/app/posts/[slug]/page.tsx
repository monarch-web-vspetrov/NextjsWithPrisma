import { typePost } from "@/app/types";
import prisma from "@/lib/db";

async function Post({ params }: { params: typePost }) {
  const postData = await prisma.post.findUnique({
    where: { slug: params.slug },
  });
  console.log(postData);
  if (postData) {
    return (
      <div>
        <h1>{postData.title}</h1>
        <p>{postData.likes}</p>
      </div>
    );
  }
}

export default Post;
