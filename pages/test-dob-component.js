import React from "react";
import { logger } from "@/utils/devLogger";
import DOBInput from "../components/shared/DOBInput";

export default function TestDOBComponent() {
  const [dobValue, setDobValue] = React.useState("");

  const handleDobChange = (value) => {
    logger.log("DOB changed to:", value);
    setDobValue(value);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h1>DOB Input Test Page</h1>
      <p>
        This page tests the manual typing functionality of the DOB input field.
      </p>

      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="test-dob"
          style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
        >
          Date of Birth (MM/DD/YYYY):
        </label>
        <DOBInput
          value={dobValue}
          onChange={handleDobChange}
          className="w-full p-3 border border-gray-300 rounded-lg text-center bg-white"
          placeholder="MM/DD/YYYY"
          minAge={18}
          required
          id="test-dob"
          name="test-dob"
        />
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#f5f5f5",
          borderRadius: "5px",
        }}
      >
        <h3>Current Value:</h3>
        <p>
          <strong>Display Value:</strong> {dobValue || "None"}
        </p>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Test Instructions:</h3>
        <ol>
          <li>Click in the DOB field above</li>
          <li>Type a date like "12/25/1990"</li>
          <li>Verify it doesn't reset to "02/01/2001"</li>
          <li>Verify it formats correctly as you type</li>
          <li>Verify age validation works (18+ required)</li>
          <li>Verify NO calendar icon appears (manual typing only)</li>
        </ol>
      </div>
    </div>
  );
}
