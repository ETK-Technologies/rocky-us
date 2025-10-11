const EmailMarketing = () => {
  return (
    <>
      {/* Email Marketing */}
      <div id="email-marketing" className="mb-10 md:mb-14">
        <div className="text-[32px] md:text-[40px] leading-[115%] tracking-[-0.01em] md:tracking-[-0.02em] mb-6 headers-font">
          Email Marketing
        </div>

        <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400]">
          We may use Your Personal Data to contact You with newsletters,
          marketing or promotional materials and other information that may be
          of interest to You. You may opt-out of receiving any, or all, of these
          communications from Us by following the unsubscribe link or
          instructions provided in any email We send or by contacting Us.
        </p>
        <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400] mb-6">
          We may use Email Marketing Service Providers to manage and send emails
          to You.
        </p>
        <div className="text-[22px] leading-[115%] tracking-[-0.01em] mb-6 headers-font">
          Klavyo
        </div>

        <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400] mb-6">
          Clavio is an email marketing sending service provided by The Rocket
          Science Group LLC.
        </p>
        <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400] ">
          For more information on the privacy practices of Clavio, please visit
          their Privacy policy:{" "}
          <a
            href="https://mailchimp.com/legal/privacy/"
            className="duration-300 hover:text-gray-800 hover:underline"
          >
            https://mailchimp.com/legal/privacy/
          </a>
        </p>
      </div>
    </>
  );
};

export default EmailMarketing;
