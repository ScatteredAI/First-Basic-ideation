// React Frontend for AI Investment Analyst

import React, { useState } from "react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { motion } from "framer-motion";
import axios from "axios";

export default function Home() {
  const [ticker, setTicker] = useState("");
  const [loading, setLoading] = useState(false);
  type AnalysisData = {
    ticker: string;
    summary: { [key: string]: string };
    recommendation: string;
  };
  const [data, setData] = useState<AnalysisData | null>(null);

  const handleAnalyze = async () => {
    if (!ticker) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8000/api/analyze/?ticker=${ticker.toUpperCase()}`
      );
      setData(res.data);
    } catch (err) {
      console.error(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-6"
      >
        AI Investment Analyst
      </motion.h1>

      <div className="flex gap-2 w-full max-w-xl">
        <Input
          placeholder="Enter stock ticker (e.g., AAPL)"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
        />
        <Button onClick={handleAnalyze} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze"}
        </Button>
      </div>

      {data && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 w-full max-w-2xl"
        >
          <Card className="p-4">
            <CardContent>
              <h2 className="text-xl font-semibold mb-4">
                {data.ticker} – {data.summary.Company}
              </h2>
              <div className="space-y-2">
                {Object.entries(data.summary).map(([key, value]) => (
                  <p key={key}>
                    <strong>{key}:</strong> {value}
                  </p>
                ))}
              </div>
              <div className="mt-6 p-4 bg-green-100 rounded-xl shadow">
                <strong>Investment Recommendation:</strong>
                <p className="mt-1 italic">{data.recommendation}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
