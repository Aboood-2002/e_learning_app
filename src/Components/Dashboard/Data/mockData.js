// Mock data for courses
export const mockCourses = [
    {
      id: '1',
      title: 'Introduction to Web Development',
      description: 'Learn the basics of HTML, CSS, and JavaScript',
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
      level: 'Beginner',
      duration: '8 weeks',
      curriculum: [
        {
          title: 'HTML Fundamentals',
          lessons: [
            { title: 'Basic HTML Structure', duration: '30 min' },
            { title: 'HTML Elements and Tags', duration: '45 min' },
            { title: 'Forms and Input Elements', duration: '60 min' }
          ]
        },
        {
          title: 'CSS Styling',
          lessons: [
            { title: 'CSS Selectors', duration: '45 min' },
            { title: 'Box Model', duration: '30 min' },
            { title: 'Flexbox Layout', duration: '60 min' }
          ]
        }
      ]
    },
    {
      id: '2',
      title: 'Advanced JavaScript',
      description: 'Master modern JavaScript concepts and frameworks',
      thumbnail: 'https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg',
      level: 'Advanced',
      duration: '12 weeks',
      curriculum: [
        {
          title: 'ES6+ Features',
          lessons: [
            { title: 'Arrow Functions', duration: '45 min' },
            { title: 'Destructuring', duration: '30 min' },
            { title: 'Async/Await', duration: '60 min' }
          ]
        },
        {
          title: 'React Fundamentals',
          lessons: [
            { title: 'Components', duration: '45 min' },
            { title: 'State Management', duration: '60 min' },
            { title: 'Hooks', duration: '45 min' }
          ]
        }
      ]
    },
    {
      id: '3',
      title: 'Python Programming',
      description: 'Learn Python programming from scratch',
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
      level: 'Intermediate',
      duration: '10 weeks',
      curriculum: [
        {
          title: 'Python Basics',
          lessons: [
            { title: 'Variables and Data Types', duration: '45 min' },
            { title: 'Control Flow', duration: '60 min' },
            { title: 'Functions', duration: '45 min' }
          ]
        }
      ]
    }
  ];
  
  // Mock data for students
  export const mockStudents = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      progress: 75,
      status: 'Active',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      progress: 90,
      status: 'Active',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
    },
    {
      id: '3',
      name: 'Michael Brown',
      email: 'm.brown@example.com',
      progress: 45,
      status: 'Inactive',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'
    }
  ];
  
  // Mock data for quizzes
  export const mockQuizzes = [
    {
      id: '1',
      title: 'HTML Basics Quiz',
      description: 'Test your knowledge of HTML fundamentals',
      difficulty: 'Easy',
      questions: 10,
      duration: 15
    },
    {
      id: '2',
      title: 'JavaScript Advanced Concepts',
      description: 'Challenge yourself with advanced JavaScript topics',
      difficulty: 'Hard',
      questions: 20,
      duration: 30
    },
    {
      id: '3',
      title: 'CSS Layout Quiz',
      description: 'Test your understanding of CSS layouts',
      difficulty: 'Medium',
      questions: 15,
      duration: 20
    }
  ];
  
  // Mock data for dashboard stats
  export const mockStats = [
    {
      title: 'Total Students',
      value: '1,234',
      icon: '👥'
    },
    {
      title: 'Active Courses',
      value: '12',
      icon: '📚'
    },
    {
      title: 'Completion Rate',
      value: '85%',
      icon: '📈'
    }
  ];
  
  // Mock data for charts
  export const mockChartData = [
    { name: 'Jan', progress: 65 },
    { name: 'Feb', progress: 75 },
    { name: 'Mar', progress: 85 },
    { name: 'Apr', progress: 78 },
    { name: 'May', progress: 90 },
    { name: 'Jun', progress: 95 }
  ];