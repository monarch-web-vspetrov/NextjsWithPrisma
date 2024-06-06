import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-4">Links:</h1>
      <ul>
        <li className="text-gray-500">
          <Link href="/posts">Posts</Link>
        </li>
      </ul>
    </main>
  );
}
