import './Features.css'
import calling from '../../../Assets/calling.png';
import cutegirl from '../../../Assets/cutegirl.png';
import coding from '../../../Assets/coding.png';
import goodbook from '../../../Assets/books.png';
import desscusion from '../../../Assets/disccussion.png';
import cutey from '../../../Assets/cutey.png';


const Features = () => {
  return (
    <div className='features'>
        <h1>Our Features</h1>
        <p>This very extraordinary feature, can make learning activities more efficient</p>
        <div className="panarat">
            <div className="panar1">
                <img src={calling} alt="" />
                <div className="texty"><h4>A <span>user interface</span> designed for the classroom</h4>
                <p>Teachers don’t get lost in the grid view and have a dedicated Podium space.</p>
                <p>Teachers can easily see all students and class data at one time.</p>
                </div>
            </div>
            <div className="panar2">
                <img src={cutegirl} alt="" />
                <div className="texty">   <h4><span>Tools</span> For Teachers And Learners</h4>
                <p>Class has a dynamic set of teaching tools built to be deployed and used during class.
                Teachers can handout assignments in real-time for students to complete and submit.</p>
            </div>
             </div>
            <div className="panar3">
                <img src={coding} alt="" />
                <div className="texty"> 
                          <h4>Assessments, <span>Quizzes</span>, Tests</h4>
                <p>Easily launch live assignments, quizzes, and tests.
                Student results are automatically entered in the online gradebook.</p>
         </div>
            </div>
            <div className="panar4">
                <img src={goodbook} alt="" />
                <div className="texty">  
                     <h4><span>Class Management</span> Tools for Educators</h4>
                <p>Class provides tools to help run and manage the class such as Class Roster, Attendance, and more. With the Gradebook, teachers can review and grade tests and quizzes in real-time.</p>
            </div>
             </div>
            <div className="panar5">
                <img src={desscusion} alt="" />
                <div className="texty"> <h4>One-on-One <span>Discussions</span></h4>
                <p>Teachers and teacher assistants can talk with students privately without leaving the Zoom environment.</p>
                </div>
               
            </div>
            <div className="panar6">
                <img src={cutey} alt="" />
                <div className="texty"><h4>What They Say?</h4>
                <p>TOTC has got more than 100k positive ratings from our users around the world. </p>
                <p>Some of the students and teachers were greatly helped by the Skilline.</p>
                <p>Are you too? Please give your assessment</p>
                <button>Write your assessment</button>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Features
