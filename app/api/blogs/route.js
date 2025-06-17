import https from "https";
import axios from "axios";


export async function GET(req) {
  try {
    
    const page  = req.nextUrl.searchParams.get("page");
    const categories = req.nextUrl.searchParams.get("categories");
    const per_page = req.nextUrl.searchParams.get("per_page");
    var params =  {
      _embed: true,
      per_page: per_page == undefined ? 12 : per_page,
      page: page == undefined ? 1 : page
    };

    if(categories != undefined) {
      params["categories"] = categories;
    }

    const blogs = await axios
      .get(process.env.BASE_URL + "/wp-json/wp/v2/posts", {
        params: params,
        headers: {
          Authorization : process.env.ADMIN_TOKEN
        }
      });

     const totalPages = blogs.headers.get('X-WP-TotalPages');

    return new Response(JSON.stringify(blogs.data), {
      status: 200,
      headers: { "Content-Type": "application/json", "TotalPages" : totalPages },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
