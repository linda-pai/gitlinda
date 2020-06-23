# gitlinda

0623

App.js 

<Route path="/life/courseDetail/:second?/:third?/:fourth?">
              <CourseDetail 
              changeBackgroundColorLight={changeBackgroundColorLight}/>
            </Route>
            
------------------------------------------------------------------------------
Courses -288

linkUrl={course.linkUrl}

------------------------------------------------------------------------------

Course -12

 <div className="item-img"  onClick={() => props.history.push(`/life/courseDetail${props.linkUrl}?courseId=${props.courseId}`)}>
