import { useIsFetching } from "@tanstack/react-query";

function Header({children}) {
  const fetching = useIsFetching();
  return (
    <>
      <div id="main-header-loading">
        {fetching > 0 && <progress/>}
      </div>
      <header id="main-header">
        <div>
          <h1>Event Page</h1>
        </div>
        <nav>{children}</nav>
      </header>
    </>
  ); 
}

export default Header;