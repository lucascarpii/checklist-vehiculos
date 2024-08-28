const Layout = ({ children }) => {
  return (
    <div className='px-4 sm:px-6 xl:px-0 pb-[76px] sm:pb-0 '>
      <div className="max-w-screen-md py-6 sm:py-10 mx-auto">
        {children}
      </div>
    </div>
  )
}

export { Layout }