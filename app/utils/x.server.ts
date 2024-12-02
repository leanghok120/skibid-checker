import axios from "axios";

const endpoint = "https://api.twitter.com/2";

export async function getUserData(username: string) {
  const response = await axios.get(
    `${endpoint}/users/by/username/${username}`,
    {
      params: { "user.fields": "description,profile_image_url" },
      headers: {
        Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
      },
    }
  );

  if (response.data.errors) {
    return { error: "User not found or API error" };
  }

  return response.data.data;
}
