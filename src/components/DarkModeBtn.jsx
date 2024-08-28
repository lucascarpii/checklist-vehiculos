import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

function DarkModeBtn() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <button className="hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-200 h-10 w-10 flex items-center justify-center rounded-full" onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? <MoonIcon className='size-6' /> : <SunIcon className='size-6' />}
    </button>
  );
}

export { DarkModeBtn };