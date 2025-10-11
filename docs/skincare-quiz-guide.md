# Skincare Quiz Architecture Guide

This document provides an overview of the refactored skincare quiz architecture and a guide on how to add new quizzes to the system.

## Architecture Overview

The new architecture is designed to be modular and extensible. It is built around a set of shared, reusable components and hooks that provide the core functionality for all quizzes. This approach minimizes code duplication and makes it easy to add new quizzes with their own unique logic and content.

### Core Concepts

- **Shared Components**: Generic UI components that are used across all quizzes (e.g., `GenericQuestionStep`, `GenericPopup`) are located in `components/SkincareConsultation/components/`.
- **Shared Hooks**: The core logic for quiz navigation and state management is encapsulated in two reusable hooks:
  - `useStepNavigation`: Manages the current step, progress, and forward/back navigation.
  - `useQuizData`: Manages the user's answers, popups, and product selections.
    These hooks are located in `components/SkincareConsultation/hooks/`.
- **Recommendation Engine**: A centralized `recommendationEngine.js` (located in `components/SkincareConsultation/utils/`) determines which products to recommend based on a set of rules. This decouples the recommendation logic from the quiz flow.
- **Quiz-Specific Logic**: Each quiz has its own directory (e.g., `AntiAgingQuiz`, `HyperpigmentationQuiz`) that contains the files and logic unique to that quiz. This includes:
  - A `config.js` file that defines the quiz's questions, navigation, and recommendation rules.
  - A custom hook (e.g., `useAntiAgingQuiz.js`) that composes the shared hooks and adds any quiz-specific logic.

## How to Add a New Quiz

Adding a new quiz involves creating a new directory and a few files that define the quiz's unique content and logic. Here's a step-by-step guide:

### 1. Create a New Quiz Directory

Create a new directory for your quiz under `components/SkincareConsultation/`. For example, to create a new "Acne Quiz", you would create the directory `components/SkincareConsultation/AcneQuiz`.

### 2. Create the `config.js` File

This is the most important file for defining your quiz. Create a `config.js` file in your new quiz's `config` directory (e.g., `AcneQuiz/config/quizConfig.js`). This file should export a `quizConfig` object with the following structure:

```javascript
import { ACNE_PRODUCTS } from "../../data/skincareProductData";

export const quizConfig = {
  // Recommendation rules for the new quiz
  recommendationRules: [
    {
      conditions: {
        // e.g., skinType: "oily"
      },
      outcome: {
        // ... recommended product and alternatives
      },
    },
    // ... more rules
  ],

  // The steps of the quiz
  steps: {
    1: {
      id: "question1",
      type: "radio", // or "checkbox", "radio-text", etc.
      title: "Your first question",
      field: "field1",
      options: [
        { id: "a", label: "Option A" },
        { id: "b", label: "Option B" },
      ],
    },
    // ... more steps
  },

  // The navigation flow of the quiz
  navigation: {
    1: 2,
    2: 3,
    // ...
  },

  // The progress percentage for each step
  progressMap: {
    1: 10,
    2: 20,
    // ...
  },

  // Popups for the quiz
  popups: {
    // ...
  },
};
```

### 3. Create the Custom Hook

Create a new hook in your quiz's `hooks` directory (e.g., `AcneQuiz/hooks/useAcneQuiz.js`). This hook will compose the shared hooks and is the place to add any logic that is unique to your quiz.

```javascript
import { useStepNavigation } from "../../hooks/useStepNavigation";
import { useQuizData } from "../../hooks/useQuizData";
import { quizConfig } from "../config/quizConfig";

export const useAcneQuiz = () => {
  const {
    currentStep,
    progressPercent,
    goToStep,
    handleContinue: baseHandleContinue,
    handleBack,
  } = useStepNavigation(quizConfig);

  const {
    userData,
    setUserData,
    activePopup,
    selectedProduct,
    setSelectedProduct,
    handleAction: baseHandleAction,
    closePopup,
    handleRecommendationContinue: baseHandleRecommendationContinue,
  } = useQuizData();

  const handleContinue = () => {
    baseHandleContinue(userData);
  };

  const handleAction = (action, payload) => {
    if (action === "navigate") {
      goToStep(payload);
    } else {
      baseHandleAction(action, payload, handleContinue);
    }
  };

  const handleRecommendationContinue = () => {
    baseHandleRecommendationContinue();
    goToStep(/* The completion step number for your quiz */);
  };

  // Add any quiz-specific logic here, like a custom handleBack function

  return {
    currentStep,
    progressPercent,
    userData,
    setUserData,
    selectedProduct,
    setSelectedProduct,
    activePopup,
    handleContinue,
    handleBack,
    handleAction,
    closePopup,
    handleRecommendationContinue,
  };
};
```

### 4. Create the Main Component and Step Renderer

You will need to create a main component for your quiz (e.g., `AcneQuiz.jsx`) and a `QuizStepRenderer.jsx`. You can copy these files from one of the existing quizzes and modify them as needed.

- **`AcneQuiz.jsx`**: This component will use your new `useAcneQuiz` hook and render the `QuestionnaireNavbar`, `ProgressBar`, and `QuizStepRenderer`.
- **`QuizStepRenderer.jsx`**: This component will be responsible for rendering the correct step of your quiz. It will use the `GenericQuestionStep` and `GenericRecommendationStep` components and the centralized `recommendationEngine`.

### 5. Add a New Route

Finally, you will need to add a new route to your application to render your new quiz. This will likely involve creating a new page in the `app` directory of your Next.js application.
