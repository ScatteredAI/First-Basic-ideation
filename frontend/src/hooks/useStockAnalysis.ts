import { useState } from "react";
import axios from "axios";
import type { AnalysisData } from "../types/stock";

const useStockAnalysis = () => {
  const [ticker, setTicker] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<AnalysisData | null>(null);

  const handleAnalyze = async () => {
    if (!ticker.trim()) {
      setError("Please enter a stock ticker");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `http://localhost:8000/api/analyze/?ticker=${ticker.toUpperCase()}`
      );
      setData({
        ...response.data,
        recommendationDetails: response.data.recommendation_details,
      });
    } catch (err) {
      console.error("Analysis error:", err);
      setError(
        axios.isAxiosError(err)
          ? err.response?.data?.detail || err.message
          : "Failed to analyze stock"
      );
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAnalyze();
    }
  };

  return {
    ticker,
    setTicker,
    loading,
    error,
    data,
    handleAnalyze,
    handleKeyDown,
  };
};

export default useStockAnalysis;
