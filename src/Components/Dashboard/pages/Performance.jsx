import  { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Bar, Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import Layout from '../components/layout/Layout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import './main.css';
import request from '../../utils/request';  

const Performance = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (location.pathname === '/performance') {
      const fetchData = async () => {
        try {
          const response = await request.get('/api/users/profile/dashboard/performance', {
            headers: { Authorization: `Bearer ${user.token}` }
          });
          setPerformanceData(response.data);
        } catch (error) {
          console.error('Error fetching performance data:', error);
        }
      };
      fetchData();
    }
  }, [user, navigate, location.pathname]);

  if (!user) return null;
    
  const scoreTrendData = {
      labels: performanceData.map(d => new Date(d.completedAt).toLocaleDateString()),
      datasets: [{
        label: 'Score (%)',
        data: performanceData.map(d => d.percentageScore),
        borderColor: '#4A90E2',
        fill: false
      }]
    };

  const timeUsedData = {
      labels: performanceData.map(d => d.quizTitle),
      datasets: [{
        label: 'Time Used (s)',
        data: performanceData.map(d => d.timeUsed),
        backgroundColor: '#50C878'
      }]
    };

  const passFailData = {
      labels: ['Pass', 'Fail'],
      datasets: [{
        data: [
          performanceData.filter(d => d.passFail === 'Pass').length,
          performanceData.filter(d => d.passFail === 'Fail').length
        ],
        backgroundColor: ['#50C878', '#FF6347']
      }]
    };

  return (
      <Layout>
      <div className="dashboard-page">
        <div className="page-header">
          <h1 className="heading">Performance Dashboard</h1>
          <Button variant="primary" onClick={() => navigate('/courses')}>
            View Courses
          </Button>
        </div>
        <Card>
          <div className="grid grid-cols-3">
            <div className="stat-card">
              <h3>Total Quizzes</h3>
              <p className="stats-value">{performanceData.length}</p>
            </div>
            <div className="stat-card">
              <h3>Average Score</h3>
              <p className="stats-value">
                {(performanceData.reduce((sum, d) => sum + parseFloat(d.percentageScore), 0) / performanceData.length || 0).toFixed(2)}%
              </p>
            </div>
            <div className="stat-card">
              <h3>Total Questions Attempted</h3>
              <p className="stats-value">{performanceData.reduce((sum, d) => sum + (d.totalQuestions || 0), 0)}</p>
            </div>
          </div>
        </Card>
        <div className="grid grid-cols-3">
          <Card>
            <h3>Score Trend</h3>
            <div className="chart-container">
              <Line data={scoreTrendData} />
            </div>
          </Card>
          <Card>
            <h3>Time Used per Quiz</h3>
            <div className="chart-container">
              <Bar data={timeUsedData} />
            </div>
          </Card>
          <Card>
            <h3>Pass/Fail</h3>
            <div className="chart-container">
              <Pie data={passFailData} />
            </div>
          </Card>
        </div>
      </div>
      </Layout>
    );
  };

export default Performance;