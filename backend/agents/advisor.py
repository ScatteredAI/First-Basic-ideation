from services.gemini import ask_gemini

def generate_recommendation(analysis: dict) -> str:
    prompt = f"""
    As a senior financial analyst with CFA certification, analyze these metrics for {analysis.get('Company', 'the company')}:

    Key Metrics:
    - P/E Ratio: {analysis.get('P/E Ratio', 'N/A')}
    - P/B Ratio: {analysis.get('P/B Ratio', 'N/A')}
    - Return on Equity: {analysis.get('Return on Equity', 'N/A')}
    - Debt/Equity: {analysis.get('Debt/Equity', 'N/A')}
    - 52-Week Performance: {analysis.get('52-Week Performance', 'N/A')}
    - Dividend Yield: {analysis.get('Dividend Yield', 'N/A')}

    Sector: {analysis.get('Sector', 'N/A')}
    Industry: {analysis.get('Industry', 'N/A')}

    Provide:
    1. Investment recommendation (Strong Buy, Buy, Hold, Sell, Strong Sell)
    2. 3 key strengths
    3. 3 key risks
    4. Price target justification

    Format your response in markdown with bold headings for each section.
    """
    
    return ask_gemini(prompt)