import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function analyzeUser(userData: any) {
  try {
    const prompt = `take a look at this twittter profile:
- username: ${userData.username}
- description: ${userData.description || "no description"}
- followers: ${userData.followersCount}
- following: ${userData.followingCount}
- tweet count: ${userData.tweetsCount}

Now, talk about how "skibidi" the user is (slang term usually meaning "bad" or "cool", frequently used by gen-z). Keep it casual, friendly, funny, short, relatable and no need to think too much about the stats, or numbers. just make sure it fun! do NOT assume anything about the user, make sure it's related to their activites and maybe roast them a bit, keep it short! respond in lower case. Also no need to mention the account stats! Make sure it's clear how SKIBIDI they are... if they're not then say  they're not! Keep it short but not too short. Instead of "they" respond with "you"
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return { analysis: text };
  } catch (error) {
    console.log(error);
  }
}
