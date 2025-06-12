# backend/routes/analyze.py
import logging
from fastapi import APIRouter, Query, HTTPException
from agents.data_fetcher import fetch_data
from agents.financial_analyst import analyze_financials
from agents.advisor import generate_recommendation
import re

router = APIRouter()

@router.get("/")
def analyze(ticker: str = Query(..., min_length=1, max_length=50)):  # Increase max length
    try:
        # First try to fetch with the provided input
        try:
            raw_data = fetch_data(ticker)
        except Exception as e:
            logging.warning(f"Initial fetch failed for {ticker}: {str(e)}")
            # Try searching for ticker by name
            from agents.data_fetcher import search_ticker
            found_ticker = search_ticker(ticker)
            if found_ticker:
                logging.info(f"Using found ticker: {found_ticker}")
                raw_data = fetch_data(found_ticker)
                ticker = found_ticker  # Update to the found ticker
            else:
                raise HTTPException(
                    status_code=404,
                    detail=f"No data found for '{ticker}'. Please verify the name or symbol."
                )        
        # Perform analysis
        analysis = analyze_financials(raw_data)
        recommendation_markdown = generate_recommendation(analysis)

        # Extract recommendation (Strong Buy, Buy, Hold, Sell, Strong Sell) from markdown
        match = re.search(
            r"Investment Recommendation:\s*(Strong Buy|Buy|Hold|Sell|Strong Sell)",
            recommendation_markdown,
            re.IGNORECASE
        )
        recommendation = match.group(1).title() if match else "N/A"

        return {
            "ticker": ticker.upper(),
            "summary": analysis,
            "recommendation": recommendation,
            "recommendation_details": recommendation_markdown,
            "raw_data": {
                "info_keys": list(raw_data["info"].keys()),
                "history_dates": [d["Date"] for d in raw_data["history"]] if raw_data.get("history") else []
            }
        }
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error analyzing {ticker}: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail=f"Analysis failed for {ticker}. Please try again later."
        )