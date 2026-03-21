🌍 Global Expense Tracker

Track expenses in any currency.
The backend auto-converts everything to USD, and the frontend shows a live-updating dashboard.

✨ Features
💱 Add expenses in USD, ETB, EUR
🔄 Automatic currency → USD conversion
⚡ Live updates after adding expenses
🧾 Audit logging via middleware
📊 Clean, reusable React table
🎨 Modern UI with icons (lucide-react)
🧠 Exchange rate caching (fewer API calls)
📁 Structure
Global-Expense-Tracker/
├── backend/     # Django API
└── frontend/    # React + TypeScript
🐍 Backend Setup
cd backend

python -m venv venv

# activate
venv\Scripts\activate     # Windows
source venv/bin/activate  # Mac/Linux

pip install django djangorestframework django-cors-headers requests

python manage.py migrate
python manage.py runserver

👉 Runs on: http://127.0.0.1:8000

⚙️ Enable CORS (important)

In settings.py:

INSTALLED_APPS += ["corsheaders", "rest_framework"]

MIDDLEWARE = ["corsheaders.middleware.CorsMiddleware", *MIDDLEWARE]

CORS_ALLOW_ALL_ORIGINS = True
🔌 API
GET /api/expenses/ → list expenses
POST /api/expenses/ → add expense (auto converts)
⚛️ Frontend Setup
cd frontend

npm install
npm install lucide-react
npm run dev

👉 Open: http://localhost:5173

🎨 Example Icon Usage
import { Plus } from "lucide-react";

<button>
  <Plus size={16} /> Add Expense
</button>
🔄 How It Works
User → React Form → API → Django
     → Convert to USD → Save DB
     → Response → UI updates instantly
🧠 Design Highlights
FBVs (Django) → simple & clear logic
Middleware → logs every conversion
Caching → avoids repeated API calls
Typed React components → safer frontend
🏆 Why This Project Stands Out
Real-world currency handling
Clean full-stack architecture
Shows API integration + optimization
Easy to explain in interviews
🚀 Run Everything
Start backend
Start frontend
Add expense → see it update instantly



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
nse.
