const Payments = () => {
  return (
    <>
      {/* Payments */}
      <div id="payments" className="mb-10 md:mb-14">
        <div className="text-[32px] md:text-[40px] leading-[115%] tracking-[-0.01em] md:tracking-[-0.02em] mb-6 headers-font">
          Payments
        </div>

        <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400] mb-6">
          We may provide paid products and/or services within the Service. In
          that case, we may use third-party services for payment processing
          (e.g. payment processors).
        </p>
        <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400] mb-6">
          We will not store or collect Your payment card details. That
          information is provided directly to Our third-party payment processors
          whose use of Your personal information is governed by their Privacy
          Policy. These payment processors adhere to the standards set by
          PCI-DSS as managed by the PCI Security Standards Council, which is a
          joint effort of brands like Visa, Mastercard, American Express and
          Discover. PCI-DSS requirements help ensure the secure handling of
          payment information.
        </p>
        <div className="text-[22px] leading-[115%] tracking-[-0.01em] mb-6 headers-font">
          Send Grid
        </div>

        <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400] mb-6">
          Their Privacy Policy can be viewed at{" "}
          <a
            href="https://go.wepay.com/privacy-policy"
            className="duration-300 hover:text-gray-800 hover:underline"
          >
            https://go.wepay.com/privacy-policy
          </a>
        </p>
        <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400] ">
          When You use Our Service to pay a product and/or service via bank
          transfer, We may ask You to provide information to facilitate this
          transaction and to verify Your identity.
        </p>
      </div>
    </>
  );
};

export default Payments;
