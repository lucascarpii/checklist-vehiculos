const Layout = ({ children }) => {
  return (
    <div className='ms-0 lg:ms-[90px] 2xl:ms-[280px] px-5 sm:px-6 xl:px-0 pb-[76px] sm:pb-0 '>
      <div className="max-w-screen-lg py-6 sm:py-10 mx-auto">
        {children}
      </div>
    </div>
  )
}

export { Layout }