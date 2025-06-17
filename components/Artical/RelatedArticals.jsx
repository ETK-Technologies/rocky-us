import BlogsWrapper from "../Blogs/BlogsWrapper";

const RelatedArticals = ({RelatedBlogs}) => {
    return (<>
        <div className="mt-5">
            <h1 className="text-3xl mb-8">
                Related Articals
            </h1>
            <BlogsWrapper Blogs={RelatedBlogs}></BlogsWrapper>
        </div>
    </>)
}


export default RelatedArticals;