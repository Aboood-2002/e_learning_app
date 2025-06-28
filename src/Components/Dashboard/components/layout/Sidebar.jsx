import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './main.css';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const navItems = [
    {
      path: '/dashboard' ,
      label: 'Dashboard',
      icon: '📊',
      roles: ['admin']
    },
    {
      path: '/dashboard/courses',
      label: 'Courses',
      icon: '📚' ,
      roles: ['admin', 'student']
    },
    {
      path: '/dashboard/students',
      label: 'Students',
      icon:'👥',
      roles: ['admin']
    },
    {
      path: '/dashboard/quizzes',
      label: 'Quizzes',
      icon:  '✍️',
      roles: ['admin', 'student']
    },
    {
      path: '/dashboard/performance',
      label: 'Performance',
      icon: '📊',
      roles: ['admin', 'student']
    },
    {
      path: '/dashboard/instructor',
      label: 'Instructor Overview',
      icon: '📊',
      roles: ['admin', 'instructor']
    },
    {
      path: '/dashboard/lessons',
      label: 'Lessons',
      icon: '📊',
      roles: ['admin', 'instructor']
    },
    {
      path: '/dashboard/questions',
      label: 'Questions',
      icon: '📊',
      roles: ['admin', 'instructor']
    },
  ];

  const filteredNavItems = navItems.filter(item => 
    user ? item.roles.includes(user.role) : false
  );

  return (
    <aside className="sidebar">
      <div className="logo">
        <h2 className="heading">LMS</h2>
      </div>
      <nav className="nav">
        {filteredNavItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.icon}
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;