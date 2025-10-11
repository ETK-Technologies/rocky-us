"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { faqData } from "@/lib/constants/faqData";
import HeroSection from "./HeroSection";
import FAQTabs from "./FAQTabs";
import ProductSection from "./ProductSection";
import SearchResults from "./SearchResults";

const ProductFAQPage = () => {
  const [activeTab, setActiveTab] = useState("sex");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [firstSearch, setFirstSearch] = useState(true);
  const sexRef = useRef(null);
  const hairLossRef = useRef(null);
  const hairCareRef = useRef(null);

  useEffect(() => {
    if (searchTerm.length < 3) {
      setDebouncedSearchTerm("");
      return;
    }

    const handler = setTimeout(() => {
      if (firstSearch) {
        setIsSearching(true);
        setTimeout(() => {
          setDebouncedSearchTerm(searchTerm);
          setIsSearching(false);
          setFirstSearch(false);
        }, 400);
      } else {
        setDebouncedSearchTerm(searchTerm);
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, firstSearch]);

  useEffect(() => {
    if (searchTerm.length === 0) {
      setFirstSearch(true);
    }
  }, [searchTerm]);

  const scrollToSection = (sectionRef, tabName) => {
    setActiveTab(tabName);
    sectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  const searchResults = useMemo(() => {
    if (!debouncedSearchTerm) return [];

    const results = [];
    const searchTermLower = debouncedSearchTerm.toLowerCase();

    Object.entries(faqData).forEach(([category, products]) => {
      products.forEach((product) => {
        const matchingFaqs = product.faqs.filter(
          (faq) =>
            faq.question.toLowerCase().includes(searchTermLower) ||
            faq.answer.toLowerCase().includes(searchTermLower)
        );

        if (matchingFaqs.length > 0) {
          results.push({
            category,
            productName: product.name,
            faqs: matchingFaqs,
          });
        }
      });
    });

    return results;
  }, [debouncedSearchTerm]);

  const isSearchActive = debouncedSearchTerm.length > 0 || isSearching;

  return (
    <>
      <HeroSection searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="max-w-[1184px] mx-auto px-5 py-8 md:py-12 sectionWidth:px-0">
        {isSearchActive ? (
          <SearchResults
            results={searchResults}
            searchTerm={debouncedSearchTerm}
            isLoading={isSearching}
          />
        ) : (
          <div className="md:grid md:grid-cols-4 flex flex-col gap-10 md:gap-0">
            {/* Tabs Navigation */}
            <FAQTabs
              activeTab={activeTab}
              scrollToSection={scrollToSection}
              sexRef={sexRef}
              hairLossRef={hairLossRef}
              hairCareRef={hairCareRef}
            />

            {/* FAQ Sections  */}
            <div className="md:col-span-3">
              <ProductSection
                title="Sexual Health"
                products={faqData.sex}
                reference={sexRef}
              />
              <ProductSection
                title="Hair Loss"
                products={faqData.hairLoss}
                reference={hairLossRef}
              />
              <ProductSection
                title="Hair Care"
                products={faqData.hairCare}
                reference={hairCareRef}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductFAQPage;
