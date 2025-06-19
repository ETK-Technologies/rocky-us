"use client";

import { useState, useEffect, use } from "react";

import Section from "@/components/utils/Section";
import MoreQuestions from "@/components/MoreQuestions";
import CategoryBtn from "@/components/Blogs/CategoryBtn";
import CenterContainer from "@/components/Artical/CenterContainer";
import TitleWrapper from "@/components/Artical/TitleWrapper";
import Author from "@/components/Artical/Author";
import ArticalImg from "@/components/Artical/ArticalImg";
import HtmlContent from "@/components/Artical/HtmlContent";
import Content from "@/components/Artical/Content";
import RelatedArticals from "@/components/Artical/RelatedArticals";

export default function Blogs({ params }) {
  const slug = use(params);
  const [Blog, setBlog] = useState(null);
  const [BlogLoading, setBlogLoading] = useState(true);
  const [RelatedBlogs, setRelatedBlogs] = useState([]);
  const [RelatedBlogsLoading, setRelatedBlogsLoading] = useState(true);
  const [FeaturedImage, setFeaturedImage] = useState(
    "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/Pre%20Sell/fast.png"
  );
  const [Category, setCategory] = useState("");
  const [EstReadTime, setEstReadTime] = useState("4 min Read");
  const [AuthorContent, setAuthorContent] = useState("");


  const fetchBlog = async () => {
    try {
      setBlogLoading(true);
      var url = "/api/blogs?slug=" + slug.slug;
      const res = await fetch(url);
      const data = await res.json();
      const blog = data[0];
      setBlog(blog);

      if (blog.authors.length > 0) {
        setAuthorContent(blog.authors[0])
      }

      if (
        blog._embedded &&
        blog._embedded["wp:featuredmedia"] &&
        blog._embedded["wp:featuredmedia"][0] &&
        blog._embedded["wp:featuredmedia"][0].source_url
      ) {
        setFeaturedImage(blog._embedded["wp:featuredmedia"][0].source_url);
      }

      // Get the category name
      if (blog.class_list && blog.class_list[7]) {
        setCategory(
          blog.class_list[7].replace("category-", "").replace(/-/g, " ")
        );


        fetchRelated(Category);
      }

      if (blog.yoast_head_json?.twitter_misc?.["Est. reading time"]) {
        setEstReadTime(blog.yoast_head_json.twitter_misc["Est. reading time"] + " read");
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setBlogLoading(false);
    }
  };

  const fetchRelated = async({category}) => {
    try {
      setRelatedBlogsLoading(true);
      var url = "/api/blogs?category=" + category + "&per_page=3";
      const res = await fetch(url);
      const data = await res.json();
      setRelatedBlogs(data);
    } catch(error) {
      console.error("Error fetching related blogs: ", error);
    } finally {
      setRelatedBlogsLoading(false);
    }
  }

  useEffect(() => {
    fetchBlog();
  }, []);

  const onClickCategoryBtn = (category) => {};

  return (
    <main>
      <Section>
        <CenterContainer loading={BlogLoading}>
          <CategoryBtn
            category={Category}
            loading={BlogLoading}
            onClick={onClickCategoryBtn}
          ></CategoryBtn>
          <TitleWrapper title={Blog?.title?.rendered}></TitleWrapper>
          <Author
            name={AuthorContent?.display_name}
            readTime={EstReadTime}
            date={Blog?.date}
            avatarUrl={AuthorContent?.avatar_url}
          ></Author>
        </CenterContainer>

        <ArticalImg src={FeaturedImage} loading={BlogLoading} alt={Blog?.title.rendered}></ArticalImg>

        <Content html={Blog?.content?.rendered} loading={BlogLoading} AuthorContent={AuthorContent}></Content>

        
        <RelatedArticals RelatedBlogs={RelatedBlogs} loading={RelatedBlogsLoading}></RelatedArticals>

        <MoreQuestions
          title="Your path to better health begins here."
          buttonText="Get Started For Free"
          buttonWidth="240"
        ></MoreQuestions>
      </Section>
    </main>
  );
}
