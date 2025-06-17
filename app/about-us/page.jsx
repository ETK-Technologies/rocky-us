"use client";

import MemberCard from "@/components/AboutUS/MemberCard";
import TeamCard from "@/components/AboutUS/TeamCard";
import HomeFaqsSection from "@/components/HomePage/HomeFaqsSection";
import CustomImage from "@/components/utils/CustomImage";
import Section from "@/components/utils/Section";
import { useRef, useState, useEffect } from "react";

import { FaPlay, FaPause } from "react-icons/fa6";

const leadershipTeam = [
  {
    name: "Dr. George Mankaryous",
    title: "M.D. CCFP",
    subtitle: "Chief Executive Officer",
    description:
      "Dr. Mankaryous is a licensed family doctor in both Canada and the UK, with a strong commitment to evidence-based medicine. He empowers patients by providing them with the information needed to make informed decisions about their health. Integrating a functional medicine approach, Dr. Mankaryous focuses on identifying and addressing the root causes of disease, offering a comprehensive and personalized care experience. His blend of scientific rigor and holistic care makes him a valuable asset to our leadership team.",
    imageSrc: "https://myrocky.b-cdn.net/team-members/george.jpg",
    CoverImage:
      "https://myrocky.b-cdn.net/team-members/DrGeorgeMankaryous.webp",
    index: 0,
  },
  {
    name: "Mina Rizk",
    title: "R.Ph. MPharm",
    subtitle: "Chief Operating Officer & Chief Pharmaceutical Officer",
    description:
      "Mina is a licensed pharmacist in Ontario and British Columbia, with a Master’s degree in Pharmacy from the UK. He has extensive experience in community pharmacy, including owning and operating several pharmacies in Ontario. His background in both managing pharmacies and providing patient care brings a comprehensive understanding of the healthcare landscape, making him well-versed in the healthcare space and a valuable asset to our leadership team.",
    imageSrc: "https://myrocky.b-cdn.net/team-members/mina-rizk.png",
    CoverImage: "https://myrocky.b-cdn.net/team-members/MinaRizk.webp",
  },
  {
    name: "Aba Anton",
    title: "MPharm",
    subtitle: "Chief Executive Officerr",
    description:
      "Aba earned his Master’s degree in Pharmacy from the UK and gained valuable experience which leverages his entrepreneurial background to drive innovation in healthcare. Focused on modernizing outdated practices, Aba is dedicated to bridging the gap between patient needs and accessibility. His commitment to improving healthcare delivery through strategic advancements makes him a valuable addition to our leadership team.",
    imageSrc: "https://myrocky.b-cdn.net/team-members/aba-aanton.jpg",
    CoverImage: "https://myrocky.b-cdn.net/team-members/AbaAnton.webp",
  },
];

const medicalTeam = [
  {
    name: "Dr. Mena Mirhom",
    title: "M.D. FAPA",
    image: "https://myrocky.b-cdn.net/team-members/Mena-Mirhom.webp",
    description:
      "Dr. Mirhom is a Columbia-trained, board-certified psychiatrist. He is an Assistant Professor of Psychiatry in Columbia University. He completed his adult psychiatry training in the Mount Sinai Health System and his fellowship in Columbia University Medical Center. He currently teaches public psychiatry fellows in Columbia University and is a renowned national speaker on mental health and wellness. He is also a consultant for the NBPA (National Basketball Player Association) to assist NBA players and staff with mental health needs.",
  },
  {
    name: "Corey Wideman",
    title: "Nurse Practitioner",
    image: "https://myrocky.b-cdn.net/team-members/corey.webp",
    description:
      "Corey graduated from the Master of Nursing program at the University of Toronto in 2020. Since then, he has worked in community-based clinics where he provides primary healthcare services. He is passionate about improving healthcare accessibility by leveraging technology to provide care through virtual platforms.",
  },
  {
    name: "Tawanda Nyamukondiwa",
    title: "Nurse Practitioner",
    image: "https://myrocky.b-cdn.net/team-members/Tawanda.webp",
    description:
      "Tawanda Nyamukondiwa is a seasoned Nurse Practitioner with extensive experience and specialization in family medicine, health promotion, and occupational health. He is dedicated to delivering patient-centered care and is passionate about making a positive impact in patients' lives through a personal approach. By leveraging his diverse skills and rich experience, Tawanda ensures comprehensive care for patients of all ages.",
  },
  {
    name: "Josh Belanger",
    title: "Nurse Practitioner",
    image: "https://myrocky.b-cdn.net/team-members/johua_square_dark.webp",
    description:
      "Josh Belanger is a dedicated Primary Care Nurse Practitioner who specializes in providing comprehensive healthcare at a nurse practitioner-led clinic. In addition to his primary care duties, he offers vital support to rural Emergency Rooms, delivering critical care to patients with varying acuity levels. With over a decade of experience in emergency room and cardiac cath lab settings as a Registered Nurse, Josh is deeply committed to enhancing primary care accessibility and championing wellness initiatives by addressing systemic and social barriers.",
  },
  {
    name: "Pamela Bridgen",
    title: "Nurse Practitioner",
    image: "https://myrocky.b-cdn.net/team-members/pamela.webp",
    description:
      "Pamela Bridgen is a seasoned Nurse Practitioner with 15 years of experience in primary care, specializing in medical weight loss. Combining clinical expertise with compassionate care, she empowers patients to achieve their health goals through tailored treatment plans and lifestyle modifications. Her dedication to improving patient well-being extends beyond medical intervention, fostering long-term wellness and sustainable habits.",
  },
  // {
  //   name: "Annivy",
  //   title: "Nurse Practitioner",
  //   image: "https://myrocky.b-cdn.net/team-members/annivy.jpeg",
  //   description: "...",
  // },
];

