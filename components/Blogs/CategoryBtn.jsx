const CategoryBtn = ({ category, isSelected , onClick, loading=false}) => {
  
  // [selected class => ] bg-black text-white
  return (
    <>
      {loading ? (<div className="w-20 h-10 bg-gray-100 rounded animate-pulse"></div>) : (<button
      key={typeof category === "string" ? 0 :   category.id}
      onClick={() => onClick(typeof category === "string" ? category : category.id)}
      className={`px-4 py-2 grid-col rounded-full ${isSelected ? "bg-black text-white" : "bg-gray-200 text-black" } `}>
      { typeof category === "string" ? category : category.name}
    </button>)}
    </>
    
  );
};

export default CategoryBtn;
