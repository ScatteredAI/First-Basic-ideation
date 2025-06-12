# backend/agents/financial_analyst.py
def analyze_financials(data: dict) -> dict:
    info = data["info"]
    history = data["history"]
    
    # Calculate additional metrics
    current_price = info.get("currentPrice")
    book_value = info.get("bookValue")
    pb_ratio = round(current_price / book_value, 2) if current_price and book_value else None
    
    # Calculate 52-week performance
    if history:
        prices = [day['Close'] for day in history if day['Close']]
        if len(prices) >= 2:
            performance = round((prices[-1] - prices[0]) / prices[0] * 100, 2)
        else:
            performance = None
    else:
        performance = None
    
    return {
        "Company": info.get("shortName", "N/A"),
        "Sector": info.get("sector", "N/A"),
        "Industry": info.get("industry", "N/A"),
        "Current Price": f"${current_price:,.2f}" if current_price else "N/A",
        "52-Week Performance": f"{performance}%" if performance else "N/A",
        "Market Cap": f"${info.get('marketCap', 0):,}" if info.get("marketCap") else "N/A",
        "P/E Ratio": info.get("trailingPE", "N/A"),
        "P/B Ratio": pb_ratio,
        "Return on Equity": info.get("returnOnEquity", "N/A"),
        "Debt/Equity": info.get("debtToEquity", "N/A"),
        "Dividend Yield": f"{info.get('dividendYield', 0)*100:.2f}%" if info.get("dividendYield") else "0%"
    }