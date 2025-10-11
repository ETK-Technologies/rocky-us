import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { FaCreditCard } from "react-icons/fa";
import {
  removeSavedPaymentMethod,
  editSavedPaymentMethod,
} from "@/lib/api/savedCardPayment";
import { toast } from "react-toastify";

const NewPayment = ({
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
}) => {
  const [paymentMethod, setPaymentMethod] = useState(
    selectedCard ? "saved" : "new"
  );
  const [saveCard, setSaveCard] = useState(true);
  const [showDropdown, setShowDropdown] = useState(null);
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

  const getCardIcon = (brand) => {
    const brandLower = brand?.toLowerCase();
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
      <div className=" w-full lg:max-w-[512px]  ">
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

        {!selectedCard && (
          <>
            <div className="mt-2">
              <input
                type="tel"
                value={cardNumber ?? ""}
                onChange={(e) =>
                  setCardNumber(formatCardNumber(e.target.value))
                }
                placeholder="1234 1234 1234 1234"
                className="p-3 border w-full rounded-lg bg-white text-[#ADADAD] focus:outline-none"
                autoComplete="cc-number"
                maxLength={19}
                name="wc-bambora-credit-card-account-number"
              />
            </div>

            <div className="flex gap-[16px] mt-[16px]">
              <input
                type="tel"
                value={expiry ?? ""}
                onChange={(e) => setExpiry(formatExpiryDate(e.target.value))}
                placeholder="MM/YY"
                className="p-3 border w-full bg-white rounded-lg text-[#ADADAD] focus:outline-none"
                autoComplete="cc-exp"
                maxLength={5}
              />
              <input
                type="tel"
                value={cvc ?? ""}
                onChange={(e) =>
                  setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))
                }
                placeholder="CVC"
                className="p-3 border w-full bg-white rounded-lg text-[#ADADAD] focus:outline-none"
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

export default NewPayment;
