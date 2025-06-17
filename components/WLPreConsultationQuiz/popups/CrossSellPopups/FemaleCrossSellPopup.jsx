import React from "react";
import CrossSellPopup from "./CrossSellPopupBase";

// Female-specific add-on products
const femaleAddOnProducts = [
  {
    id: "323511", // Ovulation Test Kit
    name: "Ovulation Test Kit",
    price: "20.00",
    imageUrl:
      "https://mycdn.myrocky.ca/wp-content/uploads/20240906110139/LH-Box.png",
    bulletPoints: [
      "Helps identify most fertile period for pregnancy with 99% accuracy",
      "Urine test",
      "10 testing strips",
    ],
    showInfoIcon: true,
    faqContent: `
      <p class="mb-4"><strong>Q: When should I use this test?</strong><br>
        A: If you have 28 day cycles, test between days 10 to 18. Day one is the first day of your period. If your cycle is different, use this formula (length of your cycle - 28 + 10). For example, a 22 day cycle - 28 + 10 = day 4 to 12.</p>
      <p class="mb-4"><strong>Q: What time of the day should I perform the test?</strong><br>
        A: The test can be performed at any time of the day; however, first morning urine is not recommended. You should also reduce fluid intake for 2 hours before testing so your urine is more concentrated.</p>
      <p class="mb-4"><strong>Q: When should I stop testing?</strong><br>
        A: Stop testing once your test is positive, unless advised otherwise by your doctor.</p>
    `,
  },
  {
    id: "323512", // Perimenopause Test Kit
    name: "Perimenopause Test Kit",
    price: "40.00",
    imageUrl:
      "https://mycdn.myrocky.ca/wp-content/uploads/20240906110242/FSH-Box.png",
    bulletPoints: [
      "Helps identify if you are perimenopausal with 99% accuracy",
      "Urine test",
      "3 testing strips",
    ],
    showInfoIcon: true,
    faqContent: `
      <p class="mb-4"><strong>Q: When should I use the test?</strong><br>
        A: For the most accurate result, we recommend using first-morning urine. If you are menstruating, it is advisable to test during the first week of your cycle and retest one week later.</p>
      <p class="mb-4"><strong>Q: Does a positive test mean you are in menopause?</strong><br>
        A: A positive test could mean you are either peri-menopausal or menopausal. To know for sure if you are menopausal, this is best discussed with your doctor as further tests may be needed.</p>
      <p class="mb-4"><strong>Q: Does a negative test result mean I'm not menopausal?</strong><br>
        A: A negative test result does not rule out peri-menopause or menopause, especially if you are experiencing relevant symptoms. You should discuss your symptoms with a doctor.</p>
    `,
  },
  {
    id: "323576", // Dad Hat
    name: "Rocky Dad Hat",
    price: "29.99",
    imageUrl: "https://mycdn.myrocky.ca/wp-content/uploads/20241211132726/Copy-of-RockyHealth-15-scaled.webp",
    bulletPoints: ["One size fits all", "Adjustable strap", "Cotton twill"],
  },
];

const FemaleCrossSellPopup = ({
  isOpen,
  onClose,
  mainProduct,
  onCheckout,
  selectedProductId,
}) => {
  return (
    <CrossSellPopup
      isOpen={isOpen}
      onClose={onClose}
      mainProduct={mainProduct}
      addOnProducts={femaleAddOnProducts}
      onCheckout={onCheckout}
      selectedProductId={selectedProductId}
    />
  );
};

export default FemaleCrossSellPopup;
