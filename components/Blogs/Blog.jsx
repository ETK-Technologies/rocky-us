"use client";
import CustomImage from "@/components/utils/CustomImage";
import Link from "next/link";

function getText(html) {
  var divContainer = document.createElement("div");
  divContainer.innerHTML = html;
  return divContainer.textContent || divContainer.innerText || "";
}

const Blog = ({ blog }) => {
  // Extract reading time from Twitter meta data if available
  const getReadingTime = () => {
    if (blog.yoast_head_json?.twitter_misc?.["Est. reading time"]) {
      return blog.yoast_head_json.twitter_misc["Est. reading time"] + " read";
    }
    return "4 mins read"; // Default fallback
  };

  // Get featured image URL
  const getFeaturedImageUrl = () => {
    if (
      blog._embedded &&
      blog._embedded["wp:featuredmedia"] &&
      blog._embedded["wp:featuredmedia"][0] &&
      blog._embedded["wp:featuredmedia"][0].source_url
    ) {
      return blog._embedded["wp:featuredmedia"][0].source_url;
    }

    // Check for image in yoast_head_json as fallback
    if (
      blog.yoast_head_json?.og_image &&
      blog.yoast_head_json.og_image[0]?.url
    ) {
      return blog.yoast_head_json.og_image[0].url;
    }

    return "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/Pre%20Sell/fast.png"; // Default fallback
  };

  // Get the category name
  const getCategory = () => {
    if (blog.class_list && blog.class_list[7]) {
      return blog.class_list[7].replace("category-", "").replace(/-/g, " ");
    }
    return "";
  };

  return (
    <div
      className="max-w-sm rounded-2xl overflow-hidden bg-white"
      key={blog.id}
    >
      <div className="relative w-full h-60">
        <CustomImage
          src={getFeaturedImageUrl()}
          alt={blog.title?.rendered || "Article thumbnail"}
          className="rounded-xl"
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          priority={false}
        />
        <span className="absolute top-2 left-2 bg-white text-black text-xs px-3 py-1 rounded-full shadow z-10">
          {getCategory()}
        </span>
      </div>
      <div className="py-4">
        <p className="text-gray-500 text-sm mb-2">
          {new Date(blog.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          • {getReadingTime()}
        </p>
        <Link href={`/blog/` + blog.slug}>
          <h2 className="text-lg font-semibold leading-snug mb-2">
            {blog.title.rendered}
          </h2>
        </Link>
        <p className="text-gray-600 text-sm">
          {getText(blog.content.rendered).slice(0, 75) +
            (getText(blog.content.rendered).length > 75 ? "..." : "")}
        </p>
      </div>
    </div>
  );
};

export default Blog;
