# Software Compositions - A Vibe-Coded Link Tree

A stylish, interactive link tree showcasing a collection of vibe-coded software projects. This application presents each project as a visually appealing card and provides powerful tools for searching, sorting, and filtering the collection.

**[Live Demo](https://your-live-demo-url-here.com)**

![Software Compositions Screenshot](./screenshot.png)
*(Add a screenshot of the application here)*

## ✨ Features

- **Interactive Project Showcase**: Displays projects in a clean, grid-based layout with unique, programmatically generated background art for each card.
- **Dynamic Search**: Instantly search through project titles and descriptions with a debounced, fuzzy search algorithm for a smooth user experience.
- **Advanced Filtering**:
  - Filter projects by one or more **tags**.
  - Filter projects by **category**.
  - Search for specific tags to easily find relevant filters.
- **Flexible Sorting**:
  - Sort projects by **Date Added** (default) or **Title**.
  - Toggle between **Ascending** and **Descending** order.
- **Responsive Design**: A fully responsive interface that looks and works great on desktops, tablets, and mobile devices.
- **Modern UI/UX**: Built with a sleek dark theme, subtle animations, and blur effects for a polished, professional feel.
- **Accessibility**: ARIA attributes and semantic HTML are used to ensure the application is accessible to all users.

## 🚀 Tech Stack

This project is built with modern frontend technologies and leverages a zero-build setup for rapid development.

- **[React](https://reactjs.org/)**: A JavaScript library for building user interfaces.
- **[TypeScript](https://www.typescriptlang.org/)**: A typed superset of JavaScript that compiles to plain JavaScript.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development.
- **No Build Tools**: The project uses ES Modules (ESM) and imports dependencies directly from a CDN (`esm.sh`), eliminating the need for complex build configurations like Webpack or Vite.

## 🛠️ Getting Started

To run this project locally, follow these simple steps.

### Prerequisites

You need a modern web browser and a local web server to run this project effectively (to avoid potential file path issues).

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/software-compositions.git
    cd software-compositions
    ```

2.  **Serve the application:**
    Since this project has no build step, you just need to serve the `index.html` file. You can use any simple static file server. Here are a couple of popular options:

    - **Using `npx serve` (requires Node.js):**
      ```bash
      npx serve .
      ```

    - **Using Python's built-in HTTP server:**
      - If you have Python 3:
        ```bash
        python3 -m http.server
        ```
      - If you have Python 2:
        ```bash
        python -m SimpleHTTPServer
        ```

3.  **Open in your browser:**
    Navigate to the URL provided by your local server (e.g., `http://localhost:3000` or `http://localhost:8000`).

## 📁 Project Structure

```
.
├── components/
│   └── LinkCard.tsx      # React component for individual project cards
├── App.tsx               # Main application component
├── constants.ts          # Static project data and image generation logic
├── index.html            # The main HTML file
├── index.tsx             # The entry point for the React application
├── metadata.json         # Application metadata
└── types.ts              # TypeScript type definitions
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/software-compositions/issues) for open issues or to create a new one.

## 📄 License

This project is licensed under the MIT License.
