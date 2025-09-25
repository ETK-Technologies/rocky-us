const ArticleImg = ({ src, loading = false }) => {
  const defaultImage = "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg";
  
  const handleImageError = (e) => {
    e.target.src = defaultImage;
  };

  return (
    <div className=" w-full mt-10 mb-[56px] lg:h-[666px] sm:h-[250px] rounded-[12px] sm:rounded-[20px] lg:rounded-[35px] overflow-hidden">
     {loading ? (
       <div className="h-60 bg-gray-200 animate-pulse w-full"></div>
     ) : (
       <img 
         src={src || defaultImage} 
         className="w-full h-full object-cover rounded-[12px] sm:rounded-[20px] lg:rounded-[35px]" 
         onError={handleImageError}
         alt="Blog featured image"
       />
     )}
    </div>
  );
};

export default ArticleImg;
