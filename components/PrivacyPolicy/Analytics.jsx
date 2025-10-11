const Analytics = () => {
  return (
    <>
      {/* Analytics */}
      <div id="analytics" className="mb-10 md:mb-14">
        <div className="text-[32px] md:text-[40px] leading-[115%] tracking-[-0.01em] md:tracking-[-0.02em] mb-6 headers-font">
          Analytics
        </div>

        <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400]  mb-6">
          We may use third-party Service providers to monitor and analyze the
          use of our Service.
        </p>
        <div className="text-[22px] leading-[115%] tracking-[-0.01em] mb-6 headers-font">
          Google Analytics
        </div>

        <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400] mb-6">
          Google Analytics is a web analytics service offered by Google that
          tracks and reports website traffic. Google uses the data collected to
          track and monitor the use of our Service. This data is shared with
          other Google services. Google may use the collected data to
          contextualize and personalize the ads of its own advertising network.
        </p>
        <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400] mb-6">
          You can opt-out of having made your activity on the Service available
          to Google Analytics by installing the Google Analytics opt-out browser
          add-on. The add-on prevents the Google Analytics JavaScript (ga.js,
          analytics.js and dc.js) from sharing information with Google Analytics
          about visits activity.
        </p>
        <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400] ">
          For more information on the privacy practices of Google, please visit
          the Google Privacy & Terms web page:{" "}
          <a
            href="https://policies.google.com/privacy"
            className="duration-300 hover:text-gray-800 hover:underline"
          >
            https://policies.google.com/privacy
          </a>
        </p>
      </div>
    </>
  );
};

export default Analytics;
