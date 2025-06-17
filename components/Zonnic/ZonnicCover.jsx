import PageCover from "@/components/PageCover";

const ZonnicCoverData = {
  // title: "",
  proudPartner: true,
  subtitle: "A new way to quit smoking",
  image: "https://myrocky.b-cdn.net/WP%20Images/zonnic/Zonnic-life.webp",
  upperNote: "Mint-powered nicotine pouches to help you finally quit for good.",

  buttons: [
    {
      text: "Get Started",
      href: "/product/zonnic/",
      ariaLabel: "Opt1",
      width: "md:w-[152px]",
      color: "bg-[#03A670]  hover:bg-[#067a53]",
    },
  ],
};

const ZonnivCover = () => {
  return (
    <>
      <PageCover data={ZonnicCoverData} />
    </>
  );
};

export default ZonnivCover;
