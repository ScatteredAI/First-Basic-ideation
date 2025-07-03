# Scattered AI Basic prototype

This project is an AI-powered investment agent, consisting of a Python backend and a React/TypeScript frontend. The agent is designed to provide financial analysis and investment recommendations.

## Table of Contents

- [Scattered AI Basic prototype](#scattered-ai-basic-prototype)
  - [Table of Contents](#table-of-contents)
  - [Project Structure](#project-structure)
  - [Backend Setup and Run](#backend-setup-and-run)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
    - [Run](#run)
  - [Frontend Setup and Run](#frontend-setup-and-run)
    - [Prerequisites](#prerequisites-1)
    - [Setup](#setup-1)
    - [Run](#run-1)

## Project Structure

```
investment-ai-agent/
├── backend/                # Python backend (FastAPI, AI agents)
│   ├── main.py
│   ├── requirements.txt
│   ├── agents/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── utils/
├── frontend/               # React/TypeScript frontend (Vite)
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## Backend Setup and Run

The backend is built with Python and uses FastAPI. It handles the AI logic, data fetching, and financial analysis.

### Prerequisites

- Python 3.8+
- pip

### Setup

1.  Navigate to the `backend` directory:

    ```bash
    cd backend
    ```

2.  Create a virtual environment (recommended):

    ```bash
    python -m venv venv
    ```

3.  Activate the virtual environment:

    -   **macOS/Linux:**

        ```bash
        source venv/bin/activate
        ```

    -   **Windows (Command Prompt):**

        ```bash
        .\venv\Scripts\activate.bat
        ```

    -   **Windows (PowerShell):**

        ```bash
        .\venv\Scripts\Activate.ps1
        ```

4.  Install the required Python packages:

    ```bash
    pip install -r requirements.txt
    ```

### Run

1.  Ensure your virtual environment is activated.
2.  Run the FastAPI application. The backend typically runs on `http://127.0.0.1:8000`.

    ```bash
    uvicorn main:app --reload
    ```

    *(Note: You might need to install `uvicorn` if it's not in `requirements.txt`: `pip install uvicorn`)*

## Frontend Setup and Run

The frontend is a React application built with Vite. It provides the user interface for interacting with the AI agent.

### Prerequisites

- Node.js (LTS version recommended)
- npm (comes with Node.js)

### Setup

1.  Navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

2.  Install the Node.js dependencies:

    ```bash
    npm install
    ```

### Run

1.  Start the development server. The frontend typically runs on `http://localhost:5173`.

    ```bash
    npm run dev
    ```

    This will open the application in your default web browser. If not, manually navigate to the address shown in your terminal (e.g., `http://localhost:5173`).
