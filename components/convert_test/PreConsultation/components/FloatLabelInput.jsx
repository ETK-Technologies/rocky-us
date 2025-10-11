const FloatLabelInput = ({
  label,
  value,
  onChange,
  onBlur,
  type = "text",
  name,
  required = false,
  disabled = false,
  readonly = false,
  className = "",
  error = "",
}) => {
  return (
    <div className="relative">
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
        required={required}
        disabled={disabled}
        readOnly={readonly}
        placeholder=" "
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`peer text-[14px] text-black w-full h-[60px] border rounded-lg px-4 pt-6 pb-2 font-medium  bg-white focus:outline-none ${error ? 'border-red-500' : 'border-[#0000001F]'} ${className}`}
      />
      <label
        htmlFor={name}
        className="absolute left-4 top-2 text-[12px] leading-[140%] text-[#00000059] pointer-events-none transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-[16px] peer-focus:top-2 peer-focus:text-[12px]"
      >
        {label || "Label"}
      </label>
      {error ? (
        <p id={`${name}-error`} className="text-red-500 text-[12px] mt-1">
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default FloatLabelInput;
