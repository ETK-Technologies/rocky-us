import axios from "axios";

export async function GET(request) {
  try {
    const categories = await axios.get(
      process.env.BASE_URL + "/wp-json/wp/v2/categories",
      {
        params: {
          per_page: "100",
        },
        headers: {
          Authorization: process.env.ADMIN_TOKEN,
        },
      }
    );

    return new Response(JSON.stringify(categories.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
