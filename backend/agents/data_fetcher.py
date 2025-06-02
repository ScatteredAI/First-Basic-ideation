import yfinance as yf

def fetch_data(ticker: str):
    stock = yf.Ticker(ticker)
    info = stock.info
    hist = stock.history(period="1y")

    return {
        "info": info,
        "history": hist.reset_index().to_dict(orient="records")
    }
