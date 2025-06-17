import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function StepSection({ index, onInViewChange, children }) {
  const { ref, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      onInViewChange(index);
    }
  }, [inView, index, onInViewChange]); // No need for activeStep in deps

  return (
    <div
      ref={ref}
      className="flex items-start justify-between gap-3 md:gap-12 snap-start !h-full md:!h-[680px]"
    >
      {children}
    </div>
  );
}
