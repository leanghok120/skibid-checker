import type { MetaFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Skbidi Checker" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const username = formData.get("username");

  return { username: username };
}

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-4xl font-black">Skibidi Checker</h1>
      <Form>
        <input
          type="text"
          placeholder="Enter your X username"
          name="username"
          defaultValue=""
        />
        <button>Submit</button>
      </Form>
    </div>
  );
}
