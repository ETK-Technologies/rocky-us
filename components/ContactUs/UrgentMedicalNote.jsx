export default function UrgentMedicalNote() {
  return (
    <div className="mt-6 md:mt-8 px-5 py-8 md:py-8 rounded-[16px] text-center border border-[#E2E2E1] shadow-[0px_1px_1px_0px_#E2E2E1] bg-[linear-gradient(268.59deg,#FFFFFF_-9.74%,#FAFAF8_65.81%)]">
      <p className="text-[20px] md:text-[24px] leading-[115%] font-[500] md:font-[450] mb-4 headers-font">
        For Urgent Medical Inquiries.
      </p>
      <p className="text-[14px] md:text-[16px] leading-[140%] font-[400]">
        Please contact your local walk-in clinic, attend the nearest
        emergency department or dial
        <a href="tel:+911" className="font-[500] underline ml-1">
          911.
        </a>
      </p>
    </div>
  );
} 