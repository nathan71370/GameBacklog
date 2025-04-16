# Game Backlog

A modern, user-friendly web app to track, manage, and rate your video games backlog. Add games, track their status, leave comments, and rate them as you complete your collection!

## Features
- Add games with automatic cover fetching (RAWG API)
- Track status: To Do, In Progress, Completed
- Inline editing for comments
- Grade games on completion (0-10)
- Restart completed games (resets grade & comment)
- Responsive, dark mode UI
- Persistent storage (localStorage)

## Tech Stack
- **React** (w/ TypeScript)
- **Vite** for fast dev/build
- **Framer Motion** for smooth animations
- **Tailwind CSS** for styling

## Installation

### 1. Clone the repository
```sh
git clone https://github.com/nathan71370/GameBacklog.git
cd GameBacklog
```

### 2. Install dependencies
```sh
npm install
```

### 3. Start the development server
```sh
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) by default.

## Usage
- **Add a Game:** Click the "+" button and fill in the details. Covers are fetched automatically.
- **Change Status:** Use the action buttons to move games through their lifecycle.
- **Complete a Game:** Click "End Game" to rate and comment. Confetti will celebrate your achievement!
- **Restart:** For completed games, use "Restart Game" to reset status, grade, and comment.

## Customization & Export
- All data is stored in your browser (localStorage).
- You can export/import your backlog as JSON from the UI.

https://buymeacoffee.com/azrodorza

## License
MIT

---

Enjoy managing your game backlog! If you have suggestions or want to contribute, feel free to open an issue or PR.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
