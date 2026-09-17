# Orbit — Student Management & College Operations

A professional full-stack CRUD-based college operations web application for managing student records, academic insights, attendance health, CSV data, and operational activity logs.

---

## 📌 Project Overview

**Orbit** is a Student Management System developed as a college Skill Vault Activity.

The application provides a centralized dashboard for managing student information through a modern responsive interface. It connects a frontend application to a **Django REST Framework API**, with persistent data stored using **SQLite and Django ORM**.

The system demonstrates complete **Create, Read, Update, Delete (CRUD)** operations along with validation, search, filtering, analytics, attendance tracking, CSV import/export, pagination, and activity logging.

---

## 🎯 Objectives

* Build a functional full-stack CRUD web application.
* Manage student records efficiently.
* Implement RESTful API communication.
* Store and retrieve data using a relational database.
* Provide frontend and backend validation.
* Implement search, filtering, sorting, and pagination.
* Provide academic and attendance insights.
* Support CSV bulk import and export.
* Maintain an activity/audit history.
* Demonstrate testing and Git/GitHub version control.

---

## ✨ Features

### 👨‍🎓 Student Management

* Create student records
* View student records
* Update student records
* Delete student records
* View individual student details
* Unique register number validation
* Unique email validation

### 🔎 Search & Filtering

* Search by student name
* Search by register number
* Search by email
* Filter by department
* Filter by academic year
* Filter by CGPA range
* Sort student records
* Server-side pagination

### 📊 Insights & Analytics

* Total student count
* Average CGPA
* Year-wise student distribution
* Department-wise distribution
* CGPA performance bands
* Attendance health indicators
* Live dashboard analytics
* ApexCharts-based visualizations

### 📝 Attendance

* Attendance percentage
* Attendance status
* Low-attendance indicators
* Attendance-related analytics

### 📥 CSV Import

* Upload CSV student records
* CSV format validation
* Row-level validation
* Duplicate detection
* Import preview
* Valid/invalid row reporting
* Import result summary
* CSV template download

Required CSV columns:

```text
name,register_number,email,phone,department,year,cgpa
```

### 📤 CSV Export

Export student records as CSV, including filtered student data where supported.

### 🕒 Activity Log

Track important operations such as:

* Student creation
* Student updates
* Student deletion
* CSV imports
* CSV exports
* Other operational activities

### 🎨 User Interface

* Modern dashboard
* Responsive design
* Desktop support
* Mobile support
* Dark mode
* Loading states
* Empty states
* Success/error notifications
* Professional student directory

### 🛠️ Administration & Testing

* Django Admin
* REST API
* Automated Django API tests
* Postman-ready API endpoints
* Server-side validation
* Client-side validation

---

## 🏗️ System Architecture

```text
                    Orbit Web Application
                             │
                             ▼
                    HTML / CSS / JavaScript
                             │
                         Fetch API
                             │
                             ▼
                  Django REST Framework
                             │
                     Business Logic
                             │
                             ▼
                       Django ORM
                             │
                             ▼
                          SQLite
```

### Data Flow

```text
User
 │
 ▼
Frontend Dashboard
 │
 ▼
REST API
 │
 ▼
Django REST Framework
 │
 ▼
Django ORM
 │
 ▼
SQLite Database
```

---

## 💻 Technology Stack

| Layer           | Technology                   |
| --------------- | ---------------------------- |
| Frontend        | HTML5, CSS3, JavaScript ES6+ |
| Backend         | Python, Django               |
| API             | Django REST Framework        |
| Database        | SQLite                       |
| ORM             | Django ORM                   |
| Charts          | ApexCharts                   |
| API Testing     | Postman                      |
| Version Control | Git                          |
| Repository      | GitHub                       |
| Development     | VS Code                      |

---

## 📁 Project Structure

```text
Student-management-orbit-college-operations/
│
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── config/
│   └── students/
│
├── frontend/
│   ├── index.html
│   └── js/
│       └── app.js
│
├── documentation/
│   ├── API_DOCUMENTATION.md
│   └── REPORT_TEMPLATE.md
│
├── data/
│   └── student_management_sample_data.csv
│
├── screenshots/
│   └── README.md
│
├── theme.css
├── .env.example
├── .gitignore
├── setup_windows.bat
└── README.md
```

