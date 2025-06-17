const Author = ({
  name,
  date ="",
  readTime="",
  avatarUrl,
  avatarSize = "h-16 w-16",
  full_show = false,
  desc = ""
}) => {
  return (
    <div className="flex items-center justify-center mt-4 mb-[40px] gap-4">
      <div className={`flex-shrink-0 ${avatarSize}`}>
        <img
          src={avatarUrl}
          alt={name}
          className="rounded-full h-full w-full object-cover"
        />
      </div>

      <div>
        <div className="flex items-center gap-1">
          <h3 className="font-semibold text-gray-900">{name}</h3>
        </div>

       {full_show ? (<div className="text-gray-500 mt-3 text-sm lg:w-[380px]">
          <span>
            {desc}
          </span>
          
        </div>) : ( <div className="text-gray-500 text-sm">
          <span>
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          {readTime && <span> • {readTime}</span>}
        </div>)}
      </div>
    </div>
  );
};

export default Author;
