"use client";

import { useState, useEffect, use } from "react";
import { logger } from "@/utils/devLogger";

import Section from "@/components/utils/Section";
import MoreQuestions from "@/components/MoreQuestions";
import CategoryBtn from "@/components/Blogs/CategoryBtn";
import CenterContainer from "@/components/Article/CenterContainer";
import TitleWrapper from "@/components/Article/TitleWrapper";
import Author from "@/components/Article/Author";
import ArticleImg from "@/components/Article/ArticleImg";
import HtmlContent from "@/components/Article/HtmlContent";
import Content from "@/components/Article/Content";
import RelatedArticles from "@/components/Article/RelatedArticles";
import Loader from "@/components/Loader";

export default function BlogArticlePage({ params }) {
  const slug = use(params);
  const [Blog, setBlog] = useState(null);
  const [BlogLoading, setBlogLoading] = useState(true);
  const [RelatedBlogs, setRelatedBlogs] = useState([]);
  const [RelatedBlogsLoading, setRelatedBlogsLoading] = useState(true);
  const [FeaturedImage, setFeaturedImage] = useState(
    "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg"
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
        setAuthorContent(blog.authors[0]);
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
        const categoryName = blog.class_list[7]
          .replace("category-", "")
          .replace(/-/g, " ");
        setCategory(categoryName);
      }

      if (blog.yoast_head_json?.twitter_misc?.["Est. reading time"]) {
        setEstReadTime(
          blog.yoast_head_json.twitter_misc["Est. reading time"] + " read"
        );
      }
    } catch (error) {
      logger.error("Error fetching blogs:", error);
    } finally {
      setBlogLoading(false);
    }
  };

  const fetchRelated = async (category) => {
    try {
      setRelatedBlogsLoading(true);

      // Get category ID from the current blog's categories
      let categoryId = null;
      if (Blog && Blog.categories && Blog.categories.length > 0) {
        categoryId = Blog.categories[0]; // Use the first category
      }

      if (!categoryId) {
        logger.warn("No category ID found for related articles");
        setRelatedBlogs([]);
        return;
      }

      var url = `/api/blogs?categories=${categoryId}&per_page=4`;
      const res = await fetch(url);
      const data = await res.json();

      // Filter out the current blog from related articles
      const filteredData = Array.isArray(data)
        ? data.filter((blog) => blog.id !== Blog.id)
        : [];
      setRelatedBlogs(filteredData);
    } catch (error) {
      logger.error("Error fetching related blogs: ", error);
      setRelatedBlogs([]);
    } finally {
      setRelatedBlogsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  // Fetch related blogs when blog is loaded
  useEffect(() => {
    if (Blog && Blog.categories && Blog.categories.length > 0) {
      fetchRelated();
    }
  }, [Blog]);

  const onClickCategoryBtn = (category) => {};

  // Show loader while blog is loading
  if (BlogLoading) {
    return <Loader />;
  }

  return (
    <main>
      <Section className="pt-0">
        <CenterContainer loading={BlogLoading}>
          <CategoryBtn
            category={Category}
            loading={BlogLoading}
            onClick={onClickCategoryBtn}
          ></CategoryBtn>
          <TitleWrapper title={Blog?.title?.rendered}></TitleWrapper>
          {/* <Author
            name={AuthorContent?.display_name}
            readTime={EstReadTime}
            date={Blog?.date}
            avatarUrl={AuthorContent?.avatar_url}
          ></Author> */}
        </CenterContainer>

        <ArticleImg
          src={FeaturedImage}
          loading={BlogLoading}
          alt={Blog?.title.rendered}
        ></ArticleImg>

        <Content
          html={Blog?.content?.rendered}
          loading={BlogLoading}
          AuthorContent={AuthorContent}
        ></Content>

        <RelatedArticles
          RelatedBlogs={RelatedBlogs}
          loading={RelatedBlogsLoading}
        ></RelatedArticles>

        <MoreQuestions
          title="Your path to better health begins here."
          buttonText="Get Started For Free"
          buttonWidth="240"
        ></MoreQuestions>
      </Section>
    </main>
  );
}
