const OrderNotes = ({ handleOrderNotesChange }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="customer_note"
        className="block text-[14px] leading-[19.6px] font-[500]  !text-[#212121] mb-2"
      >
        Order Notes (Optional)
      </label>
      <textarea
        onChange={handleOrderNotesChange}
        id="customer_note"
        name="customer_note"
        placeholder="Notes about your order, e.g. special notes for delivery."
        className="!resize-none !h-[80px] w-full !bg-white !rounded-[8px] !border !border-solid !border-[#E2E2E1] !px-[16px] py-[12px] h-[80px] md:h-[102px] !focus:outline-none !focus:border-gray-500"
      ></textarea>
    </div>
  );
};

export default OrderNotes;
