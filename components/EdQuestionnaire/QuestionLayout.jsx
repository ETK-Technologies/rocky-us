import React from "react";

export const QuestionLayout = ({
  title,
  subtitle,
  children,
  currentPage,
  pageNo,
  questionId,
  inputType = "radio",
  headerStyle = {},
  subtitleStyle = {},
  isPopup = false,
}) => {
  if (currentPage !== pageNo) return null;

  return (
    <div
      className={`quiz-page quiz-question-${pageNo}  ${
        inputType === "radio" ? "hide-continue-button" : ""
      } quiz-page-${pageNo}`}
      data-pageno={pageNo}
      data-ques-no={pageNo}
      data-ques-id={questionId}
      data-input-type={inputType}
      suppressHydrationWarning={true}
    >
      <div className="quiz-heading-wrapper pt-6 ">
        <h2
          className="quiz-heading text-[26px] md:text-[32px] subheaders-font font-medium mb-2 md:mb-4 "
          style={headerStyle}
        >
          {title}
        </h2>
        {subtitle && (
          <h3
            className="quiz-subheading text-[16px] md:text-[18px] pt-2 mb-4 font-medium"
            style={{ color: "#AE7E56", ...subtitleStyle }}
          >
            {subtitle}
          </h3>
        )}
        <p className="error-box text-red-500 hidden m-2 text-center text-sm"></p>
      </div>

      <div className="quiz-options-wrapper flex flex-col flex-wrap items-start justify-start mb-6">
        {children}
      </div>

      {!isPopup && (
        <p className="text-left text-xs text-gray-400 subheaders-font mt-6 mb-4">
          We respect your privacy. All of your information is securely stored on
          our PIPEDA Compliant server.
        </p>
      )}
    </div>
  );
};
