import { courseActions } from "../slices/courseSlice";
import request from "../../utils/request";
import { toast } from "react-toastify"

// Fetch courses 
export function fetchCourses() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/courses`)
      dispatch(courseActions.setCourses(data.courses))
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}




// Create course
export function createCourse(newCourse) {
  return async (dispatch,getState) => {
    try {
    dispatch(courseActions.setLoading())
       await request.post(`/api/courses`,newCourse,{
        headers :{
          Authorization : "Bearer " + getState().auth.user.token,
          "Content-Type" : "multipart/form-data"
        }
      });
      dispatch(courseActions.setIsCourseCreated());
      setTimeout(()=>dispatch(courseActions.clearIsCourseCreated()),2000)
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(courseActions.clearLoading())
    }
  };
}


// Fetch Single course
export function fetchSingleCourse(courseId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/courses/${courseId}`);
      dispatch(courseActions.setCourse(data.course));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}



// buy Course
export function buyCourse(courseId) {
  return async (dispatch,getState) => {
    try {
    dispatch(courseActions.setLoading())
      const response = await request.post(`/api/payments/checkout`,{courseId},{
        headers :{
          Authorization : "Bearer " + getState().auth.user.token,
          "Content-Type" : "application/json"
        }
      });
      dispatch(courseActions.setCheckoutSession({ sessionId: response.data.sessionId }));
      return response.data.sessionId; // Return for redirect
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to initiate checkout';
      dispatch(courseActions.setCheckoutError(errorMessage));
      toast.error(errorMessage);
      throw error; // Rethrow for component handling
    }
  };
}



// Fetch lessons 
export function fetchLessons(courseId) {
  return async (dispatch,getState) => {
    try {
      const { data } = await request.get(`/api/lessons/courses/${courseId}/lessons`,{
        headers :{
          Authorization : "Bearer " + getState().auth.user.token,
          "Content-Type" : "application/json"
        }})
      dispatch(courseActions.setLessons(data.lessons))
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}



// Fetch quizzes 
export function fetchQuizzes(courseId) {
  return async (dispatch,getState) => {
    try {
      const { data } = await request.get(`/api/quizzes/courses/${courseId}/quizzes`,{
        headers :{
          Authorization : "Bearer " + getState().auth.user.token,
          "Content-Type" : "application/json"
        }})
      dispatch(courseActions.setQuizzes(data.quizzes))
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}


// Fetch Single course
export function fetchSingleQuiz(quizId,courseId) {
  return async (dispatch,getState) => {
    try {
      const { data } = await request.get(`/api/quizzes/courses/${courseId}/quizzes/${quizId}`,{
        headers :{
          Authorization : "Bearer " + getState().auth.user.token,
          "Content-Type" : "application/json"
        }
      });
      dispatch(courseActions.setQuiz(data.quiz));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}



// Fetch quizzes 
export function fetchQuestions(quizId) {
  return async (dispatch,getState) => {
    try {
      const { data } = await request.get(`/api/questions/quizzes/${quizId}/questions`,{
        headers :{
          Authorization : "Bearer " + getState().auth.user.token,
          "Content-Type" : "application/json"
        }})
      dispatch(courseActions.setQuestions(data.questions))
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}



//  Get courses Count  (for admin dashboard)

export function getCoursesCount(){

    return async (dispatch,getState)=>{
        try {
            dispatch(courseActions.setLoading())
            const {data} = await request.get(`/api/courses/count`,{
                headers :{
                    Authorization : "Bearer " + getState().auth.user.token,
                }
            })
            dispatch(courseActions.setCourseCount(data))
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}




// Fetch courses 
export function fetchUserCourses() {
  return async (dispatch,getState) => {
    try {
      const { data } = await request.get(`/api/enrollments/user`,{
        headers: {
          Authorization: `Bearer `+ getState().auth.user.token,
          "Content-Type": "application/json"
        }
      });
      dispatch(courseActions.setUserCourses(data.enrollments))
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}




export function submitQuizScore(enrollmentId, quizId, score,timeUsed) {
  return async (dispatch, getState) => {
    try {
      dispatch(courseActions.setLoading());
      const { data } = await request.post(
        `/api/enrollments/${enrollmentId}/quizzes/${quizId}/quiz-score`,
        { score,timeUsed },
        { 
        headers: {
          Authorization: `Bearer `+ getState().auth.user.token,
          "Content-Type": "application/json"
        }
      }
      );
      dispatch(courseActions.setQuizScoreSubmitted({ quizId, score }));
      toast.success('Quiz score submitted successfully');
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to submit quiz score';
      toast.error(errorMessage);
    }
  };
}