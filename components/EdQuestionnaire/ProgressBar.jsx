import React from "react";

export const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full md:w-[520px] px-5 md:px-0 mx-auto">
      <div className="progress-indicator mb-2 text-[#A7885A] font-medium">
        <span className="text-sm">{progress == "0" ? 0 : progress}% complete</span>
      </div>
      <div className="progress-bar-wrapper w-full block h-[8px] my-1 rounded-[10px] bg-gray-200">
        <div
          style={{ width: `${progress == "0" ? 0 : progress}%` }}
          className="progress-bar bg-[#A7885A] rounded-[10px] block float-left h-[8px]"
        ></div>
      </div>
    </div>
  );
};
