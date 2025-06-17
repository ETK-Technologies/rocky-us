import AdContainer from "./AdContainer";
import Author from "./Author";
import HtmlContent from "./HtmlContent";

const Content = ({ html, loding = false, AuthorContent = null }) => {
  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="lg:col-span-9 col-span-12 overflow-hidden">
          <HtmlContent className="mb-8 mt-4" html={html}></HtmlContent>

          <div className="flex justify-center content-center ">
            <Author
              name={AuthorContent?.display_name}
              avatarUrl={AuthorContent?.avatar_url}
              full_show={true}
              desc={AuthorContent?.description}
              avatarSize="lg:h-[140px] lg:w-[140px] h-[100px] w-[100px]"
            ></Author>
          </div>
        </div>
        <div className="lg:col-span-3 col-span-12 sm:mt-4">
          <AdContainer></AdContainer>
        </div>
      </div>
    </>
  );
};

export default Content;
