"use client";
import React, { useEffect, useState } from "react";
import MerchHero from "../../components/Merch/MerchHero";
import ShopBanner from "../../components/Merch/ShopBanner";
import GetSocialWithRocky from "../../components/Merch/GetSocialWithRocky";
import MerchFaqs from "../../components/Merch/MerchFaqs";
import { transformProductsArray } from "../../components/Merch/utils/productExtractor";

function MerchPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        const productIds = [567280, 353755];
        
        const productPromises = productIds.map(async (id) => {
          const response = await fetch(`/api/products/id/${id}/full`);
          if (!response.ok) {
            console.warn(`Failed to fetch product ${id}`);
            return null;
          }
          return response.json();
        });

        const productData = await Promise.all(productPromises);
        const validProducts = productData.filter(product => product !== null);

        // Transform products with variation data included
        const transformedProducts = await transformProductsArray(validProducts, true);

        
        setProducts(transformedProducts);
        
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <MerchHero />
      <ShopBanner products={products} loading={loading} />
      <GetSocialWithRocky />
      <MerchFaqs />
    </>
  );
}

export default MerchPage;
