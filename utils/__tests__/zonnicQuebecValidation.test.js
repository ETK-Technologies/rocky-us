import {
  isQuebecProvince,
  hasZonnicProducts,
  canPurchaseZonnic,
  getQuebecRestrictionMessage,
  checkQuebecZonnicRestriction,
} from "../zonnicQuebecValidation";

describe("Zonnic Quebec Validation", () => {
  describe("isQuebecProvince", () => {
    test("should return true for Quebec variations", () => {
      expect(isQuebecProvince("Quebec")).toBe(true);
      expect(isQuebecProvince("QC")).toBe(true);
      expect(isQuebecProvince("Québec")).toBe(true);
      expect(isQuebecProvince("quebec")).toBe(true);
      expect(isQuebecProvince("qc")).toBe(true);
    });

    test("should return false for non-Quebec provinces", () => {
      expect(isQuebecProvince("Ontario")).toBe(false);
      expect(isQuebecProvince("ON")).toBe(false);
      expect(isQuebecProvince("British Columbia")).toBe(false);
      expect(isQuebecProvince("BC")).toBe(false);
    });

    test("should return false for null/undefined/empty values", () => {
      expect(isQuebecProvince(null)).toBe(false);
      expect(isQuebecProvince(undefined)).toBe(false);
      expect(isQuebecProvince("")).toBe(false);
    });
  });

  describe("hasZonnicProducts", () => {
    test("should return true when cart contains Zonnic products", () => {
      const cartItems = [
        { name: "ZONNIC Nicotine Pouches" },
        { name: "Other Product" },
      ];
      expect(hasZonnicProducts(cartItems)).toBe(true);
    });

    test("should return true for case insensitive matches", () => {
      const cartItems = [
        { name: "zonnic nicotine pouches" },
        { name: "ZONNIC PRODUCT" },
      ];
      expect(hasZonnicProducts(cartItems)).toBe(true);
    });

    test("should return false when cart does not contain Zonnic products", () => {
      const cartItems = [
        { name: "Other Product" },
        { name: "Another Product" },
      ];
      expect(hasZonnicProducts(cartItems)).toBe(false);
    });

    test("should return false for invalid cart items", () => {
      expect(hasZonnicProducts(null)).toBe(false);
      expect(hasZonnicProducts(undefined)).toBe(false);
      expect(hasZonnicProducts([])).toBe(false);
      expect(hasZonnicProducts([{ name: null }])).toBe(false);
    });
  });

  describe("canPurchaseZonnic", () => {
    test("should return false for Quebec", () => {
      expect(canPurchaseZonnic("Quebec")).toBe(false);
      expect(canPurchaseZonnic("QC")).toBe(false);
    });

    test("should return true for other provinces", () => {
      expect(canPurchaseZonnic("Ontario")).toBe(true);
      expect(canPurchaseZonnic("ON")).toBe(true);
      expect(canPurchaseZonnic("British Columbia")).toBe(true);
    });
  });

  describe("getQuebecRestrictionMessage", () => {
    test("should return the correct restriction message", () => {
      const message = getQuebecRestrictionMessage();
      expect(message).toBe(
        "Sorry, zonnic product is currently not available in your selected province."
      );
    });
  });

  describe("checkQuebecZonnicRestriction", () => {
    test("should block checkout when cart has Zonnic and province is Quebec", () => {
      const cartItems = [{ name: "ZONNIC Nicotine Pouches" }];
      const result = checkQuebecZonnicRestriction(
        cartItems,
        "Quebec",
        "Quebec"
      );

      expect(result.blocked).toBe(true);
      expect(result.message).toBe(
        "Sorry, zonnic product is currently not available in your selected province."
      );
      expect(result.hasZonnic).toBe(true);
      expect(result.isQuebec).toBe(true);
      expect(result.province).toBe("Quebec");
    });

    test("should not block checkout when cart has Zonnic but province is not Quebec", () => {
      const cartItems = [{ name: "ZONNIC Nicotine Pouches" }];
      const result = checkQuebecZonnicRestriction(
        cartItems,
        "Ontario",
        "Ontario"
      );

      expect(result.blocked).toBe(false);
      expect(result.message).toBe(null);
      expect(result.hasZonnic).toBe(true);
      expect(result.isQuebec).toBe(false);
      expect(result.province).toBe("Ontario");
    });

    test("should not block checkout when cart has no Zonnic products", () => {
      const cartItems = [{ name: "Other Product" }];
      const result = checkQuebecZonnicRestriction(
        cartItems,
        "Quebec",
        "Quebec"
      );

      expect(result.blocked).toBe(false);
      expect(result.message).toBe(null);
      expect(result.hasZonnic).toBe(false);
      expect(result.isQuebec).toBe(true);
      expect(result.province).toBe("Quebec");
    });

    test("should use shipping province as primary, billing as fallback", () => {
      const cartItems = [{ name: "ZONNIC Nicotine Pouches" }];
      const result = checkQuebecZonnicRestriction(
        cartItems,
        "Ontario",
        "Quebec"
      );

      expect(result.blocked).toBe(false);
      expect(result.province).toBe("Ontario");
    });

    test("should use billing province when shipping is not provided", () => {
      const cartItems = [{ name: "ZONNIC Nicotine Pouches" }];
      const result = checkQuebecZonnicRestriction(cartItems, null, "Quebec");

      expect(result.blocked).toBe(true);
      expect(result.province).toBe("Quebec");
    });
  });
});
