import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function analyzeUser(userData: any) {
  try {
    const prompt = `take a look at this twittter profile:
- username: ${userData.username}
- description: ${userData.description || "no description"}
- followers: ${userData.public_metrics.followers_count}
- following: ${userData.public_metrics.following_count}
- tweet count: ${userData.public_metrics.tweet_count}

Now, talk about how "skibidi" the user is (whatever that means). Keep is casual, friendly, funny, short, relatable and no need to think too much about the stats, just make sure it's fun! do NOT assume anything about the user, make sure it's related to their activites and maybe roast them a bit, keep it short!
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    console.log(text);
    return new Response({ analysis: text });
  } catch (error) {
    console.log(error);
  }
}
