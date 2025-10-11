const ContactUs = () => {
  return (
    <>
      {/* Contact Us */}
      <div id="contact-us" className="mb-10 md:mb-14">
        <div className="text-[32px] md:text-[40px] leading-[115%] tracking-[-0.01em] md:tracking-[-0.02em] mb-6 headers-font">
          Contact Us
        </div>

        <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400] mb-6">
          If you have any questions about this Privacy Policy, You can contact
          us:
        </p>
        <ul className="list-disc ml-6 md:ml-8">
          <li>
            <span className="font-[600] opacity-100 mt-4 mb-4">By email: </span>
            <a
              href="mailto:contact@myrocky.ca"
              className="hover:underline hover:text-gray-900 duration-300"
            >
              contact@myrocky.ca
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ContactUs;