> Keep this structure synchronized with the actual files in the repository.

---

# 🚀 Installation & Setup

## Prerequisites

Install the following:

* Python 3.x
* Git
* VS Code
* Web browser
* Postman (optional, for API testing)

---

## 1. Clone the Repository

```bash
git clone https://github.com/sarmathasiva-web/Student-management-orbit-college-operations.git
```

Move into the project:

```bash
cd Student-management-orbit-college-operations
```

---

## 2. Create a Virtual Environment

```bash
python -m venv .venv
```

Activate it on Windows:

```bash
.venv\Scripts\activate
```

---

## 3. Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
```

---

## 4. Create Database Migrations

```bash
python manage.py makemigrations
```

Apply migrations:

```bash
python manage.py migrate
```

---

## 5. Create Django Admin Account

```bash
python manage.py createsuperuser
```

Follow the terminal instructions to create the administrator account.

---

## 6. Start the Backend

From the `backend` directory:

```bash
python manage.py runserver
```

Backend:

```text
http://127.0.0.1:8000/
```

API:

```text
http://127.0.0.1:8000/api/students/
```

Django Admin:

```text
http://127.0.0.1:8000/admin/
```

---

## 7. Start the Frontend

Open a **second VS Code terminal**.

From the project root:

```bash
cd frontend
python -m http.server 5500
```

Open:

```text
http://127.0.0.1:5500/
```

---

# 📡 REST API

Base URL:

```text
http://127.0.0.1:8000/api/
```

## Student Endpoints

| Method | Endpoint              | Purpose         |
| ------ | --------------------- | --------------- |
| GET    | `/api/students/`      | List students   |
| POST   | `/api/students/`      | Create student  |
| GET    | `/api/students/{id}/` | Get one student |
| PUT    | `/api/students/{id}/` | Update student  |
| PATCH  | `/api/students/{id}/` | Partial update  |
| DELETE | `/api/students/{id}/` | Delete student  |

---

## Search & Filtering

Example:

```text
/api/students/?search=Sarmatha
```

Department:

```text
/api/students/?department=AIML
```

Year:

```text
/api/students/?year=2
```

Multiple filters can be combined where supported.

---

## Sample Student Request

```json
{
  "name": "Sarmatha S",
  "register_number": "24AIM001",
  "email": "sarmatha.s@example.com",
  "phone": "9876543210",
  "department": "AIML",
  "year": 2,
  "cgpa": 9.0
}
```

---

# 📥 CSV Bulk Import

Orbit supports bulk student data import through CSV.

## CSV Format

The CSV file must contain:

```csv
name,register_number,email,phone,department,year,cgpa
```

Example:

```csv
name,register_number,email,phone,department,year,cgpa
Sarmatha S,24AIM001,sarmatha.s@example.com,9876543210,AIML,2,9.0
Ananya R,24AIM002,ananya.r@example.com,9876543211,AIML,2,8.7
```

## Import Process

1. Start the Django backend.
2. Start the frontend.
3. Open the Orbit dashboard.
4. Select **Import CSV**.
5. Upload the CSV file.
6. Review the import preview.
7. Check valid and invalid records.
8. Click **Import Students**.
9. Verify that the imported students appear in the Student Directory.

The import process validates:

* Required fields
* Email format
* Phone number
* Academic year
* CGPA range
* Duplicate register numbers
* Duplicate email addresses

---

# 📤 CSV Export

Use the **Export CSV** option from the student dashboard to export student records.

Exported data can be used for:

* Reports
* Data analysis
* Backup
* Administrative records

---

# 🧪 Testing

Run automated Django tests from the `backend` directory:

```bash
python manage.py test
```

The test suite covers important API functionality such as:

* Student creation
* Student retrieval
* Student update
* Student deletion
* Invalid data
* CGPA validation
* Duplicate records

---

# 🔬 Postman Testing

Use Postman to test the REST API.

Test:

### Create

```text
POST /api/students/
```

### Read

```text
GET /api/students/
```

### Read One

```text
GET /api/students/{id}/
```

### Update

```text
PUT /api/students/{id}/
```

### Delete

```text
DELETE /api/students/{id}/
```

### Validation

Test:

* Missing fields
* Invalid email
* Invalid phone number
* Invalid CGPA
* Invalid academic year
* Duplicate register number
* Duplicate email
* Invalid student ID

---

# 🛡️ Validation

The application implements validation on both frontend and backend.

### CGPA

```text
0 ≤ CGPA ≤ 10
```

### Academic Year

```text
1, 2, 3, or 4
```

### Unique Fields

```text
register_number → unique
email            → unique
```

This prevents invalid and duplicate student records.

---

# 📊 Dashboard

The Orbit dashboard provides a centralized operational view containing:

* Total students
* Average CGPA
* Attendance health
* Year-wise statistics
* Department distribution
* CGPA spectrum
* Recent activity

Analytics are generated from application data rather than being static dashboard values.

---

# 🕒 Activity Log

The Activity Log provides a transparent history of important operations.

Example activities:

```text
Student added
Student updated
Student deleted
CSV imported
CSV exported
```

This helps demonstrate operational traceability.

---

# 🔐 Security Considerations

The application follows basic security practices including:

* Backend validation
* Safe ORM-based database operations
* Duplicate protection
* Input validation
* No hard-coded passwords
* Environment configuration for sensitive settings
* `.gitignore` for local/environment files

Authentication and role-based access can be added as a future extension if required.

---

# 🖥️ Screenshots

Add project screenshots to the `screenshots/` directory.

Recommended screenshots:

1. Orbit Dashboard
2. Student Directory
3. Add Student
4. Edit Student
5. CSV Import
6. CSV Import Preview
7. Insights Dashboard
8. Activity Log
9. Validation Error
10. Mobile Responsive View

---

# 📚 Documentation

Additional documentation is available in:

```text
documentation/
```

Including:

```text
API_DOCUMENTATION.md
REPORT_TEMPLATE.md
```

These documents can be used for:

* API reference
* Project report
* College submission
* Viva preparation

---

# 🎓 Viva Demonstration Flow

During the project demonstration:

### 1. Explain the architecture

```text
Browser
   ↓
