# React Project

This is a React project that includes a user list table, a responsive chart, and various other components styled with Tailwind CSS and Flowbite.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Building the Project](#building-the-project)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (v22 or higher)
- **npm** (v6 or higher) or **yarn** (v1.22 or higher)

## Installation

Follow these steps to set up and run the project locally:

1. **Clone the repository:**

   ```bash
   https://github.com/Leap-Chanvuthy/inventory-system-frontend
   cd inventory-system-frontend
   ```

2. **Install Dependencies**
```bash
   npm install
```
Or using bun:

```bash
bun install
```


3. **Running the Project**
To start the development server, run:
```bash
    npm run dev
```
Or using bun:

```bash
    bun dev
```

4. **Building the Project**
To build the project for production, run:

Using npm:
To start the development server, run:
```bash
    npm run build
```
Application will run on port 5173 by default

5. **Application Structure**

```bash 

    inventory-system-frontend/
│
├── public/               # Static assets
├── src/                  # Source files
│   ├── components/       # Reusable components
│   ├── pages/            # Page components
│   ├── App.js            # Main application component
│   ├── index.js          # Entry point of the application
│   └── redux             # Global State Management
│   └── ...
│ 
├── .gitignore            # Files to be ignored by Git
├── package.json          # Project dependencies and scripts
├── README.md             # Project documentation
└── yarn.lock / package-lock.json # Dependency tree lock file

```
