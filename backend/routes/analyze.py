import logging
from fastapi import APIRouter, Query, HTTPException
from agents.data_fetcher import fetch_data
from agents.financial_analyst import analyze_financials
from agents.advisor import generate_recommendation

router = APIRouter()

@router.get("/")
def analyze(ticker: str = Query(...)):
    try:
        raw_data = fetch_data(ticker)
        if not raw_data or not raw_data.get("info"):
            raise HTTPException(status_code=404, detail="Ticker data not found")

        analysis = analyze_financials(raw_data)
        recommendation = generate_recommendation(analysis)

        return {
            "ticker": ticker.upper(),
            "summary": analysis,
            "recommendation": recommendation
        }
    except Exception as e:
        logging.error(f"Error during analyze endpoint: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
