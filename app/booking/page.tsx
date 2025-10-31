"use client";

import { useState } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Parallax from "@/components/Parallax";

type BookingPath = "custom" | "coverup" | null;

interface BookingData {
  bookingType: BookingPath;
  style?: string;
  designDescription?: string;
  coverupPhoto?: string;
  coverupStyle?: string;
  coverupDescription?: string;
  size?: string;
  placement?: string;
  dates: string[];
  name?: string;
  email?: string;
  phone?: string;
}

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingPath, setBookingPath] = useState<BookingPath>(null);
  const [formData, setFormData] = useState<BookingData>({
    bookingType: null,
    dates: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState<string | null>(null);

  const totalSteps = bookingPath === "coverup" ? 7 : 6;
  const progress = (currentStep / totalSteps) * 100;

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadFormData = new FormData();
    uploadFormData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      const data = await response.json();

      if (data.success) {
        setUploadedPhotoUrl(data.url);
        setFormData({ ...formData, coverupPhoto: data.url });
      } else {
        alert("Failed to upload photo: " + data.message);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload photo. Please try again.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // If this is the final step, submit to API
    if (currentStep === totalSteps - 1) {
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

  return (
    <>
      <Navigation />

      <main className="min-h-screen pt-20 pb-12 bg-white">
        {/* Progress Indicator */}
        {bookingPath && (
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
        <div className="max-w-[600px] mx-auto px-8" style={{ paddingTop: bookingPath ? "120px" : "80px" }}>
          {/* Step 1: Choose Path */}
          {currentStep === 1 && (
            <Parallax speed={0.5} direction="up">
              <div className="text-center animate-fadeIn">
                <h1 className="font-serif text-[clamp(2.5rem,6vw,3.5rem)] font-light mb-6 text-black">
                  Book Your Session
                </h1>
                <p className="text-lg text-gray mb-16 leading-relaxed">
                  What type of work are you interested in?
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  <button
                    onClick={() => {
                      setBookingPath("custom");
                      setFormData({ ...formData, bookingType: "custom" });
                      nextStep();
                    }}
                    className="p-12 border-2 border-gray-light hover:border-black transition-all duration-200 text-left group"
                  >
                    <h3 className="font-serif text-2xl font-normal mb-4 text-black">
                      Custom Work
                    </h3>
                    <p className="text-base text-gray leading-relaxed">
                      Original design created specifically for you
                    </p>
                  </button>

                  <button
                    onClick={() => {
                      setBookingPath("coverup");
                      setFormData({ ...formData, bookingType: "coverup" });
                      nextStep();
                    }}
                    className="p-12 border-2 border-gray-light hover:border-black transition-all duration-200 text-left group"
                  >
                    <h3 className="font-serif text-2xl font-normal mb-4 text-black">
                      Cover-Up
                    </h3>
                    <p className="text-base text-gray leading-relaxed">
                      Transform an existing tattoo
                    </p>
                  </button>
                </div>
              </div>
            </Parallax>
          )}

          {/* Step 2: Style Preference (Custom) */}
          {currentStep === 2 && bookingPath === "custom" && (
            <Parallax speed={0.5} direction="up">
              <form onSubmit={handleSubmit} className="animate-fadeIn">
                <h2 className="font-serif text-[clamp(2rem,5vw,2.5rem)] font-light mb-6 text-black text-center">
                  What&apos;s your style preference?
                </h2>
                <p className="text-base text-gray mb-12 text-center">
                  Select the style that best matches your vision
                </p>

              <div className="space-y-4 mb-12">
                {["Minimalist", "Geometric", "Traditional", "Blackwork", "Other"].map((style) => (
                  <label
                    key={style}
                    className="flex items-center p-6 border border-gray-light hover:border-black cursor-pointer transition-colors duration-200"
                  >
                    <input
                      type="radio"
                      name="style"
                      value={style}
                      onChange={(e) =>
                        setFormData({ ...formData, style: e.target.value })
                      }
                      className="mr-4 w-5 h-5"
                      required
                    />
                    <span className="text-lg text-black">{style}</span>
                  </label>
                ))}
              </div>

              <div className="mb-12">
                <label className="block text-sm font-medium text-black mb-3">
                  Describe your design idea
                </label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-black resize-none"
                  placeholder="Tell me about your vision..."
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      designDescription: e.target.value,
                    })
                  }
                  required
                />
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

          {/* Step 2: Photo Upload (Cover-Up) */}
          {currentStep === 2 && bookingPath === "coverup" && (
            <form onSubmit={handleSubmit} className="animate-fadeIn">
              <h2 className="font-serif text-[clamp(2rem,5vw,2.5rem)] font-light mb-6 text-black text-center">
                Upload a photo of your current tattoo
              </h2>
              <p className="text-base text-gray mb-12 text-center">
                This helps me understand what we&apos;re working with
              </p>

              <div className="mb-12">
                <div className="border-2 border-dashed border-gray-light p-16 text-center hover:border-black transition-colors duration-200">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="photo-upload"
                    onChange={handleFileUpload}
                  />
                  <label
                    htmlFor="photo-upload"
                    className="cursor-pointer block"
                  >
                    {uploadedPhotoUrl ? (
                      <div>
                        <img
                          src={uploadedPhotoUrl}
                          alt="Uploaded cover-up photo"
                          className="max-w-full max-h-64 mx-auto mb-4 object-contain"
                        />
                        <p className="text-sm text-gray">
                          Photo uploaded successfully. Click to change.
                        </p>
                      </div>
                    ) : (
                      <div className="text-gray mb-4">
                        <svg
                          className="w-12 h-12 mx-auto mb-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p className="text-lg text-black mb-2">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-sm text-gray">
                          JPG or PNG (max 10MB)
                        </p>
                      </div>
                    )}
                  </label>
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
          )}

          {/* Step 3: Cover-Up Style (Cover-Up Path Only) */}
          {currentStep === 3 && bookingPath === "coverup" && (
            <form onSubmit={handleSubmit} className="animate-fadeIn">
              <h2 className="font-serif text-[clamp(2rem,5vw,2.5rem)] font-light mb-6 text-black text-center">
                What style for the cover-up?
              </h2>
              <p className="text-base text-gray mb-12 text-center">
                Choose the direction for your new design
              </p>

              <div className="space-y-4 mb-12">
                {["Minimalist", "Geometric", "Traditional", "Blackwork", "Other"].map((style) => (
                  <label
                    key={style}
                    className="flex items-center p-6 border border-gray-light hover:border-black cursor-pointer transition-colors duration-200"
                  >
                    <input
                      type="radio"
                      name="coverupStyle"
                      value={style}
                      onChange={(e) =>
                        setFormData({ ...formData, coverupStyle: e.target.value })
                      }
                      className="mr-4 w-5 h-5"
                      required
                    />
                    <span className="text-lg text-black">{style}</span>
                  </label>
                ))}
              </div>

              <div className="mb-12">
                <label className="block text-sm font-medium text-black mb-3">
                  Cover-up design ideas (optional)
                </label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-black resize-none"
                  placeholder="Any specific ideas for the cover-up..."
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      coverupDescription: e.target.value,
                    })
                  }
                />
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
          )}

          {/* Step 3/4: Size & Placement */}
          {((currentStep === 3 && bookingPath === "custom") || (currentStep === 4 && bookingPath === "coverup")) && (
            <form onSubmit={handleSubmit} className="animate-fadeIn">
              <h2 className="font-serif text-[clamp(2rem,5vw,2.5rem)] font-light mb-6 text-black text-center">
                Size & Placement
              </h2>
              <p className="text-base text-gray mb-12 text-center">
                Tell me about where and how big
              </p>

              <div className="mb-8">
                <label className="block text-sm font-medium text-black mb-3">
                  Approximate Size
                </label>
                <select
                  className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-black"
                  onChange={(e) =>
                    setFormData({ ...formData, size: e.target.value })
                  }
                  required
                >
                  <option value="">Select a size...</option>
                  <option value="Small (2-4 inches)">Small (2-4 inches)</option>
                  <option value="Medium (4-8 inches)">Medium (4-8 inches)</option>
                  <option value="Large (8-12 inches)">Large (8-12 inches)</option>
                  <option value="Extra Large (12+ inches)">Extra Large (12+ inches)</option>
                </select>
              </div>

              <div className="mb-12">
                <label className="block text-sm font-medium text-black mb-3">
                  Body Placement
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-black"
                  placeholder="e.g., forearm, shoulder, calf..."
                  onChange={(e) =>
                    setFormData({ ...formData, placement: e.target.value })
                  }
                  required
                />
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
          )}

          {/* Step 4/5: Preferred Dates */}
          {((currentStep === 4 && bookingPath === "custom") || (currentStep === 5 && bookingPath === "coverup")) && (
            <form onSubmit={handleSubmit} className="animate-fadeIn">
              <h2 className="font-serif text-[clamp(2rem,5vw,2.5rem)] font-light mb-6 text-black text-center">
                When works for you?
              </h2>
              <p className="text-base text-gray mb-12 text-center">
                Give me 2-3 date options and I&apos;ll get back to you
              </p>

              <div className="space-y-6 mb-12">
                <div>
                  <label className="block text-sm font-medium text-black mb-3">
                    Option 1 (Required)
                  </label>
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
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-3">
                    Option 2 (Optional)
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-black"
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => {
                      const newDates = [...formData.dates];
                      newDates[1] = e.target.value;
                      setFormData({ ...formData, dates: newDates });
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-3">
                    Option 3 (Optional)
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-black"
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => {
                      const newDates = [...formData.dates];
                      newDates[2] = e.target.value;
                      setFormData({ ...formData, dates: newDates });
                    }}
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
          )}

          {/* Step 5/6: Contact Info */}
          {((currentStep === 5 && bookingPath === "custom") || (currentStep === 6 && bookingPath === "coverup")) && (
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
                    placeholder="(555) 123-4567"
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
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
          )}

          {/* Step 6/7: Review */}
          {((currentStep === 6 && bookingPath === "custom") || (currentStep === 7 && bookingPath === "coverup")) && currentStep < totalSteps && (
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
                    Booking Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray text-sm">Type</span>
                      <span className="text-black font-medium">
                        {formData.bookingType === "custom" ? "Custom Work" : "Cover-Up"}
                      </span>
                    </div>
                    {formData.style && (
                      <div className="flex justify-between">
                        <span className="text-gray text-sm">Style</span>
                        <span className="text-black font-medium">{formData.style}</span>
                      </div>
                    )}
                    {formData.coverupStyle && (
                      <div className="flex justify-between">
                        <span className="text-gray text-sm">Cover-Up Style</span>
                        <span className="text-black font-medium">{formData.coverupStyle}</span>
                      </div>
                    )}
                    {formData.size && (
                      <div className="flex justify-between">
                        <span className="text-gray text-sm">Size</span>
                        <span className="text-black font-medium">{formData.size}</span>
                      </div>
                    )}
                    {formData.placement && (
                      <div className="flex justify-between">
                        <span className="text-gray text-sm">Placement</span>
                        <span className="text-black font-medium">{formData.placement}</span>
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
                            {new Date(date).toLocaleDateString('en-US', {
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
              </div>

              {submitError && (
                <div className="mb-8 p-6 border-2 border-black bg-white">
                  <p className="text-sm text-black font-medium">{submitError}</p>
                </div>
              )}

              <div className="mb-8 p-6 border border-gray-light bg-white">
                <p className="text-sm text-gray">
                  Once you submit, I&apos;ll review your request and get back to you within 24-48 hours
                  to confirm availability and discuss deposit details.
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
          {currentStep === totalSteps && (
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
                  Thanks for your booking request. I&apos;ll review your information
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
