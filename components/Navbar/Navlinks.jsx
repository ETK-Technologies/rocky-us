"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import MorePages from "./MorePages";

const Navlinks = ({ menuItems }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleLinkClick = () => {
    setHoveredItem(null);
  };

  return (
    <div className="hidden md:flex items-center gap-[24px] z-20">
      {menuItems.map((item) => (
        <MenuItem
          key={item.text}
          item={item}
          isHovered={hoveredItem === item}
          onMouseEnter={() => handleMouseEnter(item)}
          onMouseLeave={handleMouseLeave}
          onLinkClick={handleLinkClick}
        />
      ))}
      <MorePages />
    </div>
  );
};

export default Navlinks;

const MenuItem = ({
  item,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onLinkClick,
}) => {
  return (
    <div
      className="group z-20"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link
        href={item.link}
        className="menu-item py-[21px] text-black font-semibold hover:text-gray-500 group-hover:border-b-[1.5px] group-hover:border-b-[#000000] z-10"
        prefetch={true}
        onClick={onLinkClick}
      >
        {item.text}
      </Link>
      {!item.withoutMegaMenu && (
        <MegaMenu item={item} isHovered={isHovered} onLinkClick={onLinkClick} />
      )}
    </div>
  );
};

const MegaMenu = ({ item, isHovered, onLinkClick }) => {
  return (
    <div
      className={`${
        isHovered ? "block" : "hidden"
      } absolute left-0 top-[calc(100%-16px)] pt-4 w-full z-50`}
    >
      <div className="bg-[white] p-5 border-t border-solid border-[#E2E2E1]">
        <div className="w-full max-w-[1224px] mx-auto flex gap-[40px]">
          {item.mainText && (
            <p className="text-[14px] font-[450] h-fit leading-[15.4px] headers-font w-[266px]">
              <Link onClick={onLinkClick} href={item.mainLink} prefetch={true}>
                {item.mainText}
              </Link>
            </p>
          )}
          <ul className="grid grid-cols-2 gap-10">
            {item.sections &&
              item.sections.map((section, index) => {
                return (
                  <div key={index} className="w-[266px]">
                    {section.title && (
                      <h2 className="p-2 pt-0 text-[12px] md:text-[14px] font-bold text-[#454545]">
                        {section.title}
                      </h2>
                    )}
                    {section.products.map((product, productIndex) => {
                      return (
                        <li
                          key={`${product.name}-${productIndex}`}
                          className="p-1.5 border-hover text-[14px] font-[400] text-[#212121]"
                        >
                          <Link
                            href={product.link}
                            prefetch={true}
                            onClick={onLinkClick} // Close the MegaMenu on link click
                          >
                            {product.name}
                          </Link>
                        </li>
                      );
                    })}
                  </div>
                );
              })}
          </ul>
          {item.getStartedLink && (
            <div className="">
              <h2 className="text-[12px] font-[600]  mb-5 border-hover text-[#454545]">
                <Link
                  href={item.getStartedLink}
                  prefetch={true}
                  onClick={onLinkClick} // Close the MegaMenu on link click
                >
                  GET STARTED
                </Link>
              </h2>
              <div className="relative rounded-[16px] overflow-hidden bg-[linear-gradient(180deg,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0)_26.27%)]">
                <p className="absolute z-20 p-4 text-[18px] font-[450] text-[#ffffff] headers-font">
                  {item.getStartedText}
                </p>
                <Link
                  onClick={onLinkClick} // Close the MegaMenu on link click
                  href={item.getStartedLink}
                  className="absolute z-20 bg-white p-3 flex items-center justify-center rounded-full bottom-4 left-4 "
                >
                  <FaArrowRightLong />
                </Link>
                <div className="relative w-[266px] h-[266px]">
                  <div className="absolute left-0 bottom-0 w-full h-full z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0)_26.27%)]"></div>
                  <Image
                    className="w-full h-full object-cover"
                    fill
                    src={item.getStartedImage}
                    alt="nav-image"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// const MegaMenu = ({ item }) => {
//   return (
//     <div className="hidden group-hover:block absolute left-0 top-[calc(100%-16px)] pt-4 w-full">
//       <div className="bg-[white] p-5 border-t border-solid border-[#E2E2E1]">
//         <div className="w-full max-w-[1224px] mx-auto flex gap-[40px]">
//           {/* Left Column */}
//           {item.mainLink && item.mainText && (
//             <p className="text-[14px] font-[450] h-fit leading-[15.4px] headers-font w-[266px]">
//               <Link href={item.mainLink}>{item.mainText}</Link>
//             </p>
//           )}

//           {/* Middle Columns */}
//           <ul className="grid grid-cols-2 gap-10">
//             {item.sections &&
//               item.sections.map((section) => (
//                 <div
//                   key={section.title || section.products?.[0]?.name}
//                   className="w-[266px]"
//                 >
//                   {section.title && (
//                     <h2 className="p-2 pt-0 text-[12px] md:text-[14px] font-bold text-[#454545]">
//                       {section.title}
//                     </h2>
//                   )}
//                   {section.products.map((product) => (
//                     <li
//                       key={product.name}
//                       className="p-1.5 border-hover text-[14px] font-[400] text-[#212121]"
//                     >
//                       {product.link ? (
//                         <Link href={product.link}>{product.name}</Link>
//                       ) : (
//                         <span>{product.name}</span>
//                       )}
//                     </li>
//                   ))}
//                 </div>
//               ))}
//           </ul>

//           {/* Right Column */}
//           {item.getStartedLink && item.getStartedImage && (
//             <div>
//               {item.getStartedText && (
//                 <h2 className="text-[12px] font-[600] mb-5 border-hover text-[#454545]">
//                   <Link href={item.getStartedLink}>GET STARTED</Link>
//                 </h2>
//               )}
//               <div className="relative rounded-[16px] overflow-hidden bg-[linear-gradient(180deg,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0)_26.27%)]">
//                 {item.getStartedText && (
//                   <p className="absolute z-20 p-4 text-[18px] font-[450] text-[#ffffff] headers-font">
//                     {item.getStartedText}
//                   </p>
//                 )}
//                 <Link
//                   href={item.getStartedLink}
//                   className="absolute z-10 bg-white p-3 flex items-center justify-center rounded-full bottom-4 left-4"
//                 >
//                   <FaArrowRightLong />
//                 </Link>
//                 <div className="relative w-[266px] h-[266px]">
//                   <Image
//                     className="w-full h-full object-cover"
//                     fill
//                     src={item.getStartedImage}
//                     alt="nav-image"
//                   />
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
