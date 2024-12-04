import { Scraper } from "@the-convocation/twitter-scraper";

export async function getUserData(username: string) {
  const scraper = new Scraper();
  const userData = await scraper.getProfile(username);

  return userData;
}
