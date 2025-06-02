def analyze_financials(data):
    info = data["info"]

    pe_ratio = info.get("trailingPE")
    roe = info.get("returnOnEquity")
    debt_to_equity = info.get("debtToEquity")
    market_cap = info.get("marketCap")

    return {
        "Company": info.get("shortName"),
        "Sector": info.get("sector"),
        "Market Cap": f"${market_cap:,}" if market_cap else "N/A",
        "P/E Ratio": pe_ratio,
        "Return on Equity": roe,
        "Debt/Equity": debt_to_equity
    }
