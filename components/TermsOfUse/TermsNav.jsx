"use client";

export default function TermsNav({ sections = [] }) {
  if (!sections || sections.length === 0) {
    return null; // Don't show navigation if no sections
  }

  return (
    <div className="w-[280px] space-y-3">
      <h3 className="text-[18px] font-[600] mb-4">Table of Contents</h3>
      <ul className="space-y-3">
        {sections.map((section, index) => (
          <li
            key={section.id}
            className={`text-[16px] font-[400] leading-[140%] text-[#000000A6] hover:underline hover:font-[600] transition-all ${
              index === 0 ? "font-[600] text-black underline" : ""
            }`}
          >
            <a href={`#${section.id}`} className="block">
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
