import type { MetaFunction } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { getUserData } from "~/utils/x.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Skbidi Checker" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const username = formData.get("username") as string;

  if (!username) return { error: "Username is required" };

  try {
    const userData = await getUserData(username);
    return userData;
  } catch (error: any) {
    return { error: error.message };
  }
}

export default function Index() {
  const actionData = useActionData<typeof action>();
  const showResults = actionData && !actionData.error;

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className="text-4xl font-black mb-10">Skibidi Checker</h1>

      {showResults ? (
        <div className="border-gray-900 border-2 p-5 rounded-xl w-full max-w-96">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={actionData.profile_image_url}
              alt={`${actionData.username}'s profile`}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h2 className="font-bold text-xl">{actionData.name}</h2>
              <p className="text-gray-500">@{actionData.username}</p>
            </div>
          </div>
          <p className="text-gray-300">{actionData.description}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-32 bg-blue-300 text-black py-3 rounded-3xl mt-5"
          >
            Check Another
          </button>
        </div>
      ) : (
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
          {actionData?.error && (
            <p className="text-red-500 mt-2">{actionData.error}</p>
          )}
          <button className="w-32 bg-blue-300 text-black py-3 rounded-3xl mt-5">
            Submit
          </button>
        </Form>
      )}
    </div>
  );
}
