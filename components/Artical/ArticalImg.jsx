const ArticalImg = ({ src , loading = false }) => {
  return (
    <div className=" w-full mt-4 mb-[56px] lg:h-[666px] sm:h-[250px] rounded-[35px] overflow-hidden">
     {loading ? (<div className="h-60 bg-gray-200 animate-pulse w-full"></div>) : ( <img src={src} className="w-full h-full object-cover rounded" />)}
    </div>
  );
};

export default ArticalImg;
