<div align="center">
  <h1 style="font-size: 3rem; font-weight: bold;">Software Compositions</h1>
  <p>A curated collection of digital aesthetics & functional art by EArunga.</p>
  <br />
</div>

This repository contains the source code for a personal portfolio website designed to showcase a variety of software projects in a clean, modern, and interactive interface. The application is built with React, TypeScript, and Tailwind CSS, and it's easily customizable.

## ✨ Features

- **Project Showcase**: Displays a grid of project cards with images, titles, descriptions, and tags.
- **Interactive Filtering & Sorting**:
    - **Search**: Instantly search projects by title or description.
    - **Sort**: Sort projects by "Date Added" (default) or "Title" in ascending or descending order.
    - **Tag Filtering**: Filter projects by one or more technology tags.
    - **Tag Search**: Quickly find tags using a search filter.
- **Responsive Design**: A mobile-first design that looks great on all screen sizes, from mobile phones to desktops.
- **Dynamic SVGs**: Project images are dynamically generated SVGs, making the application lightweight and fast.
- **Easy Customization**: Project data is stored in a single, easy-to-edit file (`src/constants.ts`).

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal) to view the app in your browser.

## 🛠️ Technologies Used

- **Frontend**: [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Build Tool**: [Vite](https://vitejs.dev/)

## 📁 Project Structure

The project follows a standard React application structure:

```
software-compositions/
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable React components
│   │   └── LinkCard.tsx  # Component for each project card
│   ├── App.tsx           # Main application component with all logic
│   ├── constants.ts      # Project data and other constants
│   ├── index.css         # Global styles (Tailwind directives)
│   ├── index.tsx         # Entry point of the application
│   └── types.ts          # TypeScript type definitions
├── .gitignore            # Git ignore file
├── index.html            # Main HTML file
├── package.json          # Project metadata and dependencies
├── README.md             # You are here!
└── tsconfig.json         # TypeScript configuration
```

## 🎨 Customization

### Adding or Editing Projects

All project data is located in the `src/constants.ts` file within the `PROJECTS` array. To add, remove, or edit a project, you can modify this array.

Each project object has the following structure:

```typescript
export interface Project {
  id: number;          // Unique ID, used for sorting by date
  title: string;       // Project title
  description: string; // Brief description
  imageUrl: string;    // URL or data URI for the project image
  url: string;         // Live URL of the project
  tags: string[];      // Array of tags associated with the project
}
```

To add a new project, simply add a new object to the `PROJECTS` array with the required fields. The `imageUrl` can be a link to an image or you can use the built-in SVG generator `getImageForIndex(index)` as seen in the file.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
