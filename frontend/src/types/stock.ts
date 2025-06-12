export interface FinancialMetric {
  [key: string]: string | number | undefined;
}

export interface AnalysisData {
  ticker: string;
  summary: FinancialMetric;
  recommendation: string;
  recommendation_details: string;
  raw_data?: {
    info_keys: string[];
    history_dates: string[];
  };
}