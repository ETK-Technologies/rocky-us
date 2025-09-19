import NavContainer from "./Navbar/NavContainer";
import Logo from "./Navbar/Logo";
import Trustpilot from "./Navbar/Trustpilot";
import Navlinks from "./Navbar/Navlinks";
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
        <Logo />
        <Navlinks menuItems={menuItems} token={token} nameToShow={nameToShow} />
      </NavContainer>
    </header>
  );
};

export default Navbar;

const menuItems = [
  // SEXUAL HEALTH
  {
    category: "Sexual Health",
    image:
      "https://myrocky.b-cdn.net/WP%20Images/Sexual%20Health/sex-header.webp",
    assessmentText: "Start Your ED Assessment",
    description: "Get Confidence Back in Bed",
    treatments: [
      {
        text: "Erectile Dysfunction",
        link: "/sex",
        quizLink: "/ed-pre-consultation-quiz",
      },
    ],
    medications: [
      {
        text: "Sildenafil (Generic Viagra)",
        link: "/product/sildenafil-viagra/",
        type: "most-popular",
      },
      {
        text: "Tadalafil (Generic Cialis®)",
        link: "/product/tadalafil-cialis/",
        type: "most-popular",
      },
      // { text: "Viagra®", link: "/product/viagra/" },
      // { text: "Cialis®", link: "/product/cialis/" },
      // { text: "Dissolvable Tadalafil", link: "/product/chewable-tadalafil/" },
    ],
  },

  // BODY OPTIMIZATION
  {
    category: "Weight Loss",
    image: "https://myrocky.b-cdn.net/WP%20Images/Weight%20Loss/wl.webp",
    assessmentText: "Start Your Weight Loss Assessment",
    description: "Lose Weight With Science",
    treatments: [
      {
        text: "Weight Loss",
        link: "/body-optimization",
        quizLink: "/wl-pre-consultation",
      },
    ],
    medications: [
      { text: "Ozempic®", link: "/product/ozempic/", type: "most-popular" },
      { text: "Mounjaro®", link: "/product/mounjaro/" },
      { text: "Wegovy®", link: "/product/wegovy/" },
      { text: "Rybelsus®", link: "/product/rybelsus/" },
    ],
  },

  // HAIR LOSS
  {
    category: "Hair Loss",
    image: "https://myrocky.b-cdn.net/WP%20Images/Hair%20Loss/hair.webp",
    assessmentText: "Start Your Hair Loss Assessment",
    description: "Stop Hair Loss in Its Tracks",
    treatments: [
      {
        text: "Hair Loss",
        link: "/hair",
        quizLink: "/hair-pre-consultation-quiz",
      },
    ],
    medications: [
      {
        text: "Finasteride & Minoxidil Topical Foam",
        link: "/product/finasteride-minoxidil-topical-foam/",
        type: "most-popular",
      },
    ],
  },
];
