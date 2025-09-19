import Image from "next/image";
import Link from "next/link";

const Logo = ({ withLink = true }) => {
  const logoContent = (
    <div className="h-[35px] w-[70px] relative ml-[0]">
      <Image
        src="https://myrocky.b-cdn.net/WP%20Images/Global%20Images/Rocky-TM_upscayl_2x.webp"
        alt="Rocky Logo"
        fill
        className="object-contain"
      />
    </div>
  );

  return (
    <div className="text-2xl py-4 font-bold text-gray-800 flex justify-center">
      {withLink ? (
        <Link href="/" aria-label="Rocky Homepage">
          {logoContent}
        </Link>
      ) : (
        logoContent
      )}
    </div>
  );
};

export default Logo;
