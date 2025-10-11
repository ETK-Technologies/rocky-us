import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { logger } from "@/utils/devLogger";

export async function GET(request) {
  // Example 1: Automatic profiling with Sentry.startSpan
  return Sentry.startSpan(
    {
      name: "API Route Handler",
      op: "http.server",
    },
    async () => {
      try {
        logger.info("Starting API route handler");

        // Example 2: Nested span for specific operations
        const result = await Sentry.startSpan(
          {
            name: "Database Query Simulation",
            op: "db.query",
          },
          async () => {
            // Simulate some work that you want to profile
            await new Promise((resolve) => setTimeout(resolve, 100));

            // Simulate database query
            const data = {
              users: [
                { id: 1, name: "John Doe" },
                { id: 2, name: "Jane Smith" },
              ],
            };

            logger.info("Database query completed", {
              userCount: data.users.length,
            });
            return data;
          }
        );

        // Example 3: Another nested span for external API call
        const externalData = await Sentry.startSpan(
          {
            name: "External API Call",
            op: "http.client",
          },
          async () => {
            // Simulate external API call
            await new Promise((resolve) => setTimeout(resolve, 200));

            logger.info("External API call completed");
            return { status: "success", data: "external data" };
          }
        );

        logger.info("API route handler completed successfully");

        return NextResponse.json({
          success: true,
          data: result,
          external: externalData,
          message: "Profiling example completed",
        });
      } catch (error) {
        logger.error("Error in API route handler", error);

        // Sentry will automatically capture this error with profiling context
        Sentry.captureException(error);

        return NextResponse.json(
          { error: "Internal server error" },
          { status: 500 }
        );
      }
    }
  );
}

export async function POST(request) {
  // Example of profiling with custom spans
  return Sentry.startSpan(
    {
      name: "POST Request Handler",
      op: "http.server",
    },
    async () => {
      try {
        const body = await request.json();
        logger.info("Processing POST request", { body });

        // Example: Profile data processing
        const processedData = await Sentry.startSpan(
          {
            name: "Data Processing",
            op: "function",
          },
          async () => {
            // Simulate data processing
            await new Promise((resolve) => setTimeout(resolve, 150));

            const processed = {
              ...body,
              processedAt: new Date().toISOString(),
              processedBy: "sentry-profiling-example",
            };

            logger.info("Data processing completed", { processed });
            return processed;
          }
        );

        return NextResponse.json({
          success: true,
          processedData,
          message: "POST request processed with profiling",
        });
      } catch (error) {
        logger.error("Error processing POST request", error);
        Sentry.captureException(error);

        return NextResponse.json(
          { error: "Failed to process request" },
          { status: 500 }
        );
      }
    }
  );
}
