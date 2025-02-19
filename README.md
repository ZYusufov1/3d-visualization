# 3D Visualization App

A React-based 3D visualization application using `@react-three/fiber` and `three.js` to render 3D objects with interactive controls.

## Features

- Render 3D primitives (boxes and pyramids).
- Add and remove primitives dynamically.
- Select objects to highlight them with a blinking effect.
- Responsive UI with Material-UI components.
- Camera controls using `@react-three/drei`.

## Technologies Used

- **React** – UI framework.
- **Three.js** – 3D rendering library.
- **@react-three/fiber** – React wrapper for Three.js.
- **@react-three/drei** – Utility components for Three.js.
- **Material-UI** – UI components.
- **Vite** – Fast build tool for development.

## Installation

Make sure you have **Node.js** installed.

1. Clone this repository:
   ```sh
   git clone https://github.com/ZYusufov1/3d-visualization.git
   cd 3d-visualization
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

## Running the Project

To start the development server:

```sh
npm run dev
```

Then, open your browser and go to `http://localhost:5173/` (or the URL shown in the terminal).

## Building for Production

To create a production build:

```sh
npm run build
```

To preview the production build locally:

```sh
npm run preview
```

## Project Structure

```
src/
│── components/
│   ├── primitives/
│   │   ├── BoxPrimitive.tsx
│   │   ├── PyramidPrimitive.tsx
│   ├── App.tsx
│── styles/
│── utils/
│── types/
│── main.tsx
```

## Dependencies

### Main Dependencies
- `react`, `react-dom` – Core UI framework
- `three`, `@react-three/fiber` – 3D rendering
- `@react-three/drei` – Helper components for Three.js
- `@mui/material` – UI components
- `uuid` – Unique ID generation

### Development Dependencies
- `vite` – Fast development server
- `typescript` – Type safety
- `eslint` – Code linting
- `@vitejs/plugin-react` – Vite plugin for React

## Repository and Live Demo

- **GitHub Repository:** [3D Visualization Repository](https://github.com/ZYusufov1/3d-visualization)
- **Live Demo:** [Try it here](https://zyusufov1.github.io/3d-visualization/)