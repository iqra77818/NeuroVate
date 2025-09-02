export default function ThemeToggle({ dark, setDark }) {
  return (
    <button
      onClick={() => setDark(!dark)}
      className="fixed bottom-9 right-4 w-16 h-16 text-3xl rounded-full bg-gray-300 dark:bg-gray-700 shadow flex items-center justify-center"
    >
      {dark ? "🌙" : "☀️"}
    </button>
  );
}