const pharmaceuticalTeam = [
  {
    name: "Matthew Michael",
    title: "R.Ph. PharmD MBA",
    image: "https://myrocky.b-cdn.net/team-members/matthew.webp",
    description:
      "Matthew earned a Doctor of Pharmacy and MBA in Healthcare Management from Boston. He is a licensed pharmacist in Ontario. His background in corporate and community pharmacy and healthcare administration brings a unique blend of expertise to our team. His dedication to innovative healthcare solutions along with his management skills & expertise continue to drive our mission forward.",
  },
  {
    name: "Mariam Mirhom",
    title: "R.Ph. PharmD",
    image: "https://myrocky.b-cdn.net/team-members/Mariam_dark.webp",
    description:
      "Mariam is a Doctorate of Pharmacy Graduate minoring in Pharmaceutical Sales & Marketing. She has worked closely with patients in several hospitals including DENT Neurology, Rochester General, & Albany Medical Centre. Mariam continues her work in pharmaceutical research while simultaneously providing the best possible healthcare for her patients.",
  },
  {
    name: "Perihan Koussa",
    title: "R.Ph. PharmD",
    image: "https://myrocky.b-cdn.net/team-members/Peri.webp",
    description:
      "Peri graduated with a Doctorate of Pharmacy from MCPHS University in Boston. She is licensed in Ontario and practices as a retail pharmacist. She is passionate about mental health and volunteers weekly at the Center for Addiction and Mental Health (CAMH) in Toronto. She also has startup experience interning at PillPack. Peri brings forth extensive knowledge in various areas of pharmacy.",
  },
  {
    name: "Mario Saad",
    title: "Fulfilment Coordinator",
    image: "https://myrocky.b-cdn.net/team-members/mario.webp",
    description:
      "Mario is our Fulfillment Coordinator, bringing a keen eye for detail and a commitment to efficiency from his background in police college. With a strong foundation in organization and logistics, he ensures that our telehealth services are delivered seamlessly to our clients. His unique perspective helps our team maintain the highest standards of service and reliability.",
  },
  {
    name: "Roudy Abdelsalam",
    title: "Logistics & Marketing Coordinator",
    image: "https://myrocky.b-cdn.net/team-members/Roudy.webp",
    description:
      "Roudy excels as a Logistics and Marketing Coordinator, merging her advertising and marketing experience with strong organizational skills. Her market insight and consumer knowledge help her create effective promotional strategies, while her logistical expertise ensures smooth operations. By blending creative marketing with efficient logistics, Roudy enhances brand visibility and optimizes workflows, driving success and growth.",
  },
];

