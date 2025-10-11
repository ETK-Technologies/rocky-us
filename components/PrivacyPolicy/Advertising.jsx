const Advertising = () => {
  return (
    <>
      {/* Advertising */}
      <div id="advertising" className="mb-10 md:mb-14">
        <div className="text-[32px] md:text-[40px] leading-[115%] tracking-[-0.01em] md:tracking-[-0.02em] mb-6 headers-font">
          Advertising
        </div>

        <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400]  mb-6">
          We may use Service Providers to show advertisements to You to help
          support and maintain Our Service.
        </p>
        <div className="text-[22px] leading-[115%] tracking-[-0.01em] mb-6 headers-font">
          Google AdSense & DoubleClick Cookie
        </div>

        <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400] mb-6">
          Google, as a third party vendor, uses cookies to serve ads on our
          Service. Google’s use of the DoubleClick cookie enables it and its
          partners to serve ads to our users based on their visit to our Service
          or other websites on the Internet.
        </p>
        <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400] ">
          You may opt out of the use of the DoubleClick Cookie for
          interest-based advertising by visiting the Google Ads Settings web
          page:{" "}
          <a
            href="http://www.google.com/ads/preferences/"
            className="duration-300 hover:text-gray-800 hover:underline"
          >
            http://www.google.com/ads/preferences/
          </a>
        </p>
      </div>
    </>
  );
};

export default Advertising;
