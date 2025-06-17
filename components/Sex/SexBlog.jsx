import RockyBlog from "@/components/RockyBlog";
import Link from "next/link";

const sexBlog = [
  {
    videoSrc: "https://myrocky.b-cdn.net/Desktop-GIFs.mp4",
    title: "Simple. Discreet. Affordable.",
    buttonText: "Get Started",
    buttonLink: "/ed-prequiz"
  }
];

const SexBlog = () => {
  return <RockyBlog blog={sexBlog} />;
};

export default SexBlog;
