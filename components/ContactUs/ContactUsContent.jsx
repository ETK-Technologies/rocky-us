import ContactUsDetails from "@/components/ContactUs/ContactUsDetails";
import UrgentMedicalNote from "@/components/ContactUs/UrgentMedicalNote";

export default function ContactUsContent() {
  return (
    <div className="px-5 pt-6 md:pt-8 mb-5 sectionWidth:px-0 ">
      <div className="max-w-[1184px] mx-auto">
        <ContactUsDetails />
        <UrgentMedicalNote />
      </div>
    </div>
  );
}
