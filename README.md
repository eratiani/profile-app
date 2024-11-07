# Task: Implement User Profile Edit Feature
## How to run application
### 1. run npm i or npm ci

## Install App 
1. To install Angular application, please run the following command: npm i or npm ci
2. To install Jason Server please run the following command: npm i json-server
## Running App
1. application is using latest version of angular run ng s or npm run start to start development server on http://localhost:4200/
2. application is using db.json to simulate backend  run  npx json-server db.json
## Objective
Develop a feature that allows users to update their profile information using a form within an Angular application. The form should be pre-populated with the current user's data and include form validation.
---
## About App 
1. The project includes an authorization/registration page that has its own validations and obligation to fill in mandatory fields.
2. user authorization/registration is mannaged by ngrx state managemen 
3. to log in u can either register or use username john doe password: Password1 
4. user status is managed by auth guard via ngrx state management 
5. loged in user can navigate to user page where they can edit create and delete data.
6. Angular Router is used to navigate between pages.which is also loaded as a lazy load.
7. To manage asynchronous information, the RxJs library is used.
8. Angular HttpClient is used to interact with the back server. (JSON Server)
9. For every successful or unsuccessful operation, a corresponding note is displayed, so that the customer can understand whether he made a mistake or not, or vice versa.
10. user edit form includes appropriate validation with error messages
11. user edit form include image upload.

## Requirements

### 1. Form Creation
- **Component**: Created a new `UserProfileEditComponent`.
- **Fields**: The form includes the following fields:
  - **First Name**: Text field (Required)
  - **Last Name**: Text field (Required)
  - **Email**: Email field (Required, validated)
  - **Phone Number**: Optional text field (numeric validation)
  - **Profile Picture**: Optional file upload

### 2. Form Validation
- **Validation Rules**:
  - **First Name**: Required
  - **Last Name**: Required
  - **Email**: Required and must be a valid email format
  - **Phone Number**: Numeric-only input, optional
- **Error Messages**: Displays appropriate error messages when validation fails.

### 3. Data Pre-Population
- **Pre-population**: The form is pre-populated with the current user profile data fetched from a mock service.
- **Editable Fields**: All fields are editable, allowing the user to modify and submit updated information.

### 4. API Integration
- **Integration**: Integrated the form with a mock API using Angular’s HttpClient.
  - **Submission**: On form submission, sends a PUT or PATCH request to update the user profile.
  - **Feedback**: Displays success or error notifications based on the API response.

### 5. Profile Picture Upload
- **File Upload**: Added file upload functionality for the profile picture.
  - **Preview**: Preview functionality for the profile picture before submission.
  - **Data Submission**: If a new profile picture is uploaded, it is sent along with the user profile update request.

### 6. UI/UX
- **Styling**: Used [UI Framework, e.g., Angular Material, Bootstrap, or TailwindCSS] for styling the form.
- **Buttons**: Included "Save" and "Cancel" buttons.
- **Loading Indicator**: Added a loading spinner during form submission.

### 7. Routing
- **Route**: Added routing so `UserProfileEditComponent` is accessible via the `/edit-profile` route.

### 8. Testing
- **Unit Tests**: -
  - **Pre-population**: Ensures form is pre-populated with user data.
  - **Submission**: Successful submission functionality.
  - **Error Handling**: Correct handling and display of validation errors.

---

## Deliverables

- **Source Code**: Available with detailed commit history.
- **Documentation**: 
  - Instructions on how to run the application.
  - Steps to test the feature.

---

## Additional Notes
- **Enhancements**:
  - Responsive design for improved mobile compatibility.
  - Error handling improvements for failed API calls.
  
**Completion Date**: 11/08/2024

**Author**: erekle ratiani
