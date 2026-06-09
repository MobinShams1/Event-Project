
function Header({children}) {
  return (
    <>
      <div id="main-header-loading">

      </div>
      <header id="main-header">
        <div>
          <h1>React Events</h1>
        </div>
        <nav>{children}</nav>
      </header>
    </>
  ); 
}

export default Header;