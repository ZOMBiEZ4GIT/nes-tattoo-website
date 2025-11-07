"use client";

import { useState } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Parallax from "@/components/Parallax";

interface BookingData {
  size?: string;
  location?: string;
  locationOther?: string;
  dates: string[];
  times: string[];
  flexibleTiming: boolean;
  name?: string;
  email?: string;
  phone?: string;
  notes?: string;
}

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BookingData>({
    dates: [],
    times: [],
    flexibleTiming: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps + 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // If this is the review step, submit to API
    if (currentStep === totalSteps) {
      setIsSubmitting(true);
      setSubmitError(null);

      try {
        const response = await fetch("/api/booking", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (data.success) {
          nextStep(); // Move to success screen
        } else {
          setSubmitError(data.message || "Failed to submit booking. Please try again.");
        }
      } catch (error) {
        console.error("Booking submission error:", error);
        setSubmitError("An unexpected error occurred. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      nextStep();
    }
  };

  const handleTimeToggle = (time: string) => {
    setFormData(prev => {
      const newTimes = prev.times.includes(time)
        ? prev.times.filter(t => t !== time)
        : [...prev.times, time];
      return { ...prev, times: newTimes };
    });
  };

  return (
    <>
      <Navigation />

      <main className="min-h-screen pt-20 pb-12 bg-white">
        {/* Progress Indicator */}
        {currentStep <= totalSteps && (
          <div className="fixed top-20 left-0 right-0 z-40 bg-white border-b border-gray-light">
            <div className="max-w-[600px] mx-auto px-8 py-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray">
                  Step {currentStep} of {totalSteps}
                </span>
                <span className="text-sm font-medium text-gray">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="w-full h-1 bg-gray-light">
                <div
                  className="h-full bg-black transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="max-w-[600px] mx-auto px-8" style={{ paddingTop: currentStep <= totalSteps ? "120px" : "80px" }}>

          {/* Step 1: Size */}
          {currentStep === 1 && (
            <Parallax speed={0.5} direction="up">
              <form onSubmit={handleSubmit} className="animate-fadeIn">
                <h1 className="font-serif text-[clamp(2.5rem,6vw,3.5rem)] font-light mb-6 text-black text-center">
                  Book Your Tattoo
                </h1>
                <p className="text-lg text-gray mb-16 leading-relaxed text-center">
                  How big are you thinking?
                </p>

                <div className="space-y-4 mb-12">
                  {[
                    { value: "Small (under 10cm)", label: "Small", desc: "Under 10cm" },
                    { value: "Medium (10-20cm)", label: "Medium", desc: "10-20cm" },
                    { value: "Large (20cm+)", label: "Large", desc: "20cm+" },
                    { value: "I'm not sure", label: "I'm not sure", desc: "We can discuss this together" },
                  ].map((size) => (
                    <label
                      key={size.value}
                      className="flex items-center p-6 border border-gray-light hover:border-black cursor-pointer transition-colors duration-200"
                    >
                      <input
                        type="radio"
                        name="size"
                        value={size.value}
                        onChange={(e) =>
                          setFormData({ ...formData, size: e.target.value })
                        }
                        className="mr-4 w-5 h-5"
                        required
                      />
                      <div>
                        <div className="text-lg text-black font-medium">{size.label}</div>
                        <div className="text-sm text-gray">{size.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-black text-white hover:opacity-90 transition-opacity duration-200"
                >
                  Next
                </button>
              </form>
            </Parallax>
          )}

          {/* Step 2: Location */}
          {currentStep === 2 && (
            <Parallax speed={0.5} direction="up">
              <form onSubmit={handleSubmit} className="animate-fadeIn">
                <h2 className="font-serif text-[clamp(2rem,5vw,2.5rem)] font-light mb-6 text-black text-center">
                  Where on your body?
                </h2>
                <p className="text-base text-gray mb-12 text-center">
                  Select the general area
                </p>

                <div className="space-y-4 mb-12">
                  {[
                    "Arm",
                    "Leg",
                    "Chest",
                    "Back",
                    "Other",
                    "I'm not sure",
                  ].map((location) => (
                    <label
                      key={location}
                      className="flex items-center p-6 border border-gray-light hover:border-black cursor-pointer transition-colors duration-200"
                    >
                      <input
                        type="radio"
                        name="location"
                        value={location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        className="mr-4 w-5 h-5"
                        required
                      />
                      <span className="text-lg text-black">{location}</span>
                    </label>
                  ))}
                </div>

                {formData.location === "Other" && (
                  <div className="mb-12">
                    <label className="block text-sm font-medium text-black mb-3">
                      Please specify the location
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-black"
                      placeholder="e.g., shoulder, wrist, ankle..."
                      onChange={(e) =>
                        setFormData({ ...formData, locationOther: e.target.value })
                      }
                      required
                    />
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 px-8 py-4 border-2 border-black text-black hover:bg-black hover:text-white transition-colors duration-200"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-8 py-4 bg-black text-white hover:opacity-90 transition-opacity duration-200"
                  >
                    Next
                  </button>
                </div>
              </form>
            </Parallax>
          )}

          {/* Step 3: Date & Time Preferences */}
          {currentStep === 3 && (
            <Parallax speed={0.5} direction="up">
              <form onSubmit={handleSubmit} className="animate-fadeIn">
                <h2 className="font-serif text-[clamp(2rem,5vw,2.5rem)] font-light mb-6 text-black text-center">
                  When works for you?
                </h2>
                <p className="text-base text-gray mb-12 text-center">
                  Select preferred dates and times
                </p>

                <div className="mb-8">
                  <label className="block text-sm font-medium text-black mb-4">
                    Preferred Dates (select 1-3 options)
                  </label>
                  <div className="space-y-4">
                    <input
                      type="date"
                      className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-black"
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => {
                        const newDates = [...formData.dates];
                        newDates[0] = e.target.value;
                        setFormData({ ...formData, dates: newDates });
                      }}
                      required
                    />
                    <input
                      type="date"
                      className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-black"
                      min={new Date().toISOString().split('T')[0]}
                      placeholder="Optional"
                      onChange={(e) => {
                        const newDates = [...formData.dates];
                        newDates[1] = e.target.value;
                        setFormData({ ...formData, dates: newDates });
                      }}
                    />
                    <input
                      type="date"
                      className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-black"
                      min={new Date().toISOString().split('T')[0]}
                      placeholder="Optional"
                      onChange={(e) => {
                        const newDates = [...formData.dates];
                        newDates[2] = e.target.value;
                        setFormData({ ...formData, dates: newDates });
                      }}
                    />
                  </div>
                </div>

                <div className="mb-12">
                  <label className="block text-sm font-medium text-black mb-4">
                    Preferred Times (select all that work)
                  </label>
                  <div className="space-y-3">
                    {["Morning (9am-12pm)", "Afternoon (12pm-5pm)", "Evening (5pm-8pm)"].map((time) => (
                      <label
                        key={time}
                        className="flex items-center p-4 border border-gray-light hover:border-black cursor-pointer transition-colors duration-200"
                      >
                        <input
                          type="checkbox"
                          checked={formData.times.includes(time)}
                          onChange={() => handleTimeToggle(time)}
                          className="mr-4 w-5 h-5"
                        />
                        <span className="text-base text-black">{time}</span>
                      </label>
                    ))}
                  </div>

                  <label className="flex items-center mt-4 p-4 border border-gray-light hover:border-black cursor-pointer transition-colors duration-200">
                    <input
                      type="checkbox"
                      checked={formData.flexibleTiming}
                      onChange={(e) =>
                        setFormData({ ...formData, flexibleTiming: e.target.checked })
                      }
                      className="mr-4 w-5 h-5"
                    />
                    <span className="text-base text-black">I'm flexible with timing</span>
                  </label>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 px-8 py-4 border-2 border-black text-black hover:bg-black hover:text-white transition-colors duration-200"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-8 py-4 bg-black text-white hover:opacity-90 transition-opacity duration-200"
                  >
                    Next
                  </button>
                </div>
              </form>
            </Parallax>
          )}

          {/* Step 4: Contact Info */}
          {currentStep === 4 && (
            <Parallax speed={0.5} direction="up">
              <form onSubmit={handleSubmit} className="animate-fadeIn">
                <h2 className="font-serif text-[clamp(2rem,5vw,2.5rem)] font-light mb-6 text-black text-center">
                  How can I reach you?
                </h2>
                <p className="text-base text-gray mb-12 text-center">
                  Your contact information
                </p>

                <div className="space-y-6 mb-12">
                  <div>
                    <label className="block text-sm font-medium text-black mb-3">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-black"
                      placeholder="Your name"
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-3">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-black"
                      placeholder="your@email.com"
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-3">
                      Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-black"
                      placeholder="0400 000 000"
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-3">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-black resize-none"
                      placeholder="Any additional information about your tattoo idea, reference images, or questions..."
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 px-8 py-4 border-2 border-black text-black hover:bg-black hover:text-white transition-colors duration-200"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-8 py-4 bg-black text-white hover:opacity-90 transition-opacity duration-200"
                  >
                    Next
                  </button>
                </div>
              </form>
            </Parallax>
          )}

          {/* Step 5: Review */}
          {currentStep === 5 && (
            <div className="animate-fadeIn">
              <h2 className="font-serif text-[clamp(2rem,5vw,2.5rem)] font-light mb-6 text-black text-center">
                Review your booking
              </h2>
              <p className="text-base text-gray mb-12 text-center">
                Make sure everything looks good before submitting
              </p>

              <div className="mb-12 space-y-6">
                <div className="border-t border-gray-light pt-6">
                  <h3 className="text-sm font-medium text-black mb-4 uppercase tracking-wider">
                    Tattoo Details
                  </h3>
                  <div className="space-y-3">
                    {formData.size && (
                      <div className="flex justify-between">
                        <span className="text-gray text-sm">Size</span>
                        <span className="text-black font-medium">{formData.size}</span>
                      </div>
                    )}
                    {formData.location && (
                      <div className="flex justify-between">
                        <span className="text-gray text-sm">Location</span>
                        <span className="text-black font-medium">
                          {formData.location === "Other" ? formData.locationOther : formData.location}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {formData.dates.filter(d => d).length > 0 && (
                  <div className="border-t border-gray-light pt-6">
                    <h3 className="text-sm font-medium text-black mb-4 uppercase tracking-wider">
                      Preferred Dates
                    </h3>
                    <div className="space-y-3">
                      {formData.dates.filter(d => d).map((date, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span className="text-gray text-sm">Option {idx + 1}</span>
                          <span className="text-black font-medium">
                            {new Date(date).toLocaleDateString('en-AU', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {(formData.times.length > 0 || formData.flexibleTiming) && (
                  <div className="border-t border-gray-light pt-6">
                    <h3 className="text-sm font-medium text-black mb-4 uppercase tracking-wider">
                      Preferred Times
                    </h3>
                    {formData.flexibleTiming ? (
                      <p className="text-black font-medium">Flexible with timing</p>
                    ) : (
                      <div className="space-y-2">
                        {formData.times.map((time, idx) => (
                          <p key={idx} className="text-black font-medium">{time}</p>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="border-t border-gray-light pt-6">
                  <h3 className="text-sm font-medium text-black mb-4 uppercase tracking-wider">
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    {formData.name && (
                      <div className="flex justify-between">
                        <span className="text-gray text-sm">Name</span>
                        <span className="text-black font-medium">{formData.name}</span>
                      </div>
                    )}
                    {formData.email && (
                      <div className="flex justify-between">
                        <span className="text-gray text-sm">Email</span>
                        <span className="text-black font-medium">{formData.email}</span>
                      </div>
                    )}
                    {formData.phone && (
                      <div className="flex justify-between">
                        <span className="text-gray text-sm">Phone</span>
                        <span className="text-black font-medium">{formData.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                {formData.notes && (
                  <div className="border-t border-gray-light pt-6">
                    <h3 className="text-sm font-medium text-black mb-4 uppercase tracking-wider">
                      Additional Notes
                    </h3>
                    <p className="text-black">{formData.notes}</p>
                  </div>
                )}
              </div>

              {submitError && (
                <div className="mb-8 p-6 border-2 border-black bg-white">
                  <p className="text-sm text-black font-medium">{submitError}</p>
                </div>
              )}

              <div className="mb-8 p-6 border border-gray-light bg-white">
                <p className="text-sm text-gray">
                  Once you submit, I'll review your request and get back to you within 24-48 hours
                  to confirm availability and discuss the next steps.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 px-8 py-4 border-2 border-black text-black hover:bg-black hover:text-white transition-colors duration-200"
                  disabled={isSubmitting}
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 px-8 py-4 bg-black text-white hover:opacity-90 transition-opacity duration-200 disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Booking"}
                </button>
              </div>
            </div>
          )}

          {/* Success Screen */}
          {currentStep === totalSteps + 1 && (
            <div className="text-center py-20 animate-fadeIn">
              <div className="mb-8">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-black flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="font-serif text-[clamp(2.5rem,6vw,3.5rem)] font-light mb-6 text-black">
                  Request Received!
                </h2>
                <p className="text-lg text-gray mb-12 max-w-md mx-auto">
                  Thanks for your booking request. I'll review your information
                  and get back to you within 24 hours.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="px-8 py-4 border-2 border-black text-black hover:bg-black hover:text-white transition-colors duration-200 text-center"
                >
                  Back to Home
                </Link>
                <Link
                  href="/portfolio"
                  className="px-8 py-4 bg-black text-white hover:opacity-90 transition-opacity duration-200 text-center"
                >
                  View Portfolio
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </>
  );
}
