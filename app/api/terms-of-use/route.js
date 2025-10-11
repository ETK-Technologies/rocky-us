import axios from "axios";
import { logger } from "@/utils/devLogger";

export async function GET(req) {
  try {
    // Fetch Terms of Use page from WordPress
    const pageId = 556566;

    if (!process.env.BASE_URL || !process.env.ADMIN_TOKEN) {
      return new Response(
        JSON.stringify({ error: "Environment variables not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const apiUrl = process.env.BASE_URL + `/wp-json/wp/v2/pages/${pageId}`;

    const termsPage = await axios.get(apiUrl, {
      params: { _embed: true },
      headers: { Authorization: process.env.ADMIN_TOKEN },
      timeout: 10000,
    });

    // Extract and structure the content from the API response
    const data = termsPage.data;
    const content = data.content?.rendered || "";

    // Parse sections from the structured HTML content
    const sections = extractSectionsFromHTML(content);

    return new Response(
      JSON.stringify({
        id: data.id,
        title: data.title,
        date: data.date,
        modified: data.modified,
        sections: sections,
        rawContent: content, // Keep for fallback
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    logger.error("API: Error in terms-of-use endpoint:", error);

    return new Response(
      JSON.stringify({
        error: "Failed to fetch terms of use page",
        message: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

function extractSectionsFromHTML(htmlContent) {
  if (!htmlContent) return [];

  const sections = [];

  // Use regex to find sections with data-section-key attributes
  const sectionRegex =
    /<section[^>]*data-section-key="([^"]*)"[^>]*>([\s\S]*?)<\/section>/g;
  let match;

  while ((match = sectionRegex.exec(htmlContent)) !== null) {
    const sectionKey = match[1];
    const sectionHTML = match[2];

    // Extract title from h1 tag with data-role="title"
    const titleMatch = sectionHTML.match(
      /<h1[^>]*data-role="title"[^>]*>(.*?)<\/h1>/
    );
    const title = titleMatch
      ? titleMatch[1].trim()
      : sectionKey.replace(/_/g, " ");

    // Extract content (everything except the title)
    const contentWithoutTitle = sectionHTML
      .replace(/<h1[^>]*data-role="title"[^>]*>.*?<\/h1>/, "")
      .trim();

    sections.push({
      id: sectionKey.replace(/_/g, "-"),
      key: sectionKey,
      title: title,
      content: contentWithoutTitle,
    });
  }

  return sections;
}
