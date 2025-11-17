"use client";

import { useState } from "react";
import { CiUser } from "react-icons/ci";
import CartIcon from "./CartIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { handleLogout } from "@/utils/logoutHandler";

const DesktopIcons = ({ token, nameToShow, handleToggle }) => {
  return (
    <div className="flex  items-center">
      <ProfileIcon
        token={token}
        nameToShow={nameToShow}
        handleToggle={handleToggle}
      />
      <CartIcon handleToggle={handleToggle} />
    </div>
  );
};

export default DesktopIcons;

// const ProfileIcon = async () => {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("authToken")?.value;
//   const userName = cookieStore.get("userName")?.value;
//   const userEmail = cookieStore.get("userEmail")?.value;
//   const displayName = cookieStore.get("displayName")?.value;

//   // Use display name with fallbacks in this order: displayName -> firstName -> userEmail -> "Guest"
//   let nameToShow;
//   if (displayName) {
//     nameToShow = displayName;
//   } else if (userName) {
//     nameToShow = userName.split(" ")[0]; // Just get the first name
//   } else if (userEmail) {
//     // If using email, truncate it if it's too long
//     nameToShow =
//       userEmail.length > 15 ? userEmail.substring(0, 12) + "..." : userEmail;
//   } else {
//     nameToShow = "Guest";
//   }

//   return (
//     <div className="hidden md:block relative group">
//       <a
//         href={token ? "/my-account" : "/login-register?viewshow=login"}
//         className="hidden md:flex gap-2"
//       >
//         <CiUser size={22} />{" "}
//         {token && nameToShow && (
//           <span className="capitalize">Hi, {nameToShow}!</span>
//         )}
//       </a>
//       {token ? (
//         <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-solid">
//           <Link
//             href="/my-account"
//             className="block px-4 py-2 text-gray-700 hover:bg-slate-200 hover:text-black"
//           >
//             My Account
//           </Link>
//           <form action="/api/logout" method="POST">
//             <button className="block px-4 py-2 text-gray-700 hover:bg-slate-200 hover:text-black w-full text-start">
//               Logout
//             </button>
//           </form>
//         </div>
//       ) : (
//         <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-solid">
//           <Link
//             href="/login-register?viewshow=login"
//             className="block px-4 py-2 text-gray-700 hover:bg-slate-200 hover:text-black"
//           >
//             Sign In
//           </Link>
//           <Link
//             href="/login-register?viewshow=register"
//             className="block px-4 py-2 text-gray-700 hover:bg-slate-200 hover:text-black"
//           >
//             Register
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

const ProfileIcon = ({ token, nameToShow, handleToggle }) => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogoutClick = async (e) => {
    e.preventDefault();
    if (isLoggingOut) return; // Prevent multiple clicks

    setIsLoggingOut(true);
    try {
      if (handleToggle) {
        handleToggle();
      }
      await handleLogout(router);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Don't set to false immediately - let the navigation handle it
      // setIsLoggingOut(false);
    }
  };

  return (
    <div className="block relative group">
      <Link
        href={token ? "/my-account" : "/login-register?viewshow=login"}
        className="flex gap-2 p-2 hover:bg-[#F5F4EF] hover:rounded-full"
        onClick={handleToggle}
      >
        <CiUser size={22} />{" "}
        {token && nameToShow && (
          <span className="capitalize">Hi, {nameToShow}!</span>
        )}
      </Link>
      {token ? (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-solid">
          <Link
            href="/my-account"
            className="block px-4 py-2 text-gray-700 hover:bg-[#F5F4EF] hover:text-black"
            onClick={handleToggle}
          >
            My Account
          </Link>
          <button
            onClick={handleLogoutClick}
            disabled={isLoggingOut}
            className="block px-4 py-2 text-gray-700 hover:bg-[#F5F4EF] hover:text-black w-full text-start disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoggingOut ? (
              <>
                <span className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></span>
                Logging out...
              </>
            ) : (
              "Logout"
            )}
          </button>
        </div>
      ) : (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-solid">
          <Link
            href="/login-register?viewshow=login"
            className="block px-4 py-2 text-gray-700 hover:bg-[#F5F4EF] hover:text-black"
            onClick={handleToggle}
          >
            Sign In
          </Link>
          <Link
            href="/login-register?viewshow=register"
            className="block px-4 py-2 text-gray-700 hover:bg-[#F5F4EF] hover:text-black"
            onClick={handleToggle}
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
};
