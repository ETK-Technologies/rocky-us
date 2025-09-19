import Link from "next/link";
import CustomImage from "../utils/CustomImage";
import { FaArrowRight } from "react-icons/fa";

const TreatmentDetail = ({ treatment, onBack, onClose }) => (
  <div className="flex flex-col h-full px-2 bg-white">
    <h2 className="headers-font align-middle py-4 px-[16px] text-[24px] md:px-[32px] ">
      {treatment.category}
    </h2>

    {/* Banner with overlayed assessment text and CTA */}
    <div className="relative bg-[#E8E4DF] rounded-[16px] my-4 mx-[16px] md:mx-[32px]">
      <div className="relative overflow-hidden rounded-[16px] w-full h-[216px] ">
        <div className="absolute left-0 bottom-0 w-full h-full z-10 [background:linear-gradient(rgba(0,0,0,0.8)_0%,rgba(0,0,0,0)_60.27%)]"></div>
        <CustomImage src={treatment.image} alt={treatment.category} fill />
      </div>

      <div className="absolute inset-0 flex flex-col justify-between p-10 z-30 ">
        <p className="text-white text-[20px] md:text-2xl align-middle capitalize headers-font max-w-[159px]  leading-[115%]">
          {treatment.assessmentText}
        </p>
        <Link
          prefetch={true}
          onClick={onClose}
          href={treatment.treatments[0]?.quizLink}
          className="z-20 bg-white rounded-full w-[24px] h-[24px] flex items-center justify-center "
        >
          <FaArrowRight className="text-black " />
        </Link>
      </div>
    </div>

    <div className="flex-1 pb-10">
      {/* Treatments Section */}
      {treatment.treatments && (
        <Section
          title="Treatments"
          items={treatment.treatments}
          arrow
          card
          onClose={onClose}
        />
      )}
      {/* Medications Section */}
      {/* {treatment.medications && (
        <Section
          title="Medications"
          items={treatment.medications}
          badge="Rx"
          medList
          onClose={onClose}
        />
      )} */}
      {/* Premature Ejaculation Section */}
      {/* {treatment.prematureEjaculation && (
        <Section
          title="Premature Ejaculation"
          items={treatment.prematureEjaculation}
          card
          onClose={onClose}
        />
      )} */}
      {/* Supplement Support Section */}
      {treatment.supplements && (
        <Section
          title="Supplement Support"
          items={treatment.supplements}
          card
          onClose={onClose}
        />
      )}
    </div>
  </div>
);

const Section = ({ title, items, badge, arrow, card, medList, onClose }) => (
  <div>
    <div className="flex gap-2 items-center">
      <h3 className="py-4 pl-[16px] md:pl-[32px] font-medium text-xs md:text-sm tracking-normal align-middle text-[#00000099] uppercase flex items-center gap-2">
        {title}
      </h3>
      {badge && (
        <span className="w-[36px] h-[20px] bg-[#FFFFFF] rounded-[63px] px-[10px] text-[14px] font-semibold text-[#000000] shadow-[0px_0px_8px_0px_#00000029]">
          {badge}
        </span>
      )}
    </div>
    <ul>
      {items.map((item, i) => (
        <li key={i}>
          {card && title === "Treatments" ? (
            <div>
              <Link
                prefetch={true}
                onClick={onClose}
                href={item.link}
                className="px-[16px] md:px-[32px] block py-[24px] font-medium text-base md:text-xl tracking-normal align-middle flex items-center justify-between hover:bg-[#F5F4EF] hover:rounded-[16px] transition"
              >
                <span>{item.text}</span>
                {arrow && <FaArrowRight />}
              </Link>
              {arrow && (
                <div className="w-full px-[16px] md:px-[32px] ">
                  <hr className="h-[1px] w-full my-1" />
                </div>
              )}
            </div>
          ) : (
            <Link
              prefetch={true}
              onClick={onClose}
              href={item.link}
              className="px-[16px] md:px-[32px] flex items-center gap-2 py-4 md:py-[24px] rounded hover:bg-[#F5F4EF] hover:rounded-[16px] text-base font-medium"
            >
              <span>{item.text}</span>
            </Link>
          )}
        </li>
      ))}
    </ul>
  </div>
);

export default TreatmentDetail;
