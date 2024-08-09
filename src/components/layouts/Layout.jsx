// import SideBar from './SideBar';
// import Header from './Header';

// const Layout = ({ children }) => {
//   return (
//     <div className="flex h-screen">
//       <SideBar />
//       <div className="flex-grow flex flex-col">
//         <Header />
//         <main className="flex-grow px-10 py-5 overflow-y-auto">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;


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
        <main className="flex-grow px-10 py-5 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
