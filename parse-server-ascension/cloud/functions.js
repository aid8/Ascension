Parse.Cloud.define('addStudent', async(request) => {
  const Student = Parse.Object.extend('Student');
  const student = new Student();
  student.set('FirstName', request.params.FirstName);
  student.set('MiddleName', request.params.MiddleName);
  student.set('LastName', request.params.LastName);
  student.save().then(()=>{
      console.log("Successfully added Student!");
  });
});
