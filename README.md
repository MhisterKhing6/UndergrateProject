<h1>Auto Code Grader Backend </h1>
<hr>
<h3>Endpoints </h3>
<h4>Programs and Classes </h4>
<hr />
<i>/api/compilers</i> 
<p>Method: GET <br />
Required fields: None
    <br />
   Returns sucess status: 200 and a list of all compilers offered by the program</br>
   Return failure: a json response with a reason field explaining the cause of the failure
</p>
<i>/api/compiler/:id</i> <br> 
Description: returns compiler with compiler id
<p>Method: GET <br />
Required fields: None
    <br />
   Returns sucess status: 200 and compiler object </br>
   Return failure: a json response with a reason field explaining the cause of the failure
</p> 
<i>/api/programs</i> 
<p>Method: GET <br />
Required fields: none<br />
   Returns status: 200 for success and a json array containing all the programs allowed by thes system
   Return failer: json body with 'reason' parameter explaining the cause of the failure </br>
</p>

<i>/api/program/classes</i> 
<p>Method: POST <br />
Required fields: ProgramId
   <ul>
   <li>ProgramId: primary key for program entry
   </ul>
    <br />
   Returns sucess status: 200 and all the classes under a program</br>
   Return failure: a json reasonponse with a reason field explaining the cause of the failure
</p> 

<i>/api/program/class/courses/:ClassId</i> 
<p>Method: GET <br />
Description: returns all courses offered by a class
Required fields: :classId
   <ul>
   <li>ClassId: primary key for class entry
   </ul>
    <br />
   Returns sucess status: 200 and all the classes under a program</br>
   Return failure: a json reasonponse with a reason field explaining the cause of the failure
</p>
<h4>Email and User Verification</h4>
<hr />
<i>/api/auth/resend/email/:id</i> 
<p>Method: GET <br />
Description: resend new verification code to user with verification id equals id
Required fields: id
   <ul>
   id: a verification id that is given to user after registration
   </ul>
    <br />
   Returns sucess status: 200 and and a verification id</br>
   Return failure: a json response with a reason field explaining the cause of the failure
</p>

<i>/api/auth/verify/email/:id/:secret"</i> 
<p>Method: GET <br />
Description: check if the verifcation code sent to user equals the one assigned by system
Required fields: id, secret
   <ul>
   <li> id: a verification id that is given to user after registration </li>
   <li>secrete: the verificaiton code sent to user email </li>
   </ul>
    <br />
   Returns sucess status: 200 and and user verified message</br>
   Return failure: a json response with a reason field explaining the cause of the failure
</p>

<i>/api/auth/email/reset-password/:email/:type </i>
<p>Method: GET <br />
Description: send verification code to user email for password reset
Required fields: email, type
   <ul>
   <li> email: user email use to register the systsem </li>
   <li>type: takes password by default</li>
   </ul>
    <br />
   Returns sucess status: 200 and and a verification id</br>
   Return failure: a json response with a reason field explaining the cause of the failure
</p>

<i>/api/auth/email/reset-password/verify/:id/:secret</i>
<p>Method: GET <br />
Description: verifies user for password reset
Required fields: id, secrete
   <ul>
   <li> id: the verification id given when requested for password reset </li>
   <li>secrete: the verification code sent to user email</li>
   </ul>
    <br />
   Returns sucess status: 200 and and a verification id</br>
   Return failure: a json response with a reason field explaining the cause of the failure
</p>

<i>/api//auth/user/reset-password</i>
<p>Method: POST <br />
Description: verifies user for password reset
Required fields: pwd, verificationId
   <ul>
   <li> pwd: the new user passowrd to set</li>
   <li>verificationId: id with status verified set</li>
   </ul>
    <br />
   Returns sucess status: 200 and and a verification id</br>
   Return failure: a json response with a reason field explaining the cause of the failure
</p>

<hr>
<h4>Lecturer </h4>
<hr />
<i>/api/auth/register/lecturer </i> 
<p>Method: POST <br />
Required fields: 'email', 'password', 'name', 'lecturerId' <br />
   Returns status: 201 for successful creation or a json body with 'reason' parameter explaining the cause of the failure </br>
</p>

<i>/api/auth/login/lecturer </i> 
<p>Method: POST <br />
Required fields: 'password', 'lecturerId' <br />
   Returns sucess status: 200 json resonse with a token for verification </br>
   Return failure: a json reasonponse with a reason field explaining the cause of the failure
</p>

<i>/api/auth/lecturer/refresh/token </i> 
<p>Method: POST <br />
Required fields: 'refresh_token' <br />
   Returns sucess status: 200 json resonse with a token for verification </br>
   Return failure: a json reasonponse with a reason field explaining the cause of the failure
