from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from routes import analyze
from fastapi.middleware.trustedhost import TrustedHostMiddleware

app = FastAPI()

# CORS Setup for React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change to specific domain in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(analyze.router, prefix="/api/analyze")

@app.get("/")
def root():
    return {"message": "AI Investment Analyst API"}
