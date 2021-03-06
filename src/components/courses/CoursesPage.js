import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CoursesList from './CourseList';
import {BrowserRouter, withRouter} from 'react-router-dom';
import Title from '../common/Title';

const SaveButton = withRouter(
    ({history}) => 
        <input type="button"
        value="Add Course"
        className="btn btn-primary"
        onClick={()=> history.push("/course")}/>
    
)


class CoursesPage extends React.Component {
    constructor(props, context){
        super(props, context);

        this.state = {
            course: {title : ""}
        };
        
    }

    
    courseRow(course, index){
        return  <div key={index}>{course.title}</div>
    }

    deleteRow(course){
        console.log(course)
      this.props.actions.deleteCourse(course);
    }


    render(){
   
        const {courses} = this.props;
        const title = "Courses";
        const buttonStyle = {
            textAlign: "center"
        };
        return (
            <div>
                <Title title={title}></Title>
                <div style={buttonStyle}>
                <SaveButton></SaveButton>
                </div>
                <br></br>
                <CoursesList onClick={(course) => this.deleteRow(course)} courses={courses}/>
            </div>
        );
    }
}





function mapStateToProps(state, ownProps){
    return {
      courses: state.courses
    };
}

function mapDispatchToProps(dispatch){
   return {
       actions: bindActionCreators(courseActions, dispatch)
   }
}


export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);