🌍 Global Expense Tracker

Track expenses in any currency. The backend automatically converts amounts to USD using live exchange rates and stores a normalized value in SQLite. The frontend displays a live-updating, animated table of expenses.

📂 Project Structure
Global-Expense-Tracker/
 ├── backend/       # Django backend
 │    ├── config/
 │    ├── expenses/
 │    └── manage.py
 └── frontend/      # React + TypeScript frontend
      ├── src/
      ├── package.json
      └── vite.config.ts
⚙️ Features

Add expenses in USD, ETB, EUR

Backend auto-converts to USD using real-time exchange rates

AuditLog middleware logs all conversions

Generic, type-safe React table displays expenses

Animated submit buttons and modern CSS UI

Live table update after adding an expense

Follows system layer pattern:

Frontend → API → Backend Services → DB

Caching exchange rates to reduce API calls

🖥 Backend Setup (Django + SQLite)
cd backend
python -m venv venv           # Create virtual environment (if not done)
source venv/bin/activate       # Linux/macOS
venv\Scripts\activate          # Windows

pip install -r requirements.txt

python manage.py migrate       # Apply migrations
python manage.py runserver     # Start backend at http://127.0.0.1:8000

Backend exposes APIs like:
GET /api/expenses/ → fetch all expenses
POST /api/expenses/ → add new expense (currency conversion done automatically)

🖥 Frontend Setup (React + TypeScript)
cd frontend
npm install
npm run dev

Open http://localhost:5173

Expense form + generic table are interactive

Table updates live when adding a new expense

🔄 Data Flow
User Input (Amount + Currency)
          ↓
     ExpenseForm
          ↓
   API Request → Django Backend
          ↓
  Fetch current exchange rate (cached if available)
          ↓
  Normalize amount → store in SQLite DB
          ↓
  Return saved expense
          ↓
 GenericTable updates live in React UI
💡 Design Choices

Function-based views in Django for simplicity

Custom middleware logs currency conversions (AuditLog)

Generic table component in React ensures type safety and reusability

CSS + animations for polished UI without extra libraries

Cache exchange rates to reduce external API calls



🌐 System Flow Diagram
          ┌─────────────────────┐
          │       User          │
          │ (Enter Expense)     │
          └─────────┬──────────┘
                    │
                    ▼
          ┌─────────────────────┐
          │    ExpenseForm      │
          │ (React Component)   │
          └─────────┬──────────┘
                    │
                    ▼
          ┌─────────────────────┐
          │      API Call       │
          │  POST /api/expenses │
          └─────────┬──────────┘
                    │
                    ▼
          ┌─────────────────────┐
          │   Django Backend    │
          │  Function-based FBV │
          │  + Middleware       │
          │  (AuditLog/Caching)│
          └─────────┬──────────┘
                    │
                    ▼
          ┌─────────────────────┐
          │    SQLite DB        │
          │ (Store Expenses &   │
          │  Normalized USD)   │
          └─────────┬──────────┘
                    │
                    ▼
          ┌─────────────────────┐
          │  Response to Frontend│
          │  (Saved Expense Obj) │
          └─────────┬──────────┘
                    │
                    ▼
          ┌─────────────────────┐
          │ GenericTable (React)│
          │ Live Table Updates  │
          └─────────────────────┘
🔹 Explanation

User Input: User enters amount and currency in the form.

ExpenseForm: React component controls inputs and triggers API call.

API Call: POST request to Django backend.

Django Backend:

Converts currency to USD (uses cache if available)

Logs conversion in AuditLog middleware

Stores the normalized value in SQLite

SQLite DB: Stores original and normalized amounts.

Response: Backend returns the saved expense object.

GenericTable: React table updates live with the new expense.