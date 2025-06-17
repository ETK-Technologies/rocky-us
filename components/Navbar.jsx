import NavContainer from "./Navbar/NavContainer";
import DesktopIcons from "./Navbar/DesktopIcons";
import Logo from "./Navbar/Logo";
import Trustpilot from "./Navbar/Trustpilot";
import Navlinks from "./Navbar/Navlinks"; // Changed from MegaMenu to Navlinks, which is the correct component name
import MobileMenu from "./Navbar/MobileMenu";
import { cookies } from "next/headers";
import HeaderProudPartner from "./Navbar/HeaderProudPartner";

const Navbar = async ({ className }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;
  const userName = cookieStore.get("userName")?.value;
  const userEmail = cookieStore.get("userEmail")?.value;
  const displayName = cookieStore.get("displayName")?.value;

  // Use display name with fallbacks in this order: displayName -> firstName -> userEmail
  let nameToShow;
  if (displayName) {
    nameToShow = displayName;
  } else if (userName) {
    nameToShow = userName.split(" ")[0];
  } else if (userEmail) {
    nameToShow =
      userEmail.length > 15 ? userEmail.substring(0, 12) + "..." : userEmail;
  } else {
    nameToShow = "Guest";
  }

  return (
    <header className={`${className || ""}`}>
      <Trustpilot />
      <HeaderProudPartner />
      <NavContainer>
        <MobileMenu
          menuItems={menuItems}
          token={token}
          displayName={nameToShow}
        />
        <Logo />
        <Navlinks menuItems={menuItems} />{" "}
        {/* Changed from MegaMenu to Navlinks */}
        <DesktopIcons />
      </NavContainer>
    </header>
  );
};

export default Navbar;

const menuItems = [
  // SEXUAL HEALTH
  {
    text: "Sexual Health",
    link: "/sex",
    mainText: "See all Sexual Health",
    mainLink: "/sex",
    getStartedText: "Get Confidence Back in Bed",
    getStartedLink: "/ed-pre-consultation-quiz",
    getStartedImage:
      "https://myrocky.b-cdn.net/WP%20Images/Sexual%20Health/sex-header.webp",
    sections: [
      {
        title: "Sexual Health",
        name: "Products",

        products: [
          { name: "Sildenafil (Generic)", link: "/product/sildenafil-viagra/" },
          { name: "Tadalafil (Generic)", link: "/product/tadalafil-cialis/" },
          { name: "Viagra (Brand)", link: "/product/viagra/" },
          { name: "Cialis (Brand)", link: "/product/cialis/" },
          {
            name: "Dissolvable Tadalafil",
            link: "/product/chewable-tadalafil/",
          },
        ],
      },
      {
        title: "PREMATURE EJACULATION",
        products: [
          { name: "Numb Ointment", link: "/product/lidocaine/" },
          { name: "Numb Spray", link: "/product/lidocaine-spray/" },
        ],
      },
      {
        title: "TESTOSTERONE SUPPLEMENTS",
        products: [
          { name: "Essential T-Boost", link: "/product/testosterone-support/" },
        ],
      },
    ],
  },
  // HAIR LOSS
  {
    text: "Hair Loss",
    link: "/hair",
    mainText: "See all Hair Loss",
    mainLink: "/hair",
    getStartedText: "Stop Hair Loss in Its Tracks",
    getStartedLink: "/hair-flow",
    getStartedImage:
      "https://myrocky.b-cdn.net/WP%20Images/Hair%20Loss/hair.webp",
    sections: [
      {
        title: "Hair Loss",
        name: "Products",

        products: [
          {
            name: "Finasteride & Minoxidil Topical Foam",
            link: "/product/finasteride-minoxidil-topical-foam/",
          },
          {
            name: "Finasteride (Propecia)",
            link: "/product/finasteride/",
          },
          { name: "Minoxidil (Rogaine)", link: "/product/minoxidil/" },
        ],
      },
      // {
      //   title: "Hair Kits",
      //   products: [
      //     { name: "My Rocky Kit", link: "/my-rocky-combo-pack/" },
      //     {
      //       name: "Prescription Kit",
      //       link: "/my-rocky-combo-pack/#prescription-kit",
      //     },
      //     { name: "Organic Kit", link: "/my-rocky-combo-pack/#organic-kit" },
      //   ],
      // },
      // {
      //   title: "Hair care",
      //   products: [
      //     {
      //       name: "Essential IX Shampoo",
      //       link: "/product/essential-ix/",
      //     },
      //     { name: "Essential V Oil", link: "/product/essential-v/" },
      //   ],
      // },
      {
        title: "SUPPLEMENTS",
        products: [
          {
            name: "Hair Growth Support",
            link: "/product/hair-growth-support/",
          },
        ],
      },
    ],
  },
  // BODY OPTIMIZATION
  {
    text: "Body Optimization",
    link: "/body-optimization",
    mainText: "See all Body Optimization",
    mainLink: "/body-optimization",
    getStartedText: "Your Wellness Journey Starts Today",
    getStartedLink: "/wl-pre-consultation",
    getStartedImage:
      "https://myrocky.b-cdn.net/WP%20Images/Weight%20Loss/wl.webp",
    sections: [
      {
        title: "Products",
        name: "Products",

        products: [
          {
            name: "Ozempic®",
            link: "/product/ozempic/",
          },
          {
            name: "Mounjaro®",
            link: "/product/mounjaro/",
          },
          { name: "Wegovy®", link: "/product/wegovy/" },
          { name: "Rybelsus®", link: "/product/rybelsus/" },
        ],
      },
    ],
  },
  // MENTAL HEALTH
  {
    text: "Mental Health",
    link: "/mental-health",
    withoutMegaMenu: true,
  },
  // RECOVERY
  {
    text: "Recovery",
    link: "/product/dhm-blend",
    mainText: "See all Recovery",
    mainLink: "/product/dhm-blend",
    getStartedText: "A Smarter Way to Recover",
    getStartedLink: "/product/dhm-blend",
    getStartedImage:
      "https://myrocky.b-cdn.net/WP%20Images/dhm/DHMBlendPP.png?v=1",
    sections: [
      {
        title: "Products",
        name: "Products",

        products: [
          {
            name: "DHM Blend®",
            link: "/product/dhm-blend/",
          },
        ],
      },
    ],
  },
  // SMOKING CESSATION
  {
    text: "Smoking Cessation",
    link: "/zonnic",
    mainText: "See all Smoking Cessation",
    mainLink: "/zonnic",
    getStartedText: "A Smarter Way to Quit",
    getStartedLink: "/product/zonnic",
    getStartedImage: "/zonic/zonnic-life.webp",
    sections: [
      {
        title: "Products",
        name: "Products",

        products: [
          {
            name: "Zonnic®",
            link: "/product/zonnic/",
          },
        ],
      },
    ],
  },
  // MORE
  // {
  //   text: "More",
  //   link: "#",
  //   sections: [
  //     {
  //       // title: "More Pages",
  //       name: "More Pages",
  //       products: [
  //         {
  //           name: "Reviews",
  //           link: "/reviews/",
  //         },
  //         {
  //           name: "Blogs",
  //           link: "/blog/",
  //         },
  //       ],
  //     },
  //   ],
  // },
];
