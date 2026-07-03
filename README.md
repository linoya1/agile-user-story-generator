# User Story Generator

An AI-powered web application that transforms feature descriptions into well-structured user stories using Google Gemini AI.

## 💬 LLM Conversations

### Phase 1 — Requirements Engineering

- [chats/requirements_chat.txt](chats/requirements_chat.txt)  
  Defines the functional requirements and acceptance criteria for the User Story Generator.  
  Helps ensure the feature is clearly defined and testable before implementation.

### Phase 2 — Architecture

- [chats/architecture_chat.txt](chats/architecture_chat.txt)  
  Documents the architecture decisions, technology stack, and Gemini integration approach.  
  Explains the end-to-end data flow and the main design choices behind the solution.

### Phase 3 — Testing

- [chats/testing_chat.txt](chats/testing_chat.txt)  
  Outlines the Playwright E2E test plan for the main user flow and key edge cases.  
  Validates system-level behavior and helps prevent regressions.

## 🎯 Project Overview

A single-page React app that generates **3–5 user stories** from a feature description using **Google Gemini AI**.

User stories are returned in the format:  
**As a [user], I want [goal], so that [benefit]**.

## 🎓 Software Engineering Methodology

This project was developed as part of a Software Engineering course and focuses on applying software engineering principles rather than only implementing application code.

The development process included:

- Requirements Engineering
- User Stories
- Functional Requirements (FR)
- Acceptance Criteria (AC)
- Software Architecture Design
- Prompt Engineering for AI Integration
- End-to-End Testing with Playwright
- Iterative Development following Agile principles

## 📖 Software Engineering Process

The project followed a structured software engineering workflow:

1. Requirements elicitation
2. Functional requirements definition
3. User story creation
4. Acceptance criteria definition
5. Architecture planning
6. Implementation
7. System testing
8. Documentation

Each phase is documented under the `chats` directory to demonstrate the engineering process behind the implementation.

## 🚀 Quick Start

### Prerequisites

