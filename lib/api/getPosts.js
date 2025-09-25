import { logger } from "@/utils/devLogger";

export async function getPosts() {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/wp-json/wp/v2/posts?_embed`,
      {
        headers: {
          Authorization: process.env.ADMIN_TOKEN,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new Error(
          "Authentication error: Please check your API credentials"
        );
      } else if (response.status === 404) {
        throw new Error("API endpoint not found: Please check your BASE_URL");
      } else if (response.status >= 500) {
        throw new Error(
          "Server error: The WordPress server is experiencing issues"
        );
      } else {
        throw new Error(`API request failed with status ${response.status}`);
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    logger.error("Error fetching posts:", error);
    throw error;
  }
}
