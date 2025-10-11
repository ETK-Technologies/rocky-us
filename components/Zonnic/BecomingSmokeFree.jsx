import AccordionList from "../AccordionList";
import ImageWithList from "@/components/ImageWithList";

const accordionData = [
  {
    title: "Why ZONNIC?",
    content:
      "ZONNIC is a form of Nicotine Replacement Therapy. It can help you quit smoking by delivering nicotine to your body, temporarily relieving cravings and nicotine withdrawal symptoms.",
    image: null,
  },
  {
    title: "How does ZONNIC work?",
    content:
      "ZONNIC delivers measured doses of nicotine through small pouches placed under your lip. The nicotine is gradually absorbed, helping reduce cravings and withdrawal symptoms while you work toward becoming smoke-free. Each pouch provides relief for up to 60 minutes, with recommended use of 8-12 pouches per day",
    image: null,
  },
  {
    title: "How does ZONNIC help smokers?",
    content:` <div class="accordion-content pb-4 text-[16px] leading-[24px]">
        <p>
          ZONNIC is specifically designed for smokers who are motivated to quit
          or reduce their tobacco use. It helps manage nicotine withdrawal
          symptoms like:
        </p>
        <ul class="list-disc mt-5 pl-5 mb-5">
          <li>Intense cravings</li>
          <li>Irritability</li>
          <li>Difficulty concentrating</li>
          <li>Restlessness</li>
        </ul>
        <p>This allows you to focus on breaking the habit while managing withdrawal.</p>
      </div>`,
    image: null,
  },
  {
    title: "What are ZONNIC’s ingredients?",
    content: `<div class="max-w-xl mx-auto">
        <p class="md:text-[16px] text-[14px] mb-4">
          We believe you deserve to know exactly what's in your pouch. Each
          ZONNIC pouch is made with a short list of carefully selected,
          high-quality ingredients:
        </p>

        <ul class="list-disc pl-5 space-y-2 text-sm">
          <li>
            <strong class="font-semibold">Nicotine:</strong> the active
            ingredient that helps manage cravings and withdrawal symptoms.
          </li>
          <li>
            <strong class="font-semibold">Plant-based fibres:</strong> a
            natural filler that gives the pouch its soft texture and
            comfortable fit under your lip.
          </li>
          <li>
            <strong class="font-semibold">Water:</strong> keeps the pouch
            moist and effective while you use it.
          </li>
          <li>
            <strong class="font-semibold">Flavourings:</strong> food-grade
            flavouring agents that provide a clean, refreshing taste.
          </li>
          <li>
            <strong class="font-semibold">Sweetener:</strong> a light,
            balanced sweetness to improve the experience without adding sugar.
          </li>
        </ul>
        <p class="mt-4 md:text-[16px] text-[14px]">
        That's it. No tobacco leaf, no combustion, and no unnecessary additives- just a clean, modern format designed to deliver nicotine in a controlled and discreet way.
        </p>
      </div>`,
    image: null,
  },
];
const BecomingSmokeFree = () => {
  return (
    <>
      <div className="mx-auto text-center mb-8 md:mb-14">
        <h3 className="capitalize text-[32px] font-[550] md:text-[48px] leading-9 md:leading-[54px] headers-font max-w-[610px] mx-auto ">
          Smart aid in your journey to becoming smoke-free
        </h3>
        <p className="mt-4 text-[16px] lg:text-[20px] font-[400] leading-[22.4px] tracking-[-0.02em] mx-auto max-w-[255px] lg:max-w-full">
          Digital Healthcare without the long wait times.
        </p>
      </div>

      <ImageWithList image="/zonic/zonnic-wt-hands-2.png" imagePosition="left">
        <AccordionList data={accordionData} />
      </ImageWithList>
    </>
  );
};

export default BecomingSmokeFree;
