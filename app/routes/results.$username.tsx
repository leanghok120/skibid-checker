import { getUserData } from "~/utils/x.server";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader({ params }) {
  const userData = await getUserData(params.username);
  return json({ userData });
}

export default function Results() {
  const { userData } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <div className="border-gray-900 border-2 p-5 rounded-xl w-full max-w-96">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={userData.profile_image_url}
            alt={`${userData.username}'s profile`}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="font-bold text-xl">{userData.name}</h2>
            <p className="text-gray-500">@{userData.username}</p>
          </div>
        </div>
        <p className="text-gray-300">{userData.description}</p>
      </div>
    </div>
  );
}