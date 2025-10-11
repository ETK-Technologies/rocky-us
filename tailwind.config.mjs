/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "desktop-aging-gradient":
          "linear-gradient(90deg, #F5F4EF 6.77%, #BCA889 84.86%)",
        "mobile-aging-gradient":
          " linear-gradient(0deg, #EFE5DC, #EFE5DC),linear-gradient(180deg, #BCA889 0.04%, #F5F4EF 37.26%);",
        "desktop-hyper-gradient":
          "linear-gradient(270deg, #BCA889 0%, #F5F4EF 59.2%);",
        "mobile-hyper-gradient":
          "linear-gradient(180deg, #BCA889 0%, #F5F4EF 41.01%);",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        scroll: "scroll 100s linear infinite",
        "scroll-fast": "scroll 40s linear infinite",
        "scroll-faster": "scroll 1s linear infinite",
      },
      screens: {
        sectionWidth: "1184px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
