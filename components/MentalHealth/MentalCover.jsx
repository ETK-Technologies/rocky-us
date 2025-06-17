import PageCover from "@/components/PageCover";
import VideoCover from "../utils/VideoCover";

const MentalCoverData = {
  title: "100% Private, Online & Discreet",
  subtitle: "Mental Health Support",
  url: "https://myrocky.b-cdn.net/MH%20Final%20Web.mp4",
  note: "Skip the long wait times and get 1:1 support from a licensed healthcare practitioner.",
  proudPartner: true,
  buttons: [
    {
      text: "Get Started",
      href: "/mh-pre-quiz/",
      primary: true,
      ariaLabel: "Opt1",
      width: "md:w-[152px]",
    },
  ],
};

const MentalCover = () => {
  return (
    <>
      <VideoCover data={MentalCoverData} />
    </>
  );
};

export default MentalCover;
