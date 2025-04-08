# Project Skeleton

## Overview

This project is a skeleton template for building a React application with TypeScript, Vite, and Tailwind CSS. It
provides a solid foundation with a set of pre-configured tools and libraries to streamline the development process.

## Main Goal

The main goal of this project is to offer a starting point for me to quickly set up a modern web application with best
practices and essential tools. It includes configurations for TypeScript, Vite, Tailwind CSS, and several useful
libraries to enhance development efficiency and code quality.

## Key Features

- `TypeScript`: Provides static typing to catch errors early and improve code quality.
- `Tailwind CSS`: A utility-first CSS framework for rapid UI development.
- `i18n`: Internationalization support for multi-language applications.
- `react-helmet-async`: Manage changes to the document head.
- `@tanstack/react-query`: Powerful data-fetching and state management for React.
- `@headlessui/react`: Unstyled, fully accessible UI components for React.

## Getting Started

To get started with this project, clone the repository and install the dependencies:

```sh
git clone <repository-url>
cd skeleton
npm i
```


### Classic commands
Standardize the project with `npm`, `yarn`, `pnpm` as per your preference.

```sh
npm run dev # Start the development server
npm run build # Build the project for production
npm run test # Run tests
```

## Directory Structure

- `assets`: Contains css files, images and other static assets. (Example: fonts, icons, etc.)
- `components`: Contains reusable React components. (Example: buttons, modals, etc.)
- `hooks`: Contains useful custom hooks (Example: `useMobile`, `useInitials`, etc.)
- `locales`: Contains i18n configuration and translation files. (Example: `pages.json`, `common.json`, etc.)
- `router`: Contains react router configuration and route components.
- `pages`: Contains the main pages of the application. (Example: `Home`, `About`, etc.)
- `layouts`: Contains layout components for the application. (Example: `MainLayout`, `AuthLayout`, etc.)
- `providers`: Contains context providers for state management and other functionalities. (Example: `AuthProvider`,
  `AlertProvider`, etc.)
- `services`: Contains API service files for data fetching. (Example: `HttpClient` for data fetching)

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
