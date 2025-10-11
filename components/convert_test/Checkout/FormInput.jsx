const FormInput = ({
  title,
  name,
  type = "text",
  placeholder,
  required,
  error,
  className = "",
  ...props
}) => {
  const hasError = !!error;

  return (
    <div className="mb-4 md:mb-0 w-full">
      <label
        htmlFor={name}
        className="block text-[14px] leading-[19.6px] font-[500] text-[#212121] mb-2"
      >
        {title}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        className={`w-full !bg-white !rounded-[8px] !border !border-solid !px-[16px] py-[12px] h-[44px] !focus:outline-none ${
          hasError
            ? "!border-red-500 focus:!border-red-600"
            : "!border-[#E2E2E1] !focus:border-gray-500"
        } ${className}`}
        {...props}
      />
      {hasError && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;
