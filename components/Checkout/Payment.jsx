import { useEffect, useState } from "react";
import Image from "next/image";
import { FaCreditCard } from "react-icons/fa";

const Payment = ({
  setFormData,
  cardNumber,
  setCardNumber,
  expiry,
  setExpiry,
  cvc,
  setCvc,
  cardType,
  setCardType,
  savedCards = [],
  selectedCard,
  setSelectedCard,
  isLoadingSavedCards = false,
}) => {
  // Safely handle the radio selection change
  const [paymentMethod, setPaymentMethod] = useState(
    selectedCard ? "saved" : "new"
  );

  // Update paymentMethod when selectedCard changes
  useEffect(() => {
    setPaymentMethod(selectedCard ? "saved" : "new");
  }, [selectedCard]);

  const getCardType = (number) => {
    const regexMap = {
      Visa: /^4/,
      MasterCard: /^5[1-5]/,
      Amex: /^3[47]/,
      Discover: /^6(?:011|5)/,
      DinersClub: /^3(?:0[0-5]|[68])/,
      JCB: /^(?:2131|1800|35)/,
    };

    for (const [type, regex] of Object.entries(regexMap)) {
      if (regex.test(number)) return type.toLowerCase();
    }
    return "unknown";
  };

  const formatCardNumber = (value) =>
    value
      .replace(/\D/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();

  const formatExpiryDate = (value) => {
    let cleaned = value.replace(/\D/g, "");
    if (cleaned.length > 4) cleaned = cleaned.slice(0, 4);
    if (cleaned.length >= 3) {
      return cleaned.replace(/(\d{2})(\d{0,2})/, "$1/$2");
    }
    return cleaned;
  };

  const getCardBrandIcon = (brand) => {
    switch (brand.toLowerCase()) {
      case "visa":
        return "https://myrocky.b-cdn.net/WP%20Images/payment-icons/visa.png";
      case "mastercard":
        return "https://myrocky.b-cdn.net/WP%20Images/payment-icons/mastercard.png";
      case "amex":
        return "https://myrocky.b-cdn.net/WP%20Images/payment-icons/amex.png";
      case "discover":
        return "https://myrocky.b-cdn.net/WP%20Images/payment-icons/discover.png";
      default:
        return "https://myrocky.b-cdn.net/WP%20Images/payment-icons/generic-card.png";
    }
  };

  const handleCardSelection = (card) => {
    // Store the entire card object to have access to both id and token properties
    setPaymentMethod("saved");
    setSelectedCard(card);
  };

  const handleNewCardSelection = () => {
    setPaymentMethod("new");
    setSelectedCard(null);
  };

  // Ensure a valid selected card
  useEffect(() => {
    if (selectedCard && savedCards && savedCards.length > 0) {
      // If the selectedCard doesn't exist in savedCards, reset it
      const cardExists = savedCards.some(
        (card) => card.id === selectedCard?.id
      );
      if (!cardExists) {
        setSelectedCard(null);
      }
    }
  }, [savedCards, selectedCard, setSelectedCard]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      payment_data: prev.payment_data.map((item) => {
        if (selectedCard) {
          switch (item.key) {
            case "wc-bambora-credit-card-js-token":
              return {
                ...item,
                value: selectedCard?.token || selectedCard?.id || "",
              };
            case "wc-bambora_credit_card-new-payment-method":
              return { ...item, value: false };
            case "wc-bambora_credit_card-payment-token":
              return { ...item, value: selectedCard?.id || "" };
            case "payment_method_id":
              return { ...item, value: selectedCard?.id || "" };
            default:
              return item;
          }
        } else {
          switch (item.key) {
            case "wc-bambora-credit-card-account-number":
              return { ...item, value: cardNumber.replace(/\s/g, "") };
            case "wc-bambora-credit-card-card-type":
              return { ...item, value: getCardType(cardNumber) };
            case "wc-bambora-credit-card-exp-month":
              return { ...item, value: expiry.slice(0, 2) };
            case "wc-bambora-credit-card-exp-year":
              return { ...item, value: expiry.slice(3) };
            case "wc-bambora_credit_card-new-payment-method":
              return { ...item, value: true };
            default:
              return item;
          }
        }
      }),
    }));
  }, [cardNumber, expiry, cvc, selectedCard, setFormData]);

  useEffect(() => {
    if (paymentMethod === "new" && selectedCard !== null) {
      setSelectedCard(null);
    }
  }, [paymentMethod, selectedCard, setSelectedCard]);

  return (
    <>
      <div className="my-6">
        <h1 className="text-lg font-semibold">Payment</h1>
        <p className="text-gray-700 text-sm">
          All transactions are secure and encrypted.
        </p>
      </div>

      <div className="bg-white w-full lg:max-w-[512px] p-6 rounded-[16px] shadow-sm border border-gray-300">
        <h1 className="flex items-center justify-between">
          <span className="font-semibold text-sm">Card Information</span>
          <div className="h-8 w-[50%] relative">
            <Image
              fill
              src="https://myrocky.b-cdn.net/WP%20Images/Global%20Images/payment-methods.png"
              alt="payment-methods"
              className="object-contain"
            />
          </div>
        </h1>

        {isLoadingSavedCards ? (
          <div className="my-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Loading saved cards...</p>
          </div>
        ) : savedCards && savedCards.length > 0 ? (
          <div className="my-4 space-y-3">
            {savedCards.map((card) => (
              <div
                key={card.id}
                onClick={() => handleCardSelection(card)}
                className={`border ${
                  paymentMethod === "saved" &&
                  selectedCard &&
                  selectedCard.id === card.id
                    ? "border-blue-500"
                    : "border-gray-200"
                } rounded-lg overflow-hidden cursor-pointer hover:border-gray-300 transition-colors`}
              >
                <div className="p-4 flex items-center justify-between">
                  <div className="flex flex-col">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-sm">
                        {card.brand.toLowerCase()}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">
                        **** **** **** {card.last4}
                      </span>
                      <span className="text-xs text-gray-500">
                        Expires {card.exp_month}/{card.exp_year}
                      </span>
                    </div>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="payment-option"
                      checked={
                        paymentMethod === "saved" &&
                        selectedCard &&
                        selectedCard.id === card.id
                      }
                      onChange={() => handleCardSelection(card)}
                      className="h-4 w-4 text-blue-600"
                    />
                    {card.is_default && (
                      <span className="ml-2 text-xs text-gray-500">
                        Default
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div
              onClick={handleNewCardSelection}
              className={`border ${
                paymentMethod === "new" ? "border-blue-500" : "border-gray-200"
              } rounded-lg overflow-hidden cursor-pointer hover:border-gray-300 transition-colors`}
            >
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-100 rounded w-10 h-10 flex items-center justify-center">
                    <FaCreditCard size={20} className="text-gray-500" />
                  </div>
                  <span className="text-sm font-medium">Use a new card</span>
                </div>
                <input
                  type="radio"
                  name="payment-option"
                  checked={paymentMethod === "new"}
                  onChange={handleNewCardSelection}
                  className="h-4 w-4 text-blue-600"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="my-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">
              No saved cards found. Please enter your card details below.
            </p>
          </div>
        )}

        {!selectedCard && (
          <>
            <div className="mt-2">
              <input
                type="tel"
                value={cardNumber}
                onChange={(e) =>
                  setCardNumber(formatCardNumber(e.target.value))
                }
                placeholder="1234 1234 1234 1234"
                className="p-3 border w-full rounded-t-lg"
                autoComplete="cc-number"
                maxLength={19}
                name="wc-bambora-credit-card-account-number"
              />
            </div>

            <div className="flex">
              <input
                type="tel"
                value={expiry}
                onChange={(e) => setExpiry(formatExpiryDate(e.target.value))}
                placeholder="MM/YY"
                className="p-3 border w-full rounded-bl-lg"
                autoComplete="cc-exp"
                maxLength={5}
              />
              <input
                type="tel"
                value={cvc}
                onChange={(e) =>
                  setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))
                }
                placeholder="CVC"
                className="p-3 border w-full rounded-br-lg"
                autoComplete="cc-csc"
                maxLength={4}
              />
            </div>

            <p className="mt-2 text-xs text-gray-600">
              {cardNumber.length > 0
                ? `Detected: ${getCardType(cardNumber.replace(/\s/g, ""))}`
                : ""}
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default Payment;
