"use client";

/**
 * A reusable step navigation component for multi-step flows
 *
 * @param {Object} props Component props
 * @param {number} props.currentStep Current active step
 * @param {number} props.totalSteps Total number of steps in the flow
 * @param {string[]} props.stepLabels Optional array of labels for each step
 * @param {Function} props.onStepClick Optional callback when a step is clicked
 * @param {string} props.activeColor HEX color for active steps
 * @param {string} props.inactiveColor HEX color for inactive steps
 * @param {string} props.className Additional classes
 * @returns {JSX.Element} Step navigation component
 */
const StepNavigation = ({
  currentStep = 1,
  totalSteps = 3,
  stepLabels = [],
  onStepClick,
  activeColor = "#AE7E56",
  inactiveColor = "#E5DED7",
  className = "",
}) => {
  // Handler for step clicks if they should be clickable
  const handleStepClick = (stepNumber) => {
    if (onStepClick) {
      onStepClick(stepNumber);
    }
  };

  return (
    <div>
      {/* Step navigation bar */}
      <div className="flex border-t border-[#B39F83]">
        <div className="flex-1 text-center py-4 text-[#75706A] border-b-[3px] border-[#ae7e56]">
          <span className="text-sm">YOUR PLAN</span>
        </div>
        <div className="flex-1 text-center py-4 bg-white text-black font-medium relative border-b-[3px] border-[#3d3d3d]">
          <span className="text-sm">ACCOUNT</span>
        </div>
        <div className="flex-1 text-center py-4 text-[#75706A] border-b-[3px] border-[#3d3d3d]">
          <span className="text-sm">CHECKOUT</span>
        </div>
      </div>
    </div>
  );
};

export default StepNavigation;
