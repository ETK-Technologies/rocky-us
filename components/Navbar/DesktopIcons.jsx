import { CiUser } from "react-icons/ci";
import CartIcon from "./CartIcon";
import Link from "next/link";

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

const ProfileIcon = ({ token, nameToShow, handleToggle }) => {
  return (
    <div className="block relative group">
      <div className="flex gap-2 p-2 hover:bg-[#F5F4EF] hover:rounded-full">
        <CiUser size={22} />
        {token && nameToShow && (
          <span className="capitalize">Hi, {nameToShow}!</span>
        )}
      </div>
      {token ? (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-solid">
          <Link
            href="/my-account"
            className="block px-4 py-2 text-gray-700 hover:bg-[#F5F4EF] hover:text-black"
            onClick={handleToggle}
          >
            My Account
          </Link>
          <form action="/api/logout" method="POST">
            <button className="block px-4 py-2 text-gray-700 hover:bg-[#F5F4EF] hover:text-black w-full text-start">
              Logout
            </button>
          </form>
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
