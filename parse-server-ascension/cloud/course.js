Parse.Cloud.define("AddCourse", async(request) => {
    const Course = Parse.Object.extend("Course");
    const course = new Course();
    course.save({
        "CourseName" : request.params.CourseName,
        "CourseCode" : request.params.CourseCode,
        "CourseDegreesIDPointers" : request.params.CourseDegreesIDPointers
    }).then(()=>{
        console.log("Successfully added Course!");
    });
});

//Must specify id of course with name of "CourseID" then the attribute name along with the new value
Parse.Cloud.define("EditCourse", async(request) =>{
    const Course = Parse.Object.extend("Course");
    const query = new Parse.Query(Course);
    const argument = request.params;
    query.equalTo("objectId", argument.CourseID);
    const res = await query.first();
    
    var list_of_attr = ["CourseName", "CourseCode", "CourseDegreesIDPointers",];
    var list_of_arguments = [argument.CourseName, argument.CourseCode, argument.CourseDegreesIDPointers,];

    for(let i = 0; i < list_of_attr.length; ++i){
        if(list_of_arguments[i] != null){
            res.set(list_of_attr[i], list_of_arguments[i]);
        }
    }

    res.save().then(()=>{
        console.log("Successfully Edited Course");
    });
});

//Must specify id of course with name of "CourseID"
Parse.Cloud.define("DeleteCourse", async(request) =>{
    const Course = Parse.Object.extend("Course");
    const query = new Parse.Query(Course);
    const argument = request.params;
    query.equalTo("objectId", argument.CourseID);
    const res = await query.first();

    //Should throw error if a student/teacher has a course on this CourseID
    var students = JSON.parse(await Parse.Cloud.run("GetStudents"));
    for (const student of students){
        var studentCourses = student.StudentCoursesIDPointer;
        if(studentCourses.indexOf(argument.CourseID) > -1){
            return Promise.reject("Cannot Delete Course! A Student has this Course!");
        }
    }

    var teachers = JSON.parse(await Parse.Cloud.run("GetTeachers"));
    for (const teacher of teachers){
        var teacherCourses = teacher.TeacherCoursesIDPointer;
        if(teacherCourses.indexOf(argument.CourseID) > -1){
            return Promise.reject("Cannot Delete Course! A Teacher has this Course!");
        }
    }

    res.destroy().then(()=>{
        console.log("Successfully Deleted Course");
    });
});

//Must specify id of course with name of "CourseID"
//Returns the data of a course
Parse.Cloud.define("GetCourseData", async(request) => {
    const Course = Parse.Object.extend("Course");
    const query = new Parse.Query(Course);
    const argument = request.params;
    query.equalTo("objectId", argument.CourseID);
    const res = await query.first();
    return JSON.stringify(res);
});

//Returns all courses
//If CourseDegreeID is specified, then it returns all courses that needs that degree(Exception to electives)
Parse.Cloud.define("GetCourses", async(request) =>{
    const Course = Parse.Object.extend("Course");
    const query = new Parse.Query(Course);
    const argument = request.params;
    const res = await query.find();

    var coursesToShow = [];
    if(argument.CourseDegreeID != null){
        //Iterate in the list of all courses
        for(const course of res){
            //Get the array of degree pointers which needs this course
            var CourseDegreeIDPointers = course.get("CourseDegreesIDPointers");

            //If the course does not need a degree, then automatically add it
            if(CourseDegreeIDPointers.length == 0){
                coursesToShow.push(course);
            }
            else{
                //Check if the given degree is CourseDegreeIDPointers, add the course if found
                var scan = CourseDegreeIDPointers.indexOf(argument.CourseDegreeID);
                if(scan > -1){
                    coursesToShow.push(course);
                }
            }
        }
    }
    else{
        coursesToShow = res;
    }
    return JSON.stringify(coursesToShow);
});