export default function AboutUs() {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = scrollRef.current;

    const handleScroll = () => {
      if (!container) return;

      const scrollLeft = container.scrollLeft;
      const containerWidth = container.offsetWidth;
      const scrollWidth = container.scrollWidth;

      const cardCount = leadershipTeam.length;

      const totalScrollable = scrollWidth - containerWidth;
      const percentageScrolled = scrollLeft / totalScrollable;
      const estimatedIndex = Math.round(percentageScrolled * (cardCount - 1));

      setActiveIndex(estimatedIndex);
    };

    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <section className="max-w-[1184px] mx-auto">
        <div className="px-5 sectionWidth:px-0 py-6 md:pt-16 md:pb-14 ">
          <div className="text-[#AE7E56] text-[12px] md:text-[14px] font-[500] uppercase mb-1 md:mb-2">
            Mission
          </div>
          <div className="text-[32px] md:text-[48px] tracking-[-0.01em] md:tracking-[-0.02em] leading-[115%] md:leading-[100%] max-w-[684px] capitalize headers-font mb-3 md:mb-4">
            We’re on a mission to redefine men's healthcare
          </div>
          <div className="text-[16px] md:text-[18px] font-[400] leading-[140%] md:max-w-[591px] ">
            By normalizing it; making it personalized and seamless—without the
            wait times and stigma surrounding it. Making it as should be.
          </div>
        </div>
        <div className="relative overflow-hidden md:rounded-[16px] w-full h-[214px] md:h-[665px] md:pb-24 ">
          <video
            ref={videoRef}
            loop
            muted
            autoPlay
            playsInline
            className="w-full h-full object-cover md:rounded-[16px]"
          >
            <source
              src="https://rockywp.s3.ca-central-1.amazonaws.com/wp-content/uploads/video/Rockyhealth-Ad-V1.mp4"
              type="video/mp4"
            />
          </video>
          {/* <button
            onClick={togglePlay}
            className="absolute left-2 bottom-2 md:bottom-[110px] text-white p-3 rounded-full transition-colors"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? <FaPause size={30} /> : <FaPlay size={30} />}
          </button> */}
        </div>
      </section>
      <Section bg="bg-[#F8F7F5]">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-20 ">
          <div className="max-w-[552px]">
            <div className="text-[#AE7E56] text-[12px] md:text-[14px] font-[500] uppercase mb-1 md:mb-2">
              Goal
            </div>
            <div className="text-[32px] md:text-[48px] tracking-[-0.01em] md:tracking-[-0.02em] leading-[115%] md:leading-[100%] max-w-[684px] capitalize headers-font mb-4">
              A patient-centered approach.
            </div>
            <div className="text-[16px] md:text-[18px] font-[400] leading-[140%] md:max-w-[591px] ">
              rocky™ builds a relationship around trust, privacy, and discretion
              with men of various ages facing similar hurdles. Together, we
              provide a range of options that will ensure men are taking care of
              themselves.
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden w-full h-[335px] md:w-[552px] md:h-[640px]">
            <CustomImage
              fill
              src="https://myrocky.b-cdn.net/WP%20Images/Global%20Images/under-cover-about-us.jpeg"
            />
          </div>
        </div>
      </Section>
      <Section>
        <div className="flex-col justify-start items-center gap-4 flex">
          <div className="text-center mb-10 md:mb-14">
            <div className="text-[#AE7E56] text-[12px] md:text-[14px] font-[500] uppercase mb-1 md:mb-2">
              Focus
            </div>
            <div className="text-[32px] md:text-[48px] tracking-[-0.01em] md:tracking-[-0.02em] leading-[115%] md:leading-[100%] max-w-[684px] capitalize headers-font mb-3 md:mb-4">
              Our Team <br className="md:hidden" /> Has You Covered
            </div>
            <div className="text-[16px] font-[400] leading-[140%] w-[307px] md:hidden">
              The rocky™ brand name portrays a triumphant and conquering man who
              is confident in everything he does. By providing solutions for
              prevalent matters, we help enhance the image of the male persona.
            </div>
            <div className="text-[18px] font-[400] leading-[140%] max-w-[632px] hidden md:block ">
              The rocky™ brand name portrays a triumphant and conquering man who
              is confident in everything he does. By providing effective
              treatments that works with his schedule, not the other way around
              it.
            </div>
          </div>
        </div>
        <div className="text-center text-black text-[22px] md:text-[30px] headers-font capitalize leading-[33px]  ">
          Leadership Team
        </div>
        <div
          ref={scrollRef}
          className="w-full md:items-center md:gap-4 overflow-x-auto overflow-y-hidden mt-[-70px] md:mt-[-40px] no-scrollbar"
        >
          {/* <div className="flex text-center gap-[-20px] md:gap-4 mt-[24px] px-5 sectionWidth:px-0">
            {leadershipTeam.map((member, index) => (
              <TeamCard
                key={index}
                name={member.name}
                title={member.title}
                subtitle={member.subtitle}
                description={member.description}
                imageSrc={member.imageSrc}
                CoverImage={member.CoverImage}
              />
            ))}
          </div> */}
          <div className="flex text-center mt-[24px] px-6 sectionWidth:px-0">
            {leadershipTeam.map((member, index) => (
              <div key={index} className={index !== 0 ? "-ml-16 md:ml-0" : ""}>
                <TeamCard {...member} index={index} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-1 mt-8 md:hidden">
          {leadershipTeam.map((_, index) => (
            <span
              key={index}
              className={`w-[6px] h-[6px] rounded-full transition-colors ${
                index === activeIndex ? "bg-black" : "bg-[#00000033]"
              }`}
            />
          ))}
        </div>
      </Section>
      <Section>
        <div className=" flex-col justify-start items-center gap-8 md:gap-14 flex">
          <div className="text-center text-black text-[22px] md:text-3xl headers-font capitalize leading-[33px]">
            Medical advisory team
          </div>
          <div className="w-full">
            <div className="mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 flex-wrap">
              {medicalTeam.map((member, index) => (
                <MemberCard
                  key={index}
                  name={member.name}
                  title={member.title}
                  image={member.image}
                  description={member.description}
                />
              ))}
            </div>
          </div>
        </div>
      </Section>
      <Section>
        <div className="flex-col justify-start items-center gap-8 md:gap-14 flex">
          <div className="text-center text-black text-[22px] md:text-3xl headers-font capitalize leading-[33px]">
            Pharmaceutical Advisory Team
          </div>
          <div className="w-full">
            <div className="mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 flex-wrap">
              {pharmaceuticalTeam.map((member, index) => (
                <MemberCard
                  key={index}
                  name={member.name}
                  title={member.title}
                  image={member.image}
                  description={member.description}
                />
              ))}
            </div>
          </div>
        </div>
      </Section>
      <Section bg="bg-[#F8F7F5]">
        <HomeFaqsSection />
      </Section>
    </>
  );
}
