import Sidebar from './Sidebar';
import Header from './Header';
import './main.css'

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <main className="main-content">
        <Header />
        {children}
      </main>
    </div>
  );
};

export default Layout;