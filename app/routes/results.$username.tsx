import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { analyzeUser } from "~/utils/analyzeUser";
import { getUserData } from "~/utils/getUserData";

export async function loader({ params }) {
  const userData = await getUserData(params.username);
  const analysis = await analyzeUser(userData);

  return json({ userData, analysis });
}

export default function Results() {
  const { userData, analysis } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <div className="border-gray-900 border-2 p-5 rounded-xl w-full max-w-96">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={userData.avatar}
            alt={`${userData.username}'s profile`}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="font-bold text-xl">{userData.name}</h2>
            <p className="text-gray-500">@{userData.username}</p>
          </div>
        </div>
        <p className="text-gray-500 mb-5">{userData.biography}</p>
        <p>{analysis?.analysis}</p>
      </div>
    </div>
  );
}
