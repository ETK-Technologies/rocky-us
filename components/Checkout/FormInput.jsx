const FormInput = ({
  title,
  name,
  type = "text",
  placeholder,
  required,
  ...props
}) => {
  return (
    <div className="mb-4 md:mb-0 w-full">
      <label
        htmlFor={name}
        className="block text-[14px] leading-[19.6px] font-[500] text-[#212121] mb-2"
      >
        {title}
        {required && "*"}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        className="w-full !bg-white !rounded-[8px] !border !border-solid !border-[#E2E2E1] !px-[16px] py-[12px] h-[44px] !focus:outline-none !focus:border-gray-500"
        {...props}
      />
    </div>
  );
};

export default FormInput;
