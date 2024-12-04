import type { MetaFunction } from "@remix-run/node";
import { Form, redirect } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Skbidi Checker" },
    { name: "description", content: "Check how skibidi you are!" },
  ];
};

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const username = formData.get("username") as string;

  if (!username) return { error: "Username is required" };

  return redirect(`/results/${username}`);
}

export default function Index() {
  return (
    <>
      <h1 className="text-4xl font-black mb-10">Skibidi Checker</h1>
      <Form
        method="post"
        className="border-gray-900 border-2 p-5 rounded-xl w-full max-w-96 flex flex-col items-center"
      >
        <input
          type="text"
          placeholder="Enter your X username"
          name="username"
          defaultValue=""
          className="w-full p-3 bg-gray-800 border-2 border-gray-900 rounded-2xl outline-none"
        />
        <button className="w-32 bg-blue-300 text-black py-3 rounded-3xl mt-5">
          Submit
        </button>
      </Form>
    </>
  );
}