- Node.js (v22 or higher recommended)
- npm (v9.5.1 or higher)
- A Google Gemini API key ([Optional -Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yuvaleliav/HandsaProject.git
cd HandsaProject/frontend
```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables (optional - if missing env file)**

   ```bash
   cp .env.local.example .env.local
   ```

   Then edit `.env.local` and add your Gemini API key:

   ```
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173`

## 📸 Sample input + Screenshots

<img width="1311" height="908" alt="image" src="https://github.com/user-attachments/assets/f964f8c1-9c1e-4c83-980d-9b7167d129b4" />
<img width="1292" height="875" alt="image" src="https://github.com/user-attachments/assets/28b2db04-1f7a-438f-9756-b1a35428f487" />

### 🚫 Character Limit Error (Input > 5000 Characters)

<img width="1513" height="905" alt="image" src="https://github.com/user-attachments/assets/d7ca05e6-3048-4c69-b363-e1a2b8122fd5" />

## 🔑 Key Files

| File Name                                                                                        | Description                                                       |
| ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| [frontend/src/main.jsx](frontend/src/main.jsx)                                                   | Application entry point that mounts the React root                |
| [frontend/src/App.jsx](frontend/src/App.jsx)                                                     | Root component that renders the main application layout           |
| [frontend/src/components/UserStoryGenerator.jsx](frontend/src/components/UserStoryGenerator.jsx) | Core feature component handling input, API interaction, and state |
| [frontend/src/services/geminiService.js](frontend/src/services/geminiService.js)                 | Service layer for communicating with Google Gemini AI API         |
| [frontend/src/utils/promptBuilder.js](frontend/src/utils/promptBuilder.js)                       | Utility for constructing structured prompts for the AI model      |
| [frontend/src/utils/formatter.js](frontend/src/utils/formatter.js)                               | Helper functions to parse and format the AI response              |
| [frontend/tests/user-story-generator.spec.js](frontend/tests/user-story-generator.spec.js)       | Playwright end-to-end tests for the user story generation flow    |

## 📋 Phase 1: Requirements Engineering

- [chats/requirements_chat.txt](chats/requirements_chat.txt)

### Functional Requirements

- **FR-1**: The system shall accept a feature description input up to **5000 characters**.
- **FR-2**: The system shall validate empty/whitespace input and show a clear error message.
- **FR-3**: The system shall provide a button to trigger user story generation.
- **FR-4**: The system shall show a loading state and prevent duplicate submissions while generating.
- **FR-5**: The system shall call the **Gemini API** to generate user stories in the standard format.
- **FR-6**: The system shall display generated user stories clearly and keep the original input available.

### Acceptance Criteria (Examples)

- **AC-1**: Given valid input, when the user clicks **Generate**, then **3–5 user stories** are displayed in the expected format.
- **AC-2**: Given empty input, when the user clicks **Generate**, then a validation message is shown and **no API call** is made.
- **AC-3**: Given valid input, when generation starts, then a **loading indicator** is shown and the button is disabled until completion.

## 🎨 Phase 2: Architecture

- [chats/architecture_chat.txt](chats/architecture_chat.txt)

### Architecture Choice

We implemented a **frontend-only** React app (localhost) where the browser calls Gemini directly.
This was chosen to keep development fast and minimal for a private localhost student project.

### Data Flow (High Level)

1. User enters a feature description in the textarea
2. Client validates input (empty + max length)
3. App builds a structured prompt
4. App sends the request to Gemini
5. Response is formatted and displayed
6. User can clear and generate again

### In Scope

- Single-page UI (English only)
- Gemini integration (client-side)
- Input validation + loading state
- User-friendly error handling
- Clear/reset functionality

### Out of Scope

- Authentication
- Database / persistence
- Export / history
- Editing generated stories inside the app

## 🛠️ Technology Stack

- **Frontend Framework**: React 18.2.0
- **Build Tool**: Vite 7.3.1
- **Styling**: Tailwind CSS 3.4.0
- **AI Integration**: Google Generative AI SDK (@google/generative-ai)
- **Testing**: Playwright (E2E tests implemented)

## 📦 Third-Party Libraries

The following third-party libraries were chosen to keep the project minimal, readable, and easy to run locally:

- **react + react-dom** — Core framework for building a modern single-page UI with reusable components.
- **vite** — Fast development server and build tool for React projects.
- **tailwindcss** (with **postcss** and **autoprefixer**) — Utility-first styling for a clean and responsive UI.
- **@google/generative-ai** — Official Google SDK for Gemini API integration from the client.
- **@playwright/test** — End-to-end (E2E) testing framework used for system-level automated tests.
- **@vitejs/plugin-react** — Enables React (JSX + Fast Refresh) support in Vite.

## 🔒 Security Note

This is a **frontend-only** localhost project.
The repository includes a .env.local.example template.
Local environment variables are excluded from version control using .gitignore.
Do not deploy without a backend.


## 👥 Team Member Responsibilities

- **Yual Eliav - UI/UX Developer:** Built the React components, UI layout, Tailwind styling, and user interaction flow.
- **Linoy Biton - AI Integration, Prompt Engineering & Software Design:** Implemented the Google Gemini integration (`geminiService.js`), designed structured prompts, implemented API error handling, contributed to software design decisions, and maintained the project documentation.
- **Avital Marodov - Utilities & QA:** Implemented shared utilities (validation/formatting/constants), wrote E2E Playwright tests and maintained documentation.

## 🧪 Phase 3: Testing

- [chats/testing_chat.txt](chats/testing_chat.txt)

### Manual Testing

We manually tested the main user scenarios to verify correct behavior and error handling:

1. **Empty input** → Shows a validation error (no API call is made)
2. **Valid input** → Generates **3–5 user stories** successfully
3. **Input longer than 5000 characters** → Shows a character limit error and blocks generation
4. **Clear button** → Resets the input and clears the generated results
5. **Invalid API key** → Shows a user-friendly authentication/error message

### Automated Testing (Playwright)

We implemented a system-level end-to-end (E2E) **Playwright** test suite to validate the full user flow and prevent regressions.

#### ✅ What is tested

The Playwright tests cover:

- Application loads successfully (title + description visible)
- **Generate** button behavior:
  - Disabled when input is empty
  - Enabled when valid input is provided
- Character counter is displayed (**X / 5000**)
- **Clear** button resets the textarea and returns to the empty state
- Character limit validation (>5000) shows an error and disables generation
- Basic accessibility checks (labeled textarea + accessible buttons)
- Footer information is displayed (Gemini branding + localhost message)
- **Complete user flow with mocked API** (verifies output rendering):
  - User enters feature description
  - Clicks generate button
  - Generated user stories are displayed on screen

### 📄 Test file

- [frontend/tests/user-story-generator.spec.js](frontend/tests/user-story-generator.spec.js)

### ▶️ How to run tests

```bash
cd frontend
npm install
npx playwright install
npm run test:e2e

### or for headed tests:
npm run test:e2e:headed
```

## 📝 Example Usage

**Input:**

```
I need a password reset feature for users who forgot their login credentials.
Users should be able to request a reset link via email and create a new password
using a secure, time-limited token.
```

**Output:**

```
1. As a registered user, I want to request a password reset link via email,
   so that I can regain access to my account when I forget my password.

2. As a registered user, I want to receive a time-limited password reset link,
   so that my account remains secure even if someone gains access to my email later.

3. As a registered user, I want to create a new password using the reset link,
   so that I can securely update my credentials and log in again.
```

## 📚 Learning Outcomes

Through this project we practiced:

- Translating stakeholder requirements into user stories
- Defining functional requirements and acceptance criteria
- Designing application architecture before implementation
- Integrating Large Language Models into a software solution
- Writing maintainable React components
- Building reusable utilities and service layers
- Planning and validating end-to-end system behavior

## 📄 License

This project is for educational purposes only.

---

**Powered by Google Gemini AI** | Built with React + Vite + Tailwind CSS