</p>

<i>/user/lecturer/me </i> 
<p>Method: GET <br />
Required fields: "title", "ClassId", "CompilerId", "startDate", "endDate"<br />
   Returns status: 200 returns user details  </br>
   Return failure: a json reasonponse with a reason field explaining the cause of the failure
</p> 

<i>/coder/lecturer/assignment </i> 
<p>Method: POST  authenticated endpoint<br />
Required fields: "title", "ClassId", "CompilerId", "startDate", "endDate"<br />
   Returns status: 201 returns user details  </br>
   Return failure: a json response with a reason field explaining the cause of the failure <br>
Description: Create assignment
</p> 

<i>/coder/lecturer/assignments </i> 
<p>Method: GET authenticated endpoint<br />
Required fields: none<br />
   Returns status: 200 for success  </br>
   Return failure: a json response with a reason field explaining the cause of the failure <br>
Description: return all assignments created by a lecturer
</p> 

<i>/coder/lecturer/asignment/:id </i> 
Description: return assignment that has id equal to :id
<p>Method: PUT authenticated endpoint<br />
   Returns status: 200 returns user details and assignment object  </br>
   Return failure: a json response with a reason field explaining the cause of the failure <br>
</p> 

/user/lecturer/asignment/:id </i> 
<p>Method: GET authenticated endpoint<br />
Required fields: id which is assignment id and or more accepted create assignment fields<br />
   Returns status: 200 returns user details  </br>
   Return failure: a json response with a reason field explaining the cause of the failure <br>
Description: update assignment with id
</p> 
<i>/coder/lecturer/asignment/:id </i> 
<p>Method: DELETE authenticated endpoint<br />
Required fields: id as assignment id<br />
   Returns status: 200 returns user details  </br>
   Return failure: a json response with a reason field explaining the cause of the failure <br>
Description: delete assignmetn with id
</p> 

<i>/coder/lecturer/asignment/task </i> 
<p>Method: POST authenticated endpoint<br />
Description: add question to assignment
Required fields: "ext", "requirement", "solutionPath", "AssignmentId", "number", "examples", "solutionScript"<br />
<ul>
    <li>ext: extension for the solutionScript example py,js etc </li>
    <li>requirement: requirement for the task, example create a function etc </li>
    <li>solutionPath: name for student solution file </li>
    <li>AssignmentId: the Id for the assignment to add the task </li>
    <li>The number of the  task </li>
    <li>examples: examples to make it clear for student to understand </li>
</ul>
   Returns status: 200 returns user details  </br>
   Return failure: a json response with a reason field explaining the cause of the failure <br>

</p> 

<i>/coder/lecturer/asignment/task </i> 
<p>Method: PUT authenticated endpoint<br />
Description: update question with id <br />
Required fields: id as in task id and one or more accepted create task field<br />
   Returns status: 200 returns user details  </br>
   Return failure: a json response with a reason field explaining the cause of the failure <br>
</p>

<i>/coder/lecturer/asignment/tasks/:assId </i> 
<p>Method: GET authenticated endpoint<br />
Description: return all questions for assignement, that has id as assId <br />
   Returns status: 200 and all question as a list in body  </br>
   Return failure: a json response with a reason field explaining the cause of the failure <br>
</p>

<i>/coder/lecturer/asignment/task/:id </i> 
<p>Method: DELETE authenticated endpoint<br />
Description: delete questtion that has id has :id<br />
   Returns status: 200 and all question </br>
   Return failure: a json response with a reason field explaining the cause of the failure <br>
</p>

<i>/user/lecturer/asignment/task/:id </i> 
<p>Method: GET authenticated endpoint<br />
Description: retrive question that has id<br />
   Returns status: 200 and task object</br>
   Return failure: a json response with a reason field explaining the cause of the failure <br>
</p>


<h4>Student </h4>
<hr />
<i>/api/auth/register/student </i>
   Des
<p>Method: POST <br />
   Description: register new student
   Required fields: 'email', 'password', 'name',index", "ClassId", "ProgramId", "username",  "studentId" <br />
   Returns status: 201 for successful creation or a json body with 'reason' parameter explaining the cause of the failure </br>
</p>

<i>/api/auth/login/student </i> 
<p>Method: POST <br />
Description: logs student in
Required fields: 'password', 'studentId' <br />
   Returns sucess status: 200 json resonse with a token for verification </br>
   Return failure: a json reasonponse with a reason field explaining the cause of the failure
</p> 

<i>/api/auth/student/refresh/token </i> 
<p>Method: POST <br />
Required fields: 'refresh_token' <br />
   Returns sucess status: 200 json resonse with a token for verification </br>
   Return failure: a json reasonponse with a reason field explaining the cause of the failure
</p>
