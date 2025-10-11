export default function RefundProcessingFee() {
  return (
    <div id="refund-processing-fee" className="mb-10 md:mb-14">
      <div className="text-[22px] md:text-[30px] leading-[115%] tracking-[-0.01em] md:tracking-[-0.02em] mb-4 md:mb-6 headers-font">
        Refund Processing Fee
      </div>
      <p className="text-[16px] md:text-[18px] leading-[160%] font-[400] text-[#000000D9] mb-6">
        In cases where a payment has already been processed and a refund is
        subsequently requested and approved, a <b> 2.5% processing fee</b> will
        be deducted from the refunded amount. This fee covers non-recoverable
        transaction costs incurred during payment processing. The balance, net
        of this fee, will be returned to the original payment method.
      </p>
    </div>
  );
}
