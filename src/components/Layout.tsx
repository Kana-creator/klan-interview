import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="App text-30">
      <Outlet />
    </main>
  );
};

export default Layout;
