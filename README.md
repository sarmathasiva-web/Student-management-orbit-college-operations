# Student-management-orbit-college-operations
A CRUD-based college operations web application for managing student records, insights, and activity logs.
# Student Management System

A full-stack CRUD web application built as a college Skill Vault Activity.

## Features
- Create, Read, Update, Delete student records
- Search by name/register number, filter by department/year
- Client-side and server-side validation
- Success/error messages, loading and empty states
- Responsive UI (desktop and mobile)

## Architecture
```
Browser (HTML/CSS/JS) --fetch()--> Django REST Framework API --ORM--> SQLite
```

## Tech Stack
- Frontend: HTML5, CSS3, JavaScript (ES6+)
- Backend: Python, Django, Django REST Framework
- Database: SQLite
- API Testing: Postman
- Version Control: Git/GitHub

## Folder Structure
```
student-management-system/
├── backend/
│   ├── manage.py
│   ├── config/
│   └── students/
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── documentation/
├── screenshots/
├── README.md
├── requirements.txt
└── .gitignore
```

## Backend Setup (Windows, VS Code terminal)

```powershell
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r ..\requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser   # optional, for /admin access
python manage.py runserver
```

The API will run at `http://127.0.0.1:8000/`.

## Frontend Setup

Open `frontend/index.html` directly in a browser, or serve it with VS Code's
"Live Server" extension for auto-reload. The frontend calls the API at
`http://127.0.0.1:8000/api` (see `API_BASE_URL` in `script.js`).

## API Endpoints

| Method | URL | Purpose | Success | Errors |
|---|---|---|---|---|
| POST | `/api/students/` | Create student | 201 | 400 |
| GET | `/api/students/` | List students (`?search=&department=&year=`) | 200 | — |
| GET | `/api/students/{id}/` | Get one student | 200 | 404 |
| PUT/PATCH | `/api/students/{id}/` | Update student | 200 | 400, 404 |
| DELETE | `/api/students/{id}/` | Delete student | 204 | 404 |

### Sample POST body
```json
{
  "name": "Sarmatha R",
  "register_number": "RA2211003010123",
  "email": "sarmatha@example.com",
  "phone": "9876543210",
  "department": "CSE (AI & ML)",
  "year": 2,
  "cgpa": 8.75
}
```

## Running Tests (Postman)
Import the endpoints above into Postman and test:
- Valid create, missing fields, invalid email/phone/cgpa, duplicate register number/email
- Get all, get by valid/invalid ID
- Update valid/invalid ID
- Delete valid/invalid ID

## Future Enhancements (Optional, not part of core submission)
- Authentication for admin/faculty roles
- Pagination for large student lists
- Export to CSV/PDF

## GitHub Repository
`<add your repository URL here>`
