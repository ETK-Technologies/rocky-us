import React, { useEffect } from 'react';

const AppointmentBooking = ({ 
  formData, 
  onSelect, 
  userName = "", 
  userEmail = "", 
  phoneNumber = "",
  province = ""
}) => {
  
  const handleCalendlyEvent = (e) => {
    if (e.data.event && e.data.event.indexOf("calendly") === 0) {
      if (e.data.event === "calendly.event_scheduled") {
        const eventType = e.data?.payload?.event?.invitee_event_type || "";
        const eventDate = e.data?.payload?.event?.start_time_pretty || "";
        
        onSelect && onSelect(true, "calendly_booking_completed");
        onSelect && onSelect(eventDate, "calendly_booking_date");
        onSelect && onSelect(eventType, "calendly_booking_event_type");
      }
    }
  };
  const getCalendlyLink = () => {
    const lowerProvince = province?.toLowerCase() || "";
    
    if (lowerProvince === "Quebec" || lowerProvince === "Saskatchewan" || 
        lowerProvince === "QC" || lowerProvince === "SK") {
      return "https://calendly.com/corey-myrocky/15-minutes-consultation-call";
    } else if (lowerProvince === "Alberta" || lowerProvince === "AB") {
      return "https://calendly.com/catherine-myrocky/15-minutes-consultation-call";
    } else {
      return "https://calendly.com/rockyhealth/follow-up-call-with-physician";
    }
  };

  useEffect(() => {
    window.addEventListener("message", handleCalendlyEvent);
    
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      window.removeEventListener("message", handleCalendlyEvent);
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="w-full md:max-w-[520px] mx-auto">
      <div className="pt-6 pb-4">
        <h1 className="text-3xl text-center text-[#AE7E56] font-bold mb-6">
          Book your appointment
        </h1>
        <h3 className="text-lg text-center font-medium mb-4">
          Schedule a consultation with one of our healthcare professionals
        </h3>

        <div className="flex flex-col items-center justify-center mb-6">
          {formData.calendly_booking_completed ? (
            <div className="h-full flex flex-col items-center justify-center p-4">
              <div className="bg-green-100 border border-green-400 text-green-700 rounded p-4 w-full max-w-md">
                <svg
                  className="w-16 h-16 mx-auto text-green-500 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h3 className="text-xl font-semibold text-center mb-2">
                  Appointment Scheduled!
                </h3>
                {formData.calendly_booking_date && (
                  <p className="text-center mb-4">
                    Your appointment is scheduled for{" "}
                    <strong>{formData.calendly_booking_date}</strong>
                  </p>
                )}
                <p className="text-center">
                  You will receive a confirmation email with the details.
                </p>
                <button
                  onClick={() => {
                    onSelect(false, "calendly_booking_completed");
                    onSelect("", "calendly_booking_date");
                    onSelect("", "calendly_booking_event_type");
                  }}
                  className="mt-4 text-sm underline text-green-800 hover:text-green-900"
                >
                  Change appointment
                </button>
              </div>
            </div>
          ) : (            <div
              className="calendly-inline-widget"
              data-url={`${getCalendlyLink()}?primary_color=a7885a&name=${
                userName || ""
              }&email=${userEmail || ""}&location=+1${
                phoneNumber || ""
              }`}
              style={{ minWidth: "320px", height: "700px", width: "100%" }}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;
