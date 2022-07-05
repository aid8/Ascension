Parse.Cloud.define("AddCourse", async(request) => {
    const Course = Parse.Object.extend("Course");
    const course = new Course();
    course.save({
        "CourseName" : request.params.CourseName,
        "CourseCode" : request.params.CourseCode,
    }).then(()=>{
        console.log("Successfully added Course!");
    });
});

Parse.Cloud.define("GetCourses", async(_request) =>{
    const Course = Parse.Object.extend("Course");
    const query = new Parse.Query(Course);
    const res = await query.find();
    return JSON.stringify(res);
});