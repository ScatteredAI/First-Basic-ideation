# backend/agents/data_fetcher.py
import yfinance as yf
from datetime import datetime, timedelta
import requests
import logging

def search_ticker(company_name: str) -> str:
    """Search for stock ticker by company name"""
    try:
        url = f"https://query2.finance.yahoo.com/v1/finance/search?q={company_name}"
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()
        
        if data.get('quotes'):
            # Get the first valid equity result
            for quote in data['quotes']:
                if quote.get('quoteType') == 'EQUITY':
                    return quote['symbol']
        return None
    except Exception as e:
        logging.error(f"Ticker search failed for {company_name}: {e}")
        return None

def fetch_data(ticker: str) -> dict:
    try:
        # First try to get data directly
        stock = yf.Ticker(ticker)
        info = stock.info
        
        # If direct fetch fails, try searching by name
        if not info or 'currentPrice' not in info:
            logging.info(f"Direct fetch failed for {ticker}, trying name search")
            found_ticker = search_ticker(ticker)
            if found_ticker:
                logging.info(f"Found ticker {found_ticker} for {ticker}")
                stock = yf.Ticker(found_ticker)
                info = stock.info
                ticker = found_ticker  # Use the found ticker
            else:
                raise ValueError(f"No data found for {ticker}")        
        # Get historical data
        end_date = datetime.now()
        start_date = end_date - timedelta(days=365)
        hist = stock.history(start=start_date, end=end_date)
        
        # Get recommendations
        recommendations = stock.recommendations
        
        return {
            "info": info,
            "history": hist.reset_index().to_dict(orient="records"),
            "recommendations": recommendations.to_dict() if recommendations is not None else None
        }
    except Exception as e:
        raise Exception(f"Failed to fetch data for {ticker}: {str(e)}")