import React from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import Spinner from '../ui/Spinner';
import { BarChart } from 'lucide-react';

interface SearchBarProps {
  ticker: string;
  setTicker: (value: string) => void;
  loading: boolean;
  error: string;
  handleAnalyze: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  ticker,
  setTicker,
  loading,
  error,
  handleAnalyze,
  handleKeyDown
}) => (
  <div className="bg-white rounded-xl shadow-lg p-6 mb-10 border border-gray-200 mx-auto max-w-2xl">
    <div className="flex flex-col md:flex-row gap-4">
      <Input
        placeholder="Enter stock ticker (e.g., AAPL, MSFT, GOOGL)"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-grow text-lg py-3"
      />
      <Button
        onClick={handleAnalyze}
        disabled={loading}
        className="min-w-[140px] py-3"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <Spinner className="h-5 w-5 text-white mr-2" />
            Analyzing...
          </span>
        ) : (
          <span className="flex items-center justify-center">
            <BarChart className="h-5 w-5 mr-2" strokeWidth={1.5} />
            Analyze
          </span>
        )}
      </Button>
    </div>
    {error && <p className="mt-3 text-red-500 bg-red-50 rounded-lg p-3">{error}</p>}
  </div>
);

export default SearchBar;