import classNames from "classnames";

export default function VerticalLine({ index, isActive }) {
  return (
    <div className="flex flex-col items-center gap-2">
      {/* Circle */}
      <div
        className={classNames(
          "w-6 h-6 rounded-full border-2 transition-all duration-500",
          isActive
            ? "border-[#AE7E56] bg-[#AE7E56]"
            : "border-[#D9D9D9] bg-[#D9D9D9]"
        )}
      />

      {/* Vertical Border */}
      {index !== 2 && (
        <div
          className={`${
            isActive ? "vertical-line-active" : "vertical-line-inactive"
          } w-[2px] h-[680px] bg-repeat-y `}
        />
      )}
    </div>
  );
}
