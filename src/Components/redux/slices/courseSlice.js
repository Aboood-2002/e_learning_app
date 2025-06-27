import {  createSlice  }  from "@reduxjs/toolkit" ;


const courseSlice = createSlice({

    name : "course",
    initialState: {
        courses:[],
        courseCount:null,
        loading : false,
        isCourseCreated : false,
        course:null,
        lessons:[],
        quizzes:[],
        quiz:null,
        questions:[],
        checkoutSessionId:null,
        checkoutError: null,
        userCourses: [],
        quizScoreSubmitted: null,
        
    },

    reducers :{
        setCourses(state,action){
            state.courses =action.payload
        },
        setUserCourses(state,action){
            state.userCourses =action.payload
        },
        setCourseCount(state,action){
            state.courseCount =action.payload
        },
        setLoading(state){
            state.loading = true
        },
        clearLoading(state){
            state.loading = false
        },
        setIsCourseCreated(state){
            state.isCourseCreated = true
            state.loading = false
        },
        clearIsCourseCreated(state){
            state.isCourseCreated = false
        },
        setCheckoutSession(state, action) {
          state.checkoutSessionId = action.payload.sessionId;
          state.loading = false;
        },
         setCheckoutError(state, action) {
          state.checkoutError = action.payload;
         state.loading = false;
        },
         clearCheckout(state) {
          state.checkoutSessionId = null;
          state.checkoutError = null;
        },
        setCourse(state,action){
            state.course = action.payload;
        },
        deleteCourse(state,action){
            state.courses = state.courses.filter(p => p._id !== action.payload)
        },
        setLessons(state,action){
            state.lessons =action.payload
        },
        setQuizzes(state,action){
            state.quizzes =action.payload
        },
        setQuiz(state,action){
            state.quiz = action.payload;
        },
        setQuestions(state,action){
            state.questions =action.payload
        },
        setQuizScoreSubmitted(state, action) {
          state.quizScoreSubmitted = action.payload;
          state.loading = false;
          state.error = null;
       },
           
        }
        
    }
)


const courseReducer = courseSlice.reducer
const courseActions = courseSlice.actions

export {courseReducer,courseActions}