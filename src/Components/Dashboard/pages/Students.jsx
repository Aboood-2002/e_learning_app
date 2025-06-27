import React from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
//import { mockStudents } from '../Data/mockData';
import './main.css'
import {useSelector,useDispatch} from "react-redux";
import { useEffect } from "react";
import { getAllUsersProfile } from "../../redux/apiCalls/profileApiCall";


const Students = () => {
    const dispatch = useDispatch()
    const {profiles} = useSelector((state)=>state.profile)
    const {user} = useSelector((state)=>state.auth)
    useEffect(()=>{
      dispatch(getAllUsersProfile())
  },[dispatch])

  if (user?.role !== 'admin') {
    return (
      <Layout>
        <div className="dashboard-page">
          <p className="text-red-500">Access denied. Admins only.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="students-page">
        <div className="page-header">
          <h1 className="heading">Students</h1>
          <Button variant="primary">Add Student</Button>
        </div>

        <Card>
          <div className="students-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Progress</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {profiles.map(student => (
                  <tr key={student.id}>
                    <td>
                      <div className="student-info">
                        <img src={student?.profilePhoto?.url} alt={student?.userName} className="student-avatar" />
                        <span>{student?.userName}</span>
                      </div>
                    </td>
                    <td>{student?.email}</td>
                    <td>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${student?.progress}%` }}
                        />
                        <span>{student?.progress}%</span>
                      </div>
                    </td>
                    {/* <td>
                      <Badge type={student.status.toLowerCase()}>{student.status}</Badge>
                    </td> */}
                    <td>
                      <div className="student-actions">
                        <Button variant="secondary">View</Button>
                        <Button variant="secondary">Edit</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Students;