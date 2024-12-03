import axios from "axios";

const endpoint = "https://api.twitter.com/2";

export async function getUserData(username: string) {
  const response = await axios.get(
    `${endpoint}/users/by/username/${username}`,
    {
      params: { "user.fields": "description,profile_image_url,public_metrics" },
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      },
    }
  );

  if (response.data.errors) {
    throw new Error("User not found or API error");
  }

  return response.data.data;
}