Frontend
   ↓
REST API
   ↓
Django
   ↓
Django ORM
   ↓
SQLite
```

### 2. Demonstrate Create

Add a new student and show the record appearing in the directory.

### 3. Demonstrate Read

Display the student records.

### 4. Demonstrate Search & Filtering

Search by:

* Name
* Register number
* Email

Apply:

* Department filter
* Year filter

### 5. Demonstrate Update

Edit an existing student record.

### 6. Demonstrate Delete

Delete a student and show the confirmation process.

### 7. Demonstrate Validation

Show an invalid:

* Email
* Phone
* CGPA
* Year
* Duplicate register number

### 8. Demonstrate CSV Import

Upload:

```text
student_management_sample_data.csv
```

Show the preview and imported records.

### 9. Demonstrate Analytics

Show:

* Total students
* Average CGPA
* Department distribution
* Year distribution
* Attendance indicators

### 10. Demonstrate API

Use Postman to demonstrate REST API requests.

### 11. Demonstrate Testing

Run:

```bash
python manage.py test
```

---

# 🌱 Future Enhancements

Possible future improvements include:

* Admin/faculty authentication
* Role-based authorization
* MySQL/PostgreSQL support
* Student profile pages
* Subject management
* Semester marks
* Advanced attendance management
* Placement management
* Email notifications
* PDF report generation
* Cloud deployment
* Automated database backups
* Docker support
* Production monitoring

---

# 📌 Project Status

**Status:** Active Development / College Project

Core functionality:

```text
✓ CRUD
✓ REST API
✓ Database Integration
✓ Search
✓ Filtering
✓ Validation
✓ CSV Import
✓ CSV Export
✓ Analytics
✓ Attendance
✓ Pagination
✓ Activity Log
✓ Responsive UI
✓ Dark Mode
✓ Django Admin
✓ Automated Testing
```

---

# 👩‍💻 Author

**Sarmatha S**

B.E. Computer Science and Engineering
Artificial Intelligence & Machine Learning

GitHub:

https://github.com/sarmathasiva-web

Project Repository:

https://github.com/sarmathasiva-web/Student-management-orbit-college-operations

---

# 📄 License

This project was developed for educational and academic purposes.

---

## ⭐ Orbit

**Student Management • Academic Insights • Attendance • College Operations**
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

