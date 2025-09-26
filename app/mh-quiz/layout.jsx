"use client";

export default function MHQuestionnaireLayout({ children }) {
  return (
    <div className="mh-questionnaire-layout">
      <style jsx global>{`
        header:not(.questionnaire-header),
        nav:not(.questionnaire-navbar),
        #site-header, 
        .main-header:not(.questionnaire-header), 
        .default-navbar:not(.questionnaire-navbar),
        #main-menu:not(.questionnaire-menu),
        #off-canvas-menu,
        .site-navigation:not(.questionnaire-navigation),
        #masthead,
        .bg-black.text-white.py-2.text-center,
        [data-trustpilot-widget-id],
        .trustpilot-widget,
        div:has(> .trustpilot-widget),
        /* Footer selectors */
        footer:not(.questionnaire-footer),
        footer.bg-black,
        footer[className*="bg-black"],
        .bg-white.flex.justify-between.items-center.p-4,
        #site-footer,
        .site-footer,
        .main-footer,
        .footer-widgets,
        .footer-bottom,
        #colophon,
        .footer-area,
        .footer-container {
          display: none !important;
        }
        
        .questionnaire-header {
          display: flex !important;
        }
        
        .questionnaire-footer {
          display: block !important;
        }
        
        body {
          padding-top: 0 !important;
          margin-top: 0 !important;
          padding-bottom: 0 !important;
          margin-bottom: 0 !important;
        }
        
        /* Block all spinning loaders on questionnaire pages */
        .animate-spin,
        [class*="animate-spin"],
        div[class*="animate-spin"],
        .animate-spin.rounded-full,
        .animate-spin.rounded-full.h-16,
        .animate-spin.rounded-full.h-12,
        .animate-spin.rounded-full.h-8,
        .animate-spin.rounded-full.h-6,
        .animate-spin.rounded-full.h-4,
        .animate-spin.rounded-full.h-5,
        .animate-spin.rounded-full.w-16,
        .animate-spin.rounded-full.w-12,
        .animate-spin.rounded-full.w-8,
        .animate-spin.rounded-full.w-6,
        .animate-spin.rounded-full.w-4,
        .animate-spin.rounded-full.w-5,
        .animate-spin.rounded-full.border-t-2,
        .animate-spin.rounded-full.border-b-2,
        .animate-spin.rounded-full.border-2,
        .animate-spin.rounded-full.border-white,
        .animate-spin.rounded-full.border-gray,
        .animate-spin.rounded-full.border-black,
        .animate-spin.rounded-full.border-\[#AE7E56\] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }
      `}</style>
      {children}
    </div>
  );
}