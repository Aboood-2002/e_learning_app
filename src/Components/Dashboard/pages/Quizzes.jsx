import React from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { mockQuizzes } from '../data/mockData';
import './main.css'

const Quizzes = () => {
  return (
    <Layout>
      <div className="quizzes-page">
        <div className="page-header">
          <h1 className="heading">Quizzes</h1>
          <Button variant="primary">Create Quiz</Button>
        </div>

        <div className="quiz-list">
          {mockQuizzes.map(quiz => (
            <Card key={quiz.id} className="quiz-card">
              <div className="quiz-info">
                <h3 className="heading">{quiz.title}</h3>
                <p className="text-secondary">{quiz.description}</p>
                <div className="quiz-meta">
                  <Badge type={quiz.difficulty.toLowerCase()}>{quiz.difficulty}</Badge>
                  <span className="text-secondary">{quiz.questions} Questions</span>
                  <span className="text-secondary">{quiz.duration} Minutes</span>
                </div>
              </div>
              <div className="quiz-actions">
                <Button variant="secondary">Edit</Button>
                <Button variant="primary">Start Quiz</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Quizzes;