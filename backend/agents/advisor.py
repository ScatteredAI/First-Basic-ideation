from services.gemini import ask_gemini

def generate_recommendation(analysis):
    prompt = f"""
    Analyze the following financial indicators and provide a short investment recommendation:

    {analysis}

    Return a summary like: Buy, Hold, or Sell with a 1-paragraph explanation.
    """
    return ask_gemini(prompt)
