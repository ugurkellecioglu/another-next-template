# Next.js 14 Authentication and ORM Starter 🚀

## Project Overview 📘

This repository provides a boilerplate for building a modern web application using Next.js 14, Auth.js (formerly NextAuth), Drizzle ORM, and PostgreSQL. It includes popular libraries and tools such as Zod, React Hook Form, Shadcn, and Tailwind CSS. The project demonstrates how to set up credentials login and includes Next.js 14 actions.

## Live Demo 🌐

Check out the live demo: [Live URL](#) (Replace this with the actual URL once deployed)

## Screenshots 📸

Add screenshots here to showcase your application. To add a screenshot, upload the image to the repository and reference it in this section.

## Technologies Used 🛠️

- ⚛️ **Next.js 14**: React framework for server-rendered or statically-exported React apps.
- 🔐 **Auth.js (NextAuth)**: Authentication library for Next.js applications.
- 🗃️ **Drizzle ORM**: Type-safe SQL ORM for TypeScript.
- 🐘 **PostgreSQL**: Relational database management system.
- 📏 **Zod**: TypeScript-first schema declaration and validation library.
- 📝 **React Hook Form**: Performant, flexible, and extensible forms with easy-to-use validation.
- 🖌️ **Shadcn**: UI component library.
- 🎨 **Tailwind CSS**: Utility-first CSS framework for rapidly building custom user interfaces.

## Getting Started 🚀

To get started with this project, follow these steps:

### Prerequisites 📋

- Node.js
- PostgreSQL
- Docker (if setting up PostgreSQL via Docker)

### Installation 📦

1. Clone the repository:

```bash
git clone https://github.com/yourusername/yourrepository.git
cd yourrepository
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file in the root of the project and add the following environment variables:

```env
AUTH_SECRET=your_own_secret
DB_URL=postgres://username:password@localhost:5432/dbname
```

You need to define your own `AUTH_SECRET` and `DB_URL`.

To set up a PostgreSQL container using Docker, run the following command (requires Docker to be installed):

```bash
docker run --name postgres -e POSTGRES_PASSWORD=password -e POSTGRES_USER=username -e POSTGRES_DB=dbname -p 5432:5432 -d postgres
```

In that case, the `DB_URL` would be:

```env
DB_URL=postgres://username:password@localhost:5432/dbname
```

4. Run database migrations:

```bash
npx drizzle-kit up
```

5. Start the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure 🗂️

Here is an overview of the project's structure:

```plaintext
.
├── components    # Reusable UI components
├── lib           # Library functions and utilities
├── pages         # Next.js pages
├── public        # Public assets
├── styles        # Global styles
├── prisma        # Prisma schema
├── api           # API routes
└── utils         # Utility functions
```

## Contributing 🤝

We welcome contributions to this project! To contribute, please follow these guidelines:

1. Fork the repository.
2. Create a new branch with a descriptive name (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Run the tests to ensure your changes don't break anything (`npm run test`).
5. Commit your changes (`git commit -m 'Add some feature'`).
6. Push to the branch (`git push origin feature/your-feature-name`).
7. Create a pull request.

### Maintain Rules 📜

- Write clear and concise commit messages.
- Keep pull requests small and focused.
- Ensure code quality by writing tests and running the linter.
- Update documentation if you introduce new features or changes.

## License 📄

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact 📧

If you have any questions or suggestions, feel free to open an issue or contact us at [email@example.com](mailto:email@example.com).

---

Thank you for your interest in contributing to this project! 🚀
