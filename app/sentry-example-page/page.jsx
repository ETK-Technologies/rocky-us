"use client";

import { logger } from "@/utils/devLogger";
import * as Sentry from "@sentry/nextjs";

export default function SentryExamplePage() {
  const testLogging = () => {
    // Test all logger methods
    logger.info("This is an info message from the logger", { test: true });
    logger.warn("This is a warning message from the logger", { test: true });
    logger.error("This is an error message from the logger", { test: true });
    logger.debug("This is a debug message from the logger", { test: true });
    logger.log("This is a log message from the logger", { test: true });
  };

  const testProfiling = async () => {
    try {
      logger.info("Testing Sentry profiling API...");

      // Test GET endpoint
      const getResponse = await fetch("/api/sentry-example-api", {
        method: "GET",
      });
      const getData = await getResponse.json();
      logger.info("GET profiling test result:", getData);

      // Test POST endpoint
      const postResponse = await fetch("/api/sentry-example-api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          test: true,
          message: "Profiling test data",
          timestamp: new Date().toISOString(),
        }),
      });
      const postData = await postResponse.json();
      logger.info("POST profiling test result:", postData);
    } catch (error) {
      logger.error("Error testing profiling:", error);
    }
  };

  const testBrowserProfiling = async () => {
    try {
      logger.info("Testing browser-side Sentry profiling...");

      // Example 1: Profile a client-side operation
      await Sentry.startSpan(
        {
          name: "Client-side Data Processing",
          op: "function",
        },
        async () => {
          // Simulate some client-side work
          await new Promise((resolve) => setTimeout(resolve, 100));

          // Simulate data processing
          const data = Array.from({ length: 1000 }, (_, i) => ({
            id: i,
            value: Math.random() * 100,
          }));

          logger.info("Client-side data processing completed", {
            itemCount: data.length,
          });
          return data;
        }
      );

      // Example 2: Profile DOM manipulation
      await Sentry.startSpan(
        {
          name: "DOM Manipulation",
          op: "ui.render",
        },
        async () => {
          // Simulate DOM work
          await new Promise((resolve) => setTimeout(resolve, 50));

          // Create a temporary element to simulate DOM work
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = "Profiling test element";
          document.body.appendChild(tempDiv);

          // Remove it after a short delay
          setTimeout(() => {
            document.body.removeChild(tempDiv);
          }, 100);

          logger.info("DOM manipulation completed");
        }
      );

      // Example 3: Profile multiple async operations
      const results = await Promise.all([
        Sentry.startSpan(
          { name: "Async Operation 1", op: "function" },
          async () => {
            await new Promise((resolve) => setTimeout(resolve, 80));
            return "Result 1";
          }
        ),
        Sentry.startSpan(
          { name: "Async Operation 2", op: "function" },
          async () => {
            await new Promise((resolve) => setTimeout(resolve, 120));
            return "Result 2";
          }
        ),
        Sentry.startSpan(
          { name: "Async Operation 3", op: "function" },
          async () => {
            await new Promise((resolve) => setTimeout(resolve, 60));
            return "Result 3";
          }
        ),
      ]);

      logger.info("All browser profiling operations completed", { results });
    } catch (error) {
      logger.error("Error testing browser profiling:", error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        Sentry Logger Integration Test
      </h1>
      <p className="mb-4">
        This page tests the integration between your existing logger and Sentry.
        Use the buttons below to test both logging and profiling functionality.
      </p>
      <div className="space-x-4">
        <button
          onClick={testLogging}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Test Logger Integration
        </button>
        <button
          onClick={testProfiling}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Test Server Profiling
        </button>
        <button
          onClick={testBrowserProfiling}
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Test Browser Profiling
        </button>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h2 className="font-bold mb-2">
          What happens when you click the buttons:
        </h2>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Logger Integration Test:</h3>
          <ul className="list-disc list-inside text-sm">
            <li>Messages will appear in your browser console</li>
            <li>
              Messages will also be sent to Sentry with additional metadata
            </li>
            <li>
              Each log includes a 'log_source: devLogger' tag for easy filtering
              in Sentry
            </li>
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Server Profiling Test:</h3>
          <ul className="list-disc list-inside text-sm">
            <li>Creates performance spans for API operations</li>
            <li>Profiles database queries and external API calls</li>
            <li>Captures timing data for performance analysis</li>
            <li>
              View profiling data in your Sentry dashboard under "Performance"
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Browser Profiling Test:</h3>
          <ul className="list-disc list-inside text-sm">
            <li>Profiles client-side JavaScript operations</li>
            <li>Captures DOM manipulation and data processing</li>
            <li>Monitors async operations and Promise.all execution</li>
            <li>Requires Document-Policy header (already configured)</li>
            <li>View browser profiling data in Sentry Performance section</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
