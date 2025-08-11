export default function NotFound() {
  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center text-center space-y-4">
      <h1 className="text-4xl font-bold">404 – Page Not Found</h1>
      <p className="text-gray-600 dark:text-gray-400">
        Sorry, we couldn’t find what you’re looking for. Try returning to the home page.
      </p>
      <a href="/" className="underline text-olive">
        Go home
      </a>
    </div>
  );
}