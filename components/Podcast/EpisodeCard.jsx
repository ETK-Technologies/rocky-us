import Image from "next/image";
import { FaPlayCircle } from "react-icons/fa";

export const EpisodeCard = ({ episode }) => {
  return (
    <div className="overflow-hidden p-6 bg-white rounded-2xl shadow-lg transition-shadow hover:shadow-xl flex flex-col h-full">
      <div className="overflow-hidden relative rounded-2xl">
        <div className="relative h-[330px] w-full">
          <Image
            src={episode.image}
            alt={episode.title}
            fill
            className="object-cover rounded-2xl"
          />
        </div>
        {/* <p className="absolute top-4 left-4 bg-[#FFFFFFCC] text-xs px-4 py-1 rounded-full">
          {episode.author}
        </p> */}
      </div>

      <div className="pt-6 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-4">
          <p className="bg-[#F7F9FB] text-xs px-4 py-1 rounded-full">
            {episode.category}
          </p>
          <p className="text-sm text-[#929292] headers-font font-[550]">
            {episode.date} . {episode.length || `${episode.duration} mins streaming`}
          </p>
        </div>
        <h3 className="mb-4 text-3xl font-medium leading-tight headers-font">
          {episode.title}
        </h3>
        <div className="flex-grow"></div>
        <button className="py-3 w-full flex items-center justify-center gap-2 text-white bg-black rounded-full mt-auto">
         <FaPlayCircle className="text-[22px]"/> Listen Now
        </button>
      </div>
    </div>
  );
};
