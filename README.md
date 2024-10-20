# Interactive Quiz App
## Project Overview
The Interactive Quiz App is a web application designed to provide users with an engaging quiz experience. Users can navigate through various categories, answer questions, and receive instant feedback on their answers. This application is built using Next.js.

## Functionalities
The Interactive Quiz App includes the following features:
* Dynamic Loading of Questions: Questions are loaded dynamically from a JSON file and via API routes, allowing for easy updates and management of quiz content.

* Add New Questions: Users can add new questions through a user-friendly form, which updates the question pool in real-time.

* Immediate Feedback: Users receive instant feedback regarding their answers, indicating whether their response was correct or incorrect.

* Score Management: The app tracks user scores, allowing participants to see their performance throughout the quiz.
## Installation and Running Instructions
### Prerequisites
* Node.js (version 14.x or newer)
* npm or yarn (for package management)

To run this app locally, follow these steps:
1. **Clone the repository:**
   ```bash
   git clone https://github.com/username/InteractiveQuizApp.git
2. **Navigate to the project directory:**
   ```bash
   cd InteractiveQuizApp
3. **Install the dependencies:**
   ```bash
   npm install
   # or
   yarn install   
4. **Run the application locally:**
   ```bash
   npm run dev
   # or
   yarn dev
5. **Access the application:**
   ```bash
    Open your browser and navigate to http://localhost:3000 to access the application.
## Branch Structure
This project is organized into several branches, each focusing on specific modules of the application. Here's a breakdown:
### Module-1
1. **Entities Definition:** Defines the core entities for the quiz, including:
      * **Question:** Represents a single quiz question with text and possible answers.
      * **Quiz:** A collection of questions belonging to a specific category.
      * **Category:** Represents the subject area for the quiz (e.g., History, Science, Arts).
2. **Project Initialization:** Initializes the Next.js project and creates the main pages:
      * **Home (pages/index.js):** Welcomes users and provides links to different categories.
      * **Categories (pages/categories.js):** Displays a list of available categories, each linking to related quizzes.
      * **Quiz (pages/quiz/[quizId].js):** Shows information about the selected quiz and allows users to start it.
      * **Question (pages/quiz/[quizId]/question/[questionId].js):** Displays the current question and response options.
3. **Static Initial Data:** Implements static initial data for a quiz and its questions, enabling a functional UI without server dependencies.
4. **Navigation:** Establishes navigation between pages using Next.js routing to enhance user experience.
### Module-2
1. **Data Management:** Moves the quiz questions into a separate JSON file for better organization and management.
2. **Server-Side Rendering (SSR):** Implements SSR using getServerSideProps or getStaticProps to dynamically load questions from the JSON file for each necessary page.
3. **Dynamic Content Replacement:** Replaces static content on pages with dynamic data fetched from the JSON file, ensuring that users always see the latest information.
4. **Quiz Functionality Development:** Develops the core functionalities of the quiz, including:
    * **Answer Selection:** Users can select an answer and receive immediate feedback on whether it's correct.
    * **Scoring:** Tracks user scores based on correct answers.
    * **Results Display:** At the end of the quiz, presents the user with their score and feedback.
### Module-3
1. **API Route Setup:** Creates an API route (pages/api/questions.js) to serve quiz questions dynamically, allowing for separation of data fetching from the frontend.
2. **Component Updates:** Updates React components to use fetch or axios for obtaining questions from the API, improving the modularity of the application.
3. **Adding New Questions:** Implements a form that allows users to submit new questions, which includes fields for the question text, answer options, and the correct answer.
4. **State Management with Hooks:** Utilizes React hooks (useState and useEffect) for managing component states, loading questions, and synchronizing data with localStorage as necessary.
### Improvements
This branch introduces improvements for managing quiz data, focusing on reading from and writing to the JSON file for better flexibility and persistence.
## **Project Structure**
The project is organized into several folders and files, each serving a specific purpose. Below is a detailed overview of the project's structure:
   ```bash
   INTERACTIVEQUIZAPP/
         │     
         ├── .next
         ├── node_modules   
         ├── pages/  
         │   ├── api/
         │   │   ├── hello.js
         │   │   └── questions.js
         │   │
         │   ├── fonts/
         │   │   ├── GeistMonoVF.woff
         │   │   └── GeistVF.woff
         │   ├── quiz/
         │   │   ├──[quizId]/ 
         │   │   │   └── questions/   
         │   │   │      └──[questionId].js
         │   │   └──[quizId].js
         │   ├── _app.js
         │   ├── _documents.js
         │   ├── addQuestionForm.js
         │   ├── categories.js
         │   ├── index.js
         │   └── results.js
         │
         ├── public/
         │   ├── favicon.ico
         │   ├── modalDialog.js
         │   └── questions.json
         │
         ├── styles/
         │   ├── addQuestionForm.module.css
         │   ├── categories.module.css
         │   ├── globals.module.css
         │   ├── Home.module.css
         │   ├── modalDialog.module.css
         │   ├── questionId.module.css
         │   ├── quizId.module.css
         │   └── results.module.css
         ├── .gitattributes
         ├── .gitignore
         ├── jsconfig.json
         ├── next.config.mjs
         ├── package-lock.json
         ├── package.json                
         └── README.md                  
```
## Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow these steps:
1. **Fork** this repository to create your own copy.
2. **Create a new branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
3. **Commit your changes:**
   ```bash
   git commit -m "Add a description of your changes"
4. **Push your branch** to your forked repository:
   ```bash
   git push origin feature/your-feature-name
5. **Open a Pull Request** on GitHub to discuss your changes.