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
`# Orbit — Student Management System

A professional, full-stack CRUD application for a college software development activity. The frontend is a responsive dashboard and communicates only with the Django REST API; records persist in SQLite through Django ORM.

## Features
- Student create, list, detail, update and delete
- Attendance tracking with percentage and low-attendance indicators
- Analytics endpoint and ApexCharts dashboard visualizations
- CSV import/export, paginated responses, advanced filtering and audit logs
- Unique register number and email
- CGPA, year, phone, email and required-field validation
- Search by name/register number/email and department/year filters
- Responsive mobile command-center dashboard with live analytics, CGPA bands and attendance health
- Server-side pagination, multi-filter search, CGPA ranges and sorting support
- CSV import with row-level validation errors and CSV export
- Attendance tracking endpoint, low-attendance indicators, audit activity timeline and dark mode
- Django admin, automated API tests and Postman-ready endpoints

## Architecture and structure
```text
student-management-system/
├── backend/
│   ├── manage.py  requirements.txt  config/  students/
│   └── db.sqlite3 (generated locally)
├── frontend/ (index.html, js/app.js)
├── documentation/ (API_DOCUMENTATION.md, REPORT_TEMPLATE.md)
├── theme.css  .gitignore  .env.example  setup_windows.bat  README.md
```

## Windows installation
```bat
python -m venv .venv
.venv\Scripts\activate
cd backend
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

The CSV import feature adds migration `0003_importhistory.py`. If the project was already installed, run:

```bat
python manage.py migrate
```

Continue with:
```bat
python manage.py createsuperuser
```

Run the backend in one terminal:
```bat
cd backend
.venv\Scripts\activate
python manage.py runserver
```
Run the frontend in another:
```bat
cd frontend
python -m http.server 5500
```
Open `http://127.0.0.1:5500/`. API: `http://127.0.0.1:8000/api/students/`; admin: `http://127.0.0.1:8000/admin/`.

## CSV Bulk Import
1. Start the backend and frontend.
2. Open the Student Management dashboard.
3. Click **Import CSV**.
4. Select `student_management_sample_data.csv`, or drag it into the upload area.
5. Review the preview, valid rows, invalid rows and duplicates.
6. Click **Import Students**.
7. Confirm the imported records appear in the dashboard.

The import accepts UTF-8 `.csv` files up to 5 MB with these columns:

```text
name,register_number,email,phone,department,year,cgpa
```

Invalid rows are reported with row number, field and message. Valid rows are inserted transactionally and duplicate database records are never created. Use **Download CSV Template** to create a blank import file.

## Testing
From `backend`: `python manage.py test`

## Postman
Create requests for every method in `documentation/API_DOCUMENTATION.md`. Use JSON body and `Content-Type: application/json`; test list filters with query parameters.

## GitHub readiness
```bat
git init
git add .
git commit -m "Initial project setup"
git remote add origin YOUR_REPOSITORY_ADDRESS
git push -u origin main
```
Suggested commits: `Create student model and database`, `Implement REST API`, `Build student dashboard`, `Add CRUD functionality`, `Add validation and filtering`, `Add automated tests`, `Complete documentation`.

## Viva explanation / demo flow
1. Explain the browser → REST API → ORM → SQLite architecture.
2. Add a student and show the POST request/database persistence.
3. Search and filter the directory; explain query parameters.
4. Edit and delete a record with confirmation.
5. Demonstrate duplicate email, invalid CGPA and invalid year errors.
6. Show Django admin and run the automated tests.

## Database and future enhancements
SQLite is the default and can be replaced by MySQL/PostgreSQL through Django `DATABASES` settings. Future work: authentication/roles, pagination, CSV export, attendance, result analytics, notifications and production deployment.
 Student Management System

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

# Orbit — Student Management System

A professional, full-stack CRUD application for a college software development activity. The frontend is a responsive dashboard and communicates only with the Django REST API; records persist in SQLite through Django ORM.

## Features
- Student create, list, detail, update and delete
- Attendance tracking with percentage and low-attendance indicators
- Analytics endpoint and ApexCharts dashboard visualizations
- CSV import/export, paginated responses, advanced filtering and audit logs
- Unique register number and email
- CGPA, year, phone, email and required-field validation
- Search by name/register number/email and department/year filters
- Responsive mobile command-center dashboard with live analytics, CGPA bands and attendance health
- Server-side pagination, multi-filter search, CGPA ranges and sorting support
- CSV import with row-level validation errors and CSV export
- Attendance tracking endpoint, low-attendance indicators, audit activity timeline and dark mode
- Django admin, automated API tests and Postman-ready endpoints

## Architecture and structure
```text
student-management-system/
├── backend/
│   ├── manage.py  requirements.txt  config/  students/
│   └── db.sqlite3 (generated locally)
├── frontend/ (index.html, js/app.js)
├── documentation/ (API_DOCUMENTATION.md, REPORT_TEMPLATE.md)
├── theme.css  .gitignore  .env.example  setup_windows.bat  README.md
```

## Windows installation
```bat
python -m venv .venv
.venv\Scripts\activate
cd backend
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

The CSV import feature adds migration `0003_importhistory.py`. If the project was already installed, run:

```bat
python manage.py migrate
```

Continue with:
```bat
python manage.py createsuperuser
```

Run the backend in one terminal:
```bat
cd backend
.venv\Scripts\activate
python manage.py runserver
```
Run the frontend in another:
```bat
cd frontend
python -m http.server 5500
```
Open `http://127.0.0.1:5500/`. API: `http://127.0.0.1:8000/api/students/`; admin: `http://127.0.0.1:8000/admin/`.

## CSV Bulk Import
1. Start the backend and frontend.
2. Open the Student Management dashboard.
3. Click **Import CSV**.
4. Select `student_management_sample_data.csv`, or drag it into the upload area.
5. Review the preview, valid rows, invalid rows and duplicates.
6. Click **Import Students**.
7. Confirm the imported records appear in the dashboard.

The import accepts UTF-8 `.csv` files up to 5 MB with these columns:

```text
name,register_number,email,phone,department,year,cgpa
```

Invalid rows are reported with row number, field and message. Valid rows are inserted transactionally and duplicate database records are never created. Use **Download CSV Template** to create a blank import file.

## Testing
From `backend`: `python manage.py test`

## Postman
Create requests for every method in `documentation/API_DOCUMENTATION.md`. Use JSON body and `Content-Type: application/json`; test list filters with query parameters.

## GitHub readiness
```bat
git init
git add .
git commit -m "Initial project setup"
git remote add origin YOUR_REPOSITORY_ADDRESS
git push -u origin main
```
Suggested commits: `Create student model and database`, `Implement REST API`, `Build student dashboard`, `Add CRUD functionality`, `Add validation and filtering`, `Add automated tests`, `Complete documentation`.

## Viva explanation / demo flow
1. Explain the browser → REST API → ORM → SQLite architecture.
2. Add a student and show the POST request/database persistence.
3. Search and filter the directory; explain query parameters.
4. Edit and delete a record with confirmation.
5. Demonstrate duplicate email, invalid CGPA and invalid year errors.
6. Show Django admin and run the automated tests.

## Database and future enhancements
SQLite is the default and can be replaced by MySQL/PostgreSQL through Django `DATABASES` settings. Future work: authentication/roles, pagination, CSV export, attendance, result analytics, notifications and production deployment.

