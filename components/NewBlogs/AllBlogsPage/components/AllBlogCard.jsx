"use client";
import CustomImage from "@/components/utils/CustomImage";
import Link from "next/link";

function getText(html) {
  var divContainer = document.createElement("div");
  divContainer.innerHTML = html;
  return divContainer.textContent || divContainer.innerText || "";
}

const AllBlogCard = ({ blog }) => {
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
      className="md:max-w-sm md:max-h-[405px] max-w-[335px] max-h-[156px] flex flex-col relative "
      key={blog.id}
    >
      {/* Blog image */}
      <div className="md:w-[384px] md:h-[216px] md:mb-4 absolute top-0 right-0 md:static ">
        <CustomImage
          src={getFeaturedImageUrl()}
          alt={blog.title?.rendered || "Article thumbnail"}
          className="object-cover md:w-[384px] md:h-[216px] w-[64px] h-[64px] md:rounded-2xl rounded-xl"
          priority={false}
          width={384}
          height={216}
        />
      </div>
      {/* Blog content */}
      <div className="md:mt-4 max-w-[255px] md:w-full md:max-w-sm">
        <Link href={`/blog/` + blog.slug}>
          <h2 className="headers-font text-black text-[18px] md:text-[24px] md:leading-[125%] font-[550] tracking-[-2%] mb-2 ">
            {blog.title.rendered}
          </h2>
        </Link>

        <div className="mb-2">
          <span className="text-black text-[12px] leading-[140%] tracking-[0%] font-[500]">
            {blog.authors.map((author) => author.display_name).join(", ")}
          </span>
          <span className="text-[#929292] text-[12px] leading-[140%] tracking-[0%] font-[500] mx-1">
            in
          </span>
          <span className="text-[#212121] text-[12px] leading-[140%] tracking-[0%] font-[500]">
            {getCategory()}
          </span>
        </div>

        <p className="text-[#6B6967] md:text-[16px] text-[14px] leading-[140%] tracking-[0%] font-[400] ">
          {getText(blog.content.rendered).slice(0, 75) +
            (getText(blog.content.rendered).length > 75 ? "..." : "")}
        </p>
      </div>
    </div>
  );
};

export default AllBlogCard;
