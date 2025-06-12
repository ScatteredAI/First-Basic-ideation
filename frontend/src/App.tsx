import React from 'react';
import { motion } from 'framer-motion';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import SearchBar from './components/stock/SearchBar';
import FinancialMetricsCard from './components/stock/FinancialMetricsCard';
import RecommendationCard from './components/stock/RecommendationCard';
import useStockAnalysis from './hooks/useStockAnalysis';

export default function App() {
  const {
    ticker,
    setTicker,
    loading,
    error,
    data,
    handleAnalyze,
    handleKeyDown
  } = useStockAnalysis();

  console.log("DAta:", data);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto text-center">
        <Header />
        
        <SearchBar 
          ticker={ticker}
          setTicker={setTicker}
          loading={loading}
          error={error}
          handleAnalyze={handleAnalyze}
          handleKeyDown={handleKeyDown}
        />

        {data && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <FinancialMetricsCard 
              ticker={data.ticker}
              summary={data.summary}
            />
            
            <RecommendationCard 
              recommendation={data.recommendation}
              recommendationDetails={data.recommendation_details}
            />
          </motion.div>
        )}

        <Footer />
      </div>
    </div>
  );
}