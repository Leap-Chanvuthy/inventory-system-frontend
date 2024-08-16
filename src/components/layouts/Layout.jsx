import { useState } from 'react';
import SideBar from './SideBar';
import Header from './Header';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-grow flex flex-col">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-grow p-5 overflow-y-auto h-[100%]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
