import Layout from '../components/layout/Layout';
import StatsCard from '../components/dashboard/StatsCard';
import ChartCard from '../components/dashboard/ChartCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockChartData } from '../Data/mockData';
//import { Users, BookOpen } from 'lucide-react';
import './main.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUsersCount } from '../../redux/apiCalls/profileApiCall';
import { getCoursesCount } from '../../redux/apiCalls/courseApiCall';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { usersCount, loading: profileLoading, error: profileError } = useSelector((state) => state.profile);
  const { courseCount, loading: courseLoading, error: courseError } = useSelector((state) => state.course);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.role === 'admin') {
      dispatch(getUsersCount());
      dispatch(getCoursesCount());
    }
  }, [dispatch, user]);

  // if (user?.role !== 'admin') {
  //   return (
  //     <Layout>
  //       <div className="dashboard-page">
  //         <p className="text-red-500">Access denied. Admins only.</p>
  //       </div>
  //     </Layout>
  //   );
  // }

  const stats = [
    {
      title: 'Total Users',
      value: usersCount || 0,
      icon: '👥',
    },
    {
      title: 'Total Courses',
      value: courseCount || 0,
      icon: '📚',
    },
  ];

  return (
    <Layout>
      <div className="dashboard-page">
        <div className="page-header">
          <h1 className="heading">Dashboard Overview</h1>
        </div>

        {/* {(profileLoading || courseLoading) ? (
          <p>Loading stats...</p>
        ) : (profileError || courseError) ? (
          <p className="text-red-500">{profileError || courseError}</p>
        ) : (

        )} */}

          <div className="stats-grid grid grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <StatsCard
                key={index}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
              />
            ))}
          </div>

        <div className="charts-section">
          <ChartCard title="Student Progress">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="progress" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;