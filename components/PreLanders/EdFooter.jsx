import Link from "next/link";

const EdFooter = () => {
  return (
    <>
      <footer className="bg-black text-[#efe7df] p-4 text-center">
        <img
          src="https://myrocky.b-cdn.net/WP%20Images/Sexual%20Health/webp-images/Logo.webp"
          className=" w-[180px]  mx-auto my-4"
        />
        <img
          src="/ed-prelander-5/ed-footer.png"
          className="w-[74px] h-[64px] mx-auto my-4"
        />

        <Link
          key="0"
          href="/terms-of-use/"
          className="underline text-xl hover:underline min-w-fit mr-4"
        >
          Terms of Use
        </Link>

        <Link
          key="1"
          href="/privacy-policy/"
          className="underline text-xl hover:underline min-w-fit"
        >
          Privacy Policy
        </Link>
        <hr className="mt-8 mb-4 w-[80%] ml-[10%] border-[#AEAEAE]" />
        <p className="text-[#AEAEAE]">
          ©2024 Rocky Health Inc. All rights reserved. Rocky Health Pharmacy
          Inc. & Rocky Health Clinic Inc. are subsidiaries of Rocky Health Inc.
        </p>
      </footer>
    </>
  );
};

export default EdFooter;
