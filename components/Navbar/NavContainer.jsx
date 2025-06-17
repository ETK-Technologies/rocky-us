const NavContainer = ({ children }) => {
  return (
    <div className="relative z-10 border-b border-solid border-[#E2E2E1]">
      <nav className="bg-white px-5 sectionWidth:px-0">
        <div className="max-w-[1224px] mx-auto ">
          <div className="flex justify-between items-center relative md:px-5">
            {children}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavContainer;
