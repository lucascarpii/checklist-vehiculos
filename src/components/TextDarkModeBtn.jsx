import { useState, useEffect } from 'react';

function TextDarkModeButton({mediaQueries = 'hidden 2xl:block'}) {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const darkSvg = 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
  </svg>;
  const lightSvg = 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>;

  useEffect(() => {
    if (darkMode) {
       document.documentElement.classList.add('dark');
    } else {
       document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <button className='cursor-pointer w-fit 2xl:w-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-100 rounded-full lg:rounded-md flex items-center justify-center gap-2 py-2 px-2 2xl:px-4' onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? lightSvg : darkSvg}
      <span className={mediaQueries}>
        {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
      </span>
    </button>
  );
}

export {TextDarkModeButton};