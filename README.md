# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.


## Login page (demo mode)
- The app opens on a black-and-violet sign-in page.
- Use **Create account** to save a demo account in the current browser, or sign in with any valid email and a password of at least 6 characters.
- Use the sign-out icon at the bottom of the sidebar to return to the login page.
- This is front-end demo authentication only. Account details are stored in browser local storage and are not protected by a server. Do not use real or sensitive passwords. For production, connect a secure authentication provider/backend.
