# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Instructions to run in local
- Clone the repo in your local machine: git clone https://github.com/JeevanJoyal/Web-App
- Change directory to Web-App and install all packages in the projects : npm i
- Run the application : npm run dev

## Test Task Details 

- [x] User Form Fields
    - [x] First Name
    - [x] Last Name
    - [x] Phone Number
    - [x] Email Address
    - [x] Input validation
    - [x] Required field enforcement
- [x] CRUD Operations
    - [x] Create a new user
    - [x] Read (list and display all users)
    - [x] Update existing user information
    - [x] Delete a user
- [x] Extensibility
    - [x] To add a new Field, Add new Field details in "FIELDS" array in App.jsx file, deconstruct the "codeName" of new Field from "fieldsRefs" and finally add "codeName" to "fieldToRender".
    - [x] Schema to add new field. {codeName : "fname", fieldName : "First Name", fieldType : "text"}
    - [x] For custom validation messages based on field types, check out "errorMessages" in components/Field.jsx file.
- [x] UI Design
    - [x] Used Bootstrap@5.3.8 for form.
     
- [x] Mock API Repo : https://github.com/JeevanJoyal/Web-App-Mock-API
    - [x] Used json-server and hosted "Web-App-Mock-API" web service as Mock API in render.com
    - [x] API docs : https://web-app-mock-api.onrender.com/
- [x] Deloped APP link : https://web-app-jeevan.netlify.app/ 
