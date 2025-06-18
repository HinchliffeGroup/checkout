import { useState } from "react";

export default function Checkout() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No URL returned");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Hinchliffe Group Checkout</h1>
      <p>Select your package and complete payment securely.</p>
      <button
        onClick={handleCheckout}
        disabled={loading}
        style={{
          marginTop: "20px",
          padding: "12px 24px",
          fontSize: "16px",
          backgroundColor: "#000",
          color: "#FFD700",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {loading ? "Redirecting..." : "Proceed to Checkout"}
      </button>
    </div>
  );
}
