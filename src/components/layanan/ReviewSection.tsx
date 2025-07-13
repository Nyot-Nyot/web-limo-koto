import React, { memo, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const ReviewSection = memo(() => {
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!review.trim()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: review.trim(),
          type: "layanan",
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setReview("");
        setTimeout(() => setSubmitStatus("idle"), 3000);
      } else {
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus("idle"), 3000);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-white font-semibold mb-3">
            Masukan & Saran
          </label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full bg-white/20 border border-white/30 rounded-lg p-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={5}
            placeholder="Bagikan masukan, saran, atau keluhan Anda tentang layanan kami..."
            required
            disabled={isSubmitting}
          />
          <p className="text-xs text-gray-400 mt-2">
            Masukan Anda akan membantu kami meningkatkan kualitas layanan
          </p>
        </div>

        {/* Status Messages */}
        {submitStatus === "success" && (
          <div className="bg-green-500/20 border border-green-500/30 text-green-300 p-3 rounded-lg text-sm">
            ✓ Terima kasih! Masukan Anda telah berhasil dikirim.
          </div>
        )}

        {submitStatus === "error" && (
          <div className="bg-red-500/20 border border-red-500/30 text-red-300 p-3 rounded-lg text-sm">
            ✗ Terjadi kesalahan. Silakan coba lagi.
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !review.trim()}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
        >
          <FaPaperPlane className="text-sm" />
          {isSubmitting ? "Mengirim..." : "Kirim Masukan"}
        </button>
      </form>
    </div>
  );
});

ReviewSection.displayName = "ReviewSection";

export default ReviewSection;
