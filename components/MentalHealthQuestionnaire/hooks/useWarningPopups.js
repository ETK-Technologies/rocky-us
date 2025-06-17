import { useState, useEffect, useRef } from "react";

export const useWarningPopups = (
  formData,
  currentPage,
  calculatePHQ9Score,
  calculateGAD7Score
) => {
  const [showSuicidalWarning, setShowSuicidalWarning] = useState(false);
  const [showHighAnxietyWarning, setShowHighAnxietyWarning] = useState(false);
  const [showHighDepressionWarning, setShowHighDepressionWarning] =
    useState(false);
  const [showCompletionWarning, setShowCompletionWarning] = useState(false);
  const [isAcknowledged, setIsAcknowledged] = useState(true);
  const [processedScores, setProcessedScores] = useState({
    phq9: false,
    gad7: false,
  });

  const [processedQuestion519, setProcessedQuestion519] = useState(false);

  const previousPageRef = useRef(currentPage);
  const hasPHQ9BeenCompleted = useRef(false);
  const hasGAD7BeenCompleted = useRef(false);

  const hasSuicidalWarningShown = useRef(
    loadWarningState("suicidalWarningShown") || false
  );
  const hasDepressionWarningShown = useRef(
    loadWarningState("depressionWarningShown") || false
  );
  const hasAnxietyWarningShown = useRef(
    loadWarningState("anxietyWarningShown") || false
  );

  const suicidalWarningAcknowledged = useRef(
    loadWarningState("suicidalWarningAcknowledged") || false
  );
  const depressionWarningAcknowledged = useRef(
    loadWarningState("depressionWarningAcknowledged") || false
  );
  const anxietyWarningAcknowledged = useRef(
    loadWarningState("anxietyWarningAcknowledged") || false
  );

  function loadWarningState(key) {
    if (typeof window !== "undefined") {
      const value = localStorage.getItem(`mh-${key}`);
      return value === "true";
    }
    return false;
  }

  function saveWarningState(key, value) {
    if (typeof window !== "undefined") {
      localStorage.setItem(`mh-${key}`, value.toString());
    }
  }

  const clearAllWarningStates = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("mh-suicidalWarningShown");
      localStorage.removeItem("mh-depressionWarningShown");
      localStorage.removeItem("mh-anxietyWarningShown");
      localStorage.removeItem("mh-suicidalWarningAcknowledged");
      localStorage.removeItem("mh-depressionWarningAcknowledged");
      localStorage.removeItem("mh-anxietyWarningAcknowledged");

      hasSuicidalWarningShown.current = false;
      hasDepressionWarningShown.current = false;
      hasAnxietyWarningShown.current = false;
      suicidalWarningAcknowledged.current = false;
      depressionWarningAcknowledged.current = false;
      anxietyWarningAcknowledged.current = false;

      setShowSuicidalWarning(false);
      setShowHighDepressionWarning(false);
      setShowHighAnxietyWarning(false);
    }
  };

  useEffect(() => {
    if (showSuicidalWarning) {
      setIsAcknowledged(suicidalWarningAcknowledged.current);
    } else if (showHighDepressionWarning) {
      setIsAcknowledged(depressionWarningAcknowledged.current);
    } else if (showHighAnxietyWarning) {
      setIsAcknowledged(anxietyWarningAcknowledged.current);
    }
  }, [showSuicidalWarning, showHighDepressionWarning, showHighAnxietyWarning]);

  useEffect(() => {
    if (
      formData["519"] === "More than half the days" ||
      formData["519"] === "Nearly every day"
    ) {
      if (!processedQuestion519 && !hasSuicidalWarningShown.current) {
        setShowSuicidalWarning(true);
        hasSuicidalWarningShown.current = true;
        saveWarningState("suicidalWarningShown", true);
        setProcessedQuestion519(true);
        suicidalWarningAcknowledged.current = false;
        saveWarningState("suicidalWarningAcknowledged", false);
        setIsAcknowledged(false);
      }
    }
  }, [formData["519"], processedQuestion519]);

  useEffect(() => {
    const phq9AllAnswered = [
      "511",
      "512",
      "513",
      "514",
      "515",
      "516",
      "517",
      "518",
      "519",
    ].every((field) => !!formData[field]);

    if (phq9AllAnswered && !hasPHQ9BeenCompleted.current) {
      const phq9Score = calculatePHQ9Score();
      if (
        phq9Score >= 15 &&
        !hasDepressionWarningShown.current &&
        !showSuicidalWarning
      ) {
        setShowHighDepressionWarning(true);
        hasDepressionWarningShown.current = true;
        saveWarningState("depressionWarningShown", true);
        depressionWarningAcknowledged.current = false;
        saveWarningState("depressionWarningAcknowledged", false);
        setIsAcknowledged(false);
      }
      hasPHQ9BeenCompleted.current = true;
    }
  }, [
    formData["511"],
    formData["512"],
    formData["513"],
    formData["514"],
    formData["515"],
    formData["516"],
    formData["517"],
    formData["518"],
    formData["519"],
    calculatePHQ9Score,
    showSuicidalWarning,
  ]);

  useEffect(() => {
    const gad7AllAnswered = [
      "520",
      "521",
      "522",
      "523",
      "524",
      "525",
      "526",
    ].every((field) => !!formData[field]);

    if (gad7AllAnswered && !hasGAD7BeenCompleted.current) {
      const gad7Score = calculateGAD7Score();
      if (
        gad7Score >= 15 &&
        !hasAnxietyWarningShown.current &&
        !showSuicidalWarning &&
        !showHighDepressionWarning
      ) {
        setShowHighAnxietyWarning(true);
        hasAnxietyWarningShown.current = true;
        saveWarningState("anxietyWarningShown", true);
        anxietyWarningAcknowledged.current = false;
        saveWarningState("anxietyWarningAcknowledged", false);
        setIsAcknowledged(false);
      }
      hasGAD7BeenCompleted.current = true;
    }
  }, [
    formData["520"],
    formData["521"],
    formData["522"],
    formData["523"],
    formData["524"],
    formData["525"],
    formData["526"],
    calculateGAD7Score,
    showSuicidalWarning,
    showHighDepressionWarning,
  ]);
  useEffect(() => {
    if (currentPage === 36 && formData.calendly_booking_completed) {
      setShowCompletionWarning(true);
    }
  }, [currentPage, formData.calendly_booking_completed]);

  const handleAcknowledge = () => {
    setIsAcknowledged(!isAcknowledged);

    if (showSuicidalWarning) {
      suicidalWarningAcknowledged.current = !isAcknowledged;
      saveWarningState("suicidalWarningAcknowledged", !isAcknowledged);
    } else if (showHighDepressionWarning) {
      depressionWarningAcknowledged.current = !isAcknowledged;
      saveWarningState("depressionWarningAcknowledged", !isAcknowledged);
    } else if (showHighAnxietyWarning) {
      anxietyWarningAcknowledged.current = !isAcknowledged;
      saveWarningState("anxietyWarningAcknowledged", !isAcknowledged);
    }
  };

  const isSuicidalWarningAcknowledged = () =>
    suicidalWarningAcknowledged.current;
  const isDepressionWarningAcknowledged = () =>
    depressionWarningAcknowledged.current;
  const isAnxietyWarningAcknowledged = () => anxietyWarningAcknowledged.current;
  const canCloseCurrentWarning = () => isAcknowledged;

  return {
    showSuicidalWarning,
    showHighAnxietyWarning,
    showHighDepressionWarning,
    showCompletionWarning,
    isAcknowledged,
    setShowSuicidalWarning,
    setShowHighAnxietyWarning,
    setShowHighDepressionWarning,
    setShowCompletionWarning,
    handleAcknowledge,
    canCloseCurrentWarning,
    isSuicidalWarningAcknowledged,
    isDepressionWarningAcknowledged,
    isAnxietyWarningAcknowledged,
    clearAllWarningStates,
  };
};