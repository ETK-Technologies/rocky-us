import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { FaCreditCard } from "react-icons/fa";
import {
  removeSavedPaymentMethod,
  editSavedPaymentMethod,
} from "@/lib/api/savedCardPayment";
import { toast } from "react-toastify";
import { useElements, CardElement } from "@stripe/react-stripe-js";
import StripeCardInput from "./StripeCardInput";

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
  setSavedCards,
  selectedCard,
  setSelectedCard,
  isLoadingSavedCards = false,
  onStripeReady, // NEW: Callback for Stripe Elements
}) => {
  const elements = useElements(); // NEW: Get Stripe Elements instance
  const [paymentMethod, setPaymentMethod] = useState(
    selectedCard ? "saved" : "new"
  );
  const [saveCard, setSaveCard] = useState(true); // always save card
  const [showDropdown, setShowDropdown] = useState(null);

  // NEW: Call onStripeReady when elements is ready
  useEffect(() => {
    if (elements && onStripeReady) {
      onStripeReady(elements);
    }
  }, [elements, onStripeReady]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [editExpiry, setEditExpiry] = useState("");
  const [deletingCardId, setDeletingCardId] = useState(null);
  const dropdownRef = useRef(null);

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
      if (regex.test(number)) return type.toString().toLowerCase();
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

  const getCardIcon = (brand) => {
    const brandLower = brand?.toString().toLowerCase();
    switch (brandLower) {
      case "visa":
        return "/checkout-icons/card-visa.svg";
      case "amex":
        return "/checkout-icons/card-amex.svg";
      case "mastercard":
        return "/checkout-icons/card-mastercard.svg";
      case "discover":
        return "/checkout-icons/card-discover.svg";
      case "jcb":
        return "/checkout-icons/card-jcb.svg";
      default:
        return "/checkout-icons/card-visa.svg";
    }
  };

  const handleCardSelection = (card) => {
    setPaymentMethod("saved");
    setSelectedCard(card);
  };

  const handleNewCardSelection = () => {
    setPaymentMethod("new");
    setSelectedCard(null);
  };

  const handleMenuClick = (cardId, event) => {
    event.stopPropagation();
    setShowDropdown(showDropdown === cardId ? null : cardId);
  };

  // Update paymentMethod when selectedCard changes
  useEffect(() => {
    setPaymentMethod(selectedCard ? "saved" : "new");
  }, [selectedCard]);

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

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handler for removing a card
  const handleRemoveCard = async (cardId) => {
    try {
      setDeletingCardId(cardId);
      await removeSavedPaymentMethod(cardId);

      // Remove card from the list immediately
      if (setSavedCards) {
        setSavedCards((prevCards) =>
          prevCards.filter((card) => card.id !== cardId)
        );
      }

      // If the deleted card was selected, clear the selection
      if (selectedCard && selectedCard.id === cardId) {
        setSelectedCard(null);
        setPaymentMethod(null);
      }

      setShowDropdown(null);
      toast.success("Card removed successfully");
    } catch (error) {
      toast.error("Failed to remove card");
    } finally {
      setDeletingCardId(null);
    }
  };

  // Handler for editing a card
  const handleEdit = async (card) => {
    setEditingCard(card);
    setEditExpiry(
      card.expiry_month && card.expiry_year
        ? `${String(card.expiry_month).padStart(2, "0")}/${String(
            card.expiry_year
          ).slice(-2)}`
        : ""
    );
    setShowEditModal(true);
    setShowDropdown(null);
  };

  const handleSaveEdit = async () => {
    if (!editingCard || !editExpiry) {
      toast.error("Please enter a valid expiry date");
      return;
    }

    const [month, year] = editExpiry.split("/");
    if (!month || !year || month.length !== 2 || year.length !== 2) {
      toast.error("Please enter expiry in MM/YY format");
      return;
    }

    try {
      await editSavedPaymentMethod(editingCard.id, month, `20${year}`);
      toast.success("Card updated successfully");
      setShowEditModal(false);
      setEditingCard(null);
      setEditExpiry("");
      // TODO: Trigger a refresh of saved cards
    } catch (error) {
      toast.error("Failed to update card");
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingCard(null);
    setEditExpiry("");
  };

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
          <div className="my-1 space-y-3">
            {savedCards.map((card) => (
              <div
                key={card.id}
                onClick={() => handleCardSelection(card)}
                className={`border-b border-[#E2E2E1] cursor-pointer flex justify-between items-center`}
              >
                <div className="py-3 flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment-option"
                    checked={
                      paymentMethod === "saved" &&
                      selectedCard &&
                      selectedCard.id === card.id
                    }
                    onChange={() => handleCardSelection(card)}
                    className="h-4 w-4 accent-[#AE7E56]  border border-[#00000033] cursor-pointer "
                  />

                  <Image
                    src={getCardIcon(card.brand)}
                    alt={`${card.brand} card`}
                    width={40}
                    height={24}
                    className="object-contain h-full"
                  />
                  <span className="text-sm text-gray-500">
                    **** **** **** {card.last4}
                  </span>
                  {card.is_default && (
                    <span className="text-xs border border-[#F6F6F5] bg-[#E2E2E152] text-[#00000080] py-1 px-2 rounded-md">
                      Default
                    </span>
                  )}
                </div>
                <div className="relative" ref={dropdownRef}>
                  <div
                    className="rounded-full cursor-pointer p-2 border border-[#E2E2E180] hover:border-[#AE7E56] hover:bg-[#AE7E56] hover:bg-opacity-5 transition-all duration-200 group"
                    onClick={(e) => handleMenuClick(card.id, e)}
                  >
                    <Image
                      src="/checkout-icons/menu-dots.svg"
                      alt="menu-dots"
                      width={16}
                      height={16}
                      className="group-hover:opacity-80 transition-opacity duration-200"
                    />
                  </div>
                  {showDropdown === card.id && (
                    <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      <div className="py-1">
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(card);
                          }}
                        >
                          <Image
                            src="/checkout-icons/edit-icon.svg"
                            alt="edit-icon"
                            width={16}
                            height={16}
                          />
                          Edit
                        </button>
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveCard(card.id);
                          }}
                          disabled={deletingCardId === card.id}
                        >
                          {deletingCardId === card.id ? (
                            <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <Image
                              src="/checkout-icons/delete.svg"
                              alt="delete mark"
                              width={16}
                              height={16}
                            />
                          )}
                          {deletingCardId === card.id
                            ? "Removing..."
                            : "Remove"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={handleNewCardSelection}
            >
              <input
                type="radio"
                name="payment-option"
                checked={paymentMethod === "new"}
                onChange={handleNewCardSelection}
                className="h-4 w-4 accent-[#AE7E56] border border-[#00000033] cursor-pointer "
              />
              <span className="text-sm font-medium text-[#212121]">
                Use a new card
              </span>
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
            {/* Stripe Elements Card Input */}
            <div className="mt-2">
              <label className="block text-sm font-medium text-[#251F20] mb-2">
                Card Details
              </label>
              <StripeCardInput />
              <p className="mt-2 text-xs text-gray-600 flex items-center gap-1">
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
                Secure payment powered by Stripe
              </p>
            </div>

            <div className="flex items-center mt-4 hidden">
              <input
                id="save-card"
                type="checkbox"
                checked={saveCard}
                onChange={() => setSaveCard(!saveCard)}
                className="h-4 w-4 accent-[#AE7E56] border-2 border-[#AE7E56] rounded mr-2 cursor-pointer rounded-md"
              />
              <label
                htmlFor="save-card"
                className="text-sm text-[#000000] cursor-pointer"
              >
                Save payment details for future purchases.
              </label>
            </div>
          </>
        )}
      </div>

      {/* Edit Card Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Edit Card</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <p className="text-sm text-gray-500">
                  **** **** **** {editingCard?.last4}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  value={editExpiry}
                  onChange={(e) =>
                    setEditExpiry(formatExpiryDate(e.target.value))
                  }
                  placeholder="MM/YY"
                  className="p-3 border w-full rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#AE7E56]"
                  maxLength={5}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCancelEdit}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="flex-1 px-4 py-2 bg-[#AE7E56] text-white rounded-lg hover:bg-[#9d6f4a]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Payment;
