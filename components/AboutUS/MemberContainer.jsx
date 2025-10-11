import MemberCard from "./MemberCard";

const MemberContainer = ({ title, teamMembers}) => {
  return (
    <>
       <div className=" flex-col justify-start items-center gap-8 md:gap-14 flex">
          <div className="text-center text-black text-[22px] md:text-3xl headers-font capitalize leading-[33px]">
            {title}
          </div>
          <div className="w-full">
            <div className="mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 flex-wrap">
              {teamMembers.map((member, index) => (
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
    </>
  );
}

export default MemberContainer;