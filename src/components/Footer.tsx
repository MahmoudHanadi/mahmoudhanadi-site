export default function Footer() {
  return (
    <footer className="p-6 text-center text-xs text-gray-500 dark:text-gray-400">
      <p>
        © {new Date().getFullYear()} Mahmoud Hanadi. Built with Next.js & Tailwind CSS.
      </p>
    </footer>
  );
}