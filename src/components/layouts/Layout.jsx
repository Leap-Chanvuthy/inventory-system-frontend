import { useState } from 'react';
import SideBar from './SideBar';
import Header from './Header';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex-1 h-full lg:md:flex lg:md:h-[100vh]">
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-grow flex flex-col">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-grow p-5 overflow-y-scroll h-[100%]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;



// import { useState } from 'react';
// import SideBar from './SideBar';
// import Header from './Header';

// const Layout = ({ children }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(prevState => !prevState);
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       <Header toggleSidebar={toggleSidebar} />
//       <div className="flex flex-grow">
//         <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
//         <main className="flex-grow p-5 overflow-y-scroll">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;
