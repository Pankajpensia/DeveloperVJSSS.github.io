
// var Offlinetable = document.getElementById("Offlinetodo");
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword , createUserWithEmailAndPassword, deleteUser} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getDatabase, ref, push, set, onValue, remove } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

const firebaseConfig = {
apiKey: "AIzaSyBPDI-iW7_dqn2JBDjdLwC4BDTjUlBL778",
authDomain: "school-student-82628.firebaseapp.com",
databaseURL: "https://school-student-82628-default-rtdb.firebaseio.com",
projectId: "school-student-82628",
storageBucket: "school-student-82628.appspot.com",
messagingSenderId: "999134070496",
appId: "1:999134070496:web:e355caa7825b319a783285",
measurementId: "G-0878T4WK0R"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase();

LogInBtn.addEventListener("click", async function (e) {
// Display a loading message
alert("Please Wait Finding Your Data");

// Get the login name and password from input fields
let LoginName = document.getElementById("TeacherName").value.toUpperCase();
let LoginPassword = document.getElementById("password").value;

// Remove dashes from the password
let GeneratePassword = LoginPassword.replace(/-/g, "");

console.log(GeneratePassword)

// Generate a unique ID for login and store it in localStorage
localStorage.setItem("LoginID", LoginName + GeneratePassword);

// Display the generated ID in the console
// console.log(LoginName + GeneratePassword);

// Prevent the default form submission behavior
e.preventDefault();

try {
// Sign in with email and password using Firebase auth
const userCredential = await signInWithEmailAndPassword(auth, "Teacher" + "_" + LoginName + GeneratePassword + "@gmail.com", GeneratePassword);
const user = userCredential.user;

console.log("Success! Welcome back!");
// Alert user about successful login
alert("Welcome Back To VJSSS");
} catch (error) {
// Handle authentication errors
if (error.code == "auth/invalid-login-credentials") {
alert("Please Check Your Mobile And Password");
}
// Log any other errors
console.log(error);
}
});

// Fetch user data from the database
onValue(ref(database, `/School/Teacher/${localStorage.getItem("LoginID")}/Personal`), (snapshot) => {
snapshot.forEach((childSnapshot) => {
  const childData = childSnapshot.val();
  // Display user data in console
  // console.log(childData)
  console.log("Name "+childData.Name)
  console.log("Class "+childData.Class )
  localStorage.setItem("Name", childData.Name);
  localStorage.setItem("Class", childData.Class);
});
});

let mainPage = document.querySelector("#Main-Page");
let loginPage = document.querySelector("#Login-Page");

auth.onAuthStateChanged((user) => {
	if (user) {
	
	mainPage.style.display = "block";
	username.innerHTML = localStorage.getItem("Name")
	loginPage.style.display = "none";
	}
	else {
	
	mainPage.style.display = "none";
	
	loginPage.style.display = "block";
	}
	});
	
	LogOutBtn.addEventListener("click", function() {
	auth.signOut().then(() => {
	mainPage.style.display = "none";
	loginPage.style.display = "block";
	localStorage.clear()
	}).catch((error) => {
	console.error("Error during logout:", error);
	});
	});
	


let SelectResultStudent = document.getElementById("SelectResultStudent");
let AttendanceList = document.getElementById("AttendanceList");
let SelectPreviousAttendance = document.getElementById("SelectPreviousAttendance")
let PreviousAttendanceList = document.getElementById("PreviousAttendanceList")
let SelectPreviousResultStudent = document.getElementById("SelectPreviousResultStudent")
let SelectPreviousResultExamStudent = document.getElementById("SelectPreviousResultExamStudent")
let SelectStudent
SelectPreviousAttendance.addEventListener('change', function(){
     SelectStudent = SelectPreviousAttendance.value;
    console.log(SelectPreviousAttendance.value)
    onValue(ref(database, `/School/Student/${SelectPreviousAttendance.value}/Attendanace`), (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            const key = childSnapshot.key;
    
            PreviousAttendanceList.innerHTML += `
                <li>
                    <a href="javascript:void(0);" class="item-content item-link">
                        <div class="dz-icon">
                            <img src="../Images/stopwatch.png" alt="/" />
                        </div>
                        <div class="dz-inner">
                            <span class="dz-title">${childData.Date} -- ${childData.Status} 
                                <div style="position: absolute; right: 0; top: 3px">
                                    <button class="btn btn-sm DeleteAttendanceBtn" data-path="${key}">
                                        <img src="../Images/delete.png" " style="width:30px; height:30px;">
                                    </button>
                                </div>
                            </span>
                        </div>
                    </a>
                </li>
            `;
            // console.log(childData);
            const DeleteAttendanceBtn = document.querySelectorAll(".DeleteAttendanceBtn");
            DeleteAttendanceBtn.forEach((btn) => {
            btn.addEventListener("click", (event) => {
            const documentIdToDelete = event.target.getAttribute("data-path");
            if (documentIdToDelete) {
            const documentRefToDelete = ref(database, `/School/Student/${SelectPreviousAttendance.value}/Attendanace/${documentIdToDelete}`);
            
            DeleteAttendanceFunction(documentRefToDelete);
            }
            });
            });
        });
        
    
        });
})



async function DeleteAttendanceFunction(docRef) {
    alert("Attendance Delete in process")
    try {
    await remove(docRef);
    alert("Attendance Deleted");
    location.reload();
    } catch (error) {
    console.error(error);
    setInterval(function() {
    location.reload();
    }, 500);
    }
    }

    let ViewPreviousSchoolResult = document.getElementById("ViewPreviousSchoolResult")
    SelectPreviousResultExamStudent.addEventListener('change', function(){
        console.log(SelectPreviousResultExamStudent.value)
     onValue(ref(database, `/School/Student/${SelectPreviousResultExamStudent.value}/Result/SchoolExam`), (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
    const key = childSnapshot.key;
    
    
        // If homework data is present
        ViewPreviousSchoolResult.innerHTML += `
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header border-0 pb-0">
                            <h5 class="card-title">${childData.Title}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">
                                <table class="table rounded" >
                                    <thead>
                                        <tr>
                                            <th scope="col">Subject</th>
                                            <th scope="col">Total</th>
                                            <th scope="col">Obtain</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${childData.Result}      
                                    </tbody>
                                </table>
                            </p>
                        </div>
                        <div class="card-footer border-0 pt-0">
                            <p class="card-text d-inline">${childData.Date}</p>
                            <a href="javascript:void(0);"  class="card-link float-end DeleteSchoolExamResult" data-path="${key}">Delete</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    
    
            // console.log(childData);
            const DeleteSchoolExamResult = document.querySelectorAll(".DeleteSchoolExamResult");
            DeleteHomeworkBtn.forEach((btn) => {
            btn.addEventListener("click", (event) => {
            const documentIdToDelete = event.target.getAttribute("data-path");
            if (documentIdToDelete) {
            const documentRefToDelete = ref(database, `/School/Student/${SelectPreviousResultExamStudent.value}/Result/SchoolExam/${documentIdToDelete}`);
            
            DeleteSchoolExamResultFunction(documentRefToDelete);
            }
            });
            });
        });
        
    });
    
        });
    
        async function DeleteSchoolExamResultFunction(docRef) {
            alert("Result Delete in process")
            try {
            await remove(docRef);
            alert("Result Deleted");
            location.reload();
            } catch (error) {
            console.error(error);
            setInterval(function() {
            location.reload();
            }, 500);
            }
            }


        let SaleryRecord  = document.getElementById("SaleryRecord")
            onValue(ref(database, `/School/Teacher/${localStorage.getItem("LoginID")}/Record`), (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    const childData = childSnapshot.val();
            const key = childSnapshot.key;
            
            
                // If homework data is present
                SaleryRecord.innerHTML += `
                <li>
                <a href="javascript:void(0);" class="item-content item-link">
                    <div class="dz-inner">
                        <span class="dz-title">₹${childData.Recived} -- ${childData.Date} 
                        </span>
                    </div>
                </a>
                </li>
                `;
            
            
                 
                });
                
            });

            onValue(ref(database, `/School/Teacher/${localStorage.getItem("LoginID")}/Personal`), (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    const childData = childSnapshot.val();
            const key = childSnapshot.key;
                    document.getElementById('TotalSalaryBox').innerHTML = childData.TotalSalery;
                    document.getElementById("RecivedSalaryBox").innerHTML = childData.Recived;
                    document.getElementById("PandingSalaryBox").innerHTML = childData.Panding;
            
            
            
                 
                });
                
            });


let  SelectPreviousResultTestStudent = document.getElementById("SelectPreviousResultTestStudent")
 let ViewPreviousClassResult = document.getElementById("ViewPreviousClassResult")
 SelectPreviousResultTestStudent.addEventListener('change', function(){
                console.log(SelectPreviousResultExamStudent.value)
             onValue(ref(database, `/School/Student/${SelectPreviousResultTestStudent.value}/Result/ClassExam`), (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    const childData = childSnapshot.val();
            const key = childSnapshot.key;
            
            
                // If homework data is present
                ViewPreviousClassResult.innerHTML += `
                    <div class="row">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-header border-0 pb-0">
                                    <h5 class="card-title">${childData.Title}</h5>
                                </div>
                                <div class="card-body">
                                    <p class="card-text">
                                        <table class="table rounded" >
                                            <thead>
                                                <tr>
                                                    <th scope="col">Subject</th>
                                                    <th scope="col">Total</th>
                                                    <th scope="col">Obtain</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                ${childData.Result}      
                                            </tbody>
                                        </table>
                                    </p>
                                </div>
                                <div class="card-footer border-0 pt-0">
                                    <p class="card-text d-inline">${childData.Date}</p>
                                    <a href="javascript:void(0);"  class="card-link float-end DeleteSchoolExamResult" data-path="${key}">Delete</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            
            
                    // console.log(childData);
                    const DeleteClassTestResultBtn = document.querySelectorAll(".DeleteSchoolExamResult");
                    DeleteClassTestResultBtn.forEach((btn) => {
                    btn.addEventListener("click", (event) => {
                    const documentIdToDelete = event.target.getAttribute("data-path");
                    if (documentIdToDelete) {
                    const documentRefToDelete = ref(database, `/School/Student/${SelectPreviousResultExamStudent.value}/Result/ClassExam/${documentIdToDelete}`);
                    
                    DeleteClassExamResultFunction(documentRefToDelete);
                    }
                    });
                    });
                });
                
            });
            
                });
            
                async function DeleteClassExamResultFunction(docRef) {
                    alert("Result Delete in process")
                    try {
                    await remove(docRef);
                    alert("Result Deleted");
                    location.reload();
                    } catch (error) {
                    console.error(error);
                    setInterval(function() {
                    location.reload();
                    }, 500);
                    }
                    }

onValue(ref(database, `/School/Class/${localStorage.getItem("Class")}/StudentList`), (snapshot) => {
    snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        SelectResultStudent.innerHTML += `<option value="${childData.DataRef}">${childData.Name}</option>`;
        SelectPreviousAttendance.innerHTML += `<option value="${childData.DataRef}">${childData.Name}</option>`;
        SelectPreviousResultTestStudent.innerHTML += `<option value="${childData.DataRef}">${childData.Name}</option>`;
        SelectPreviousResultExamStudent.innerHTML += `<option value="${childData.DataRef}">${childData.Name}</option>`;
        AttendanceList.innerHTML += `
            <li>
                <a href="javascript:void(0);" class="item-content item-link">
                    <div class="dz-icon">
                        <img src="../Images/stopwatch.png" alt="/" />
                    </div>
                    <div class="dz-inner">
                        <span class="dz-title">${childData.Name} 
                            <div style="position: absolute; right: 0; top: 7px;">
                                <button class="btn btn-sm btn-primary present-btn" data-path="${childData.DataRef}">Present</button>
                                <button class="btn btn-sm btn-danger absent-btn" data-path="${childData.DataRef}">Absent</button>
                            </div>
                        </span>
                    </div>
                </a>
            </li>
        `;
        // console.log(childData);
    });
    
    const presentButtons = document.querySelectorAll(".present-btn");
    presentButtons.forEach((btn) => {
        btn.addEventListener("click", async (event) => {
            const presentPath = event.target.getAttribute("data-path");
            const listItem = event.target.closest('li'); // Get the closest li element
            if (presentPath && listItem) {
                const presentPaths = ref(database, `School/Student/${presentPath}/Attendanace`);
                try {
                    await presentFunction(presentPaths, listItem);
                    alert("Present Attendance Added");
                    
                    // location.reload();
                } catch (error) {
                    alert("Failed to mark attendance: " + error.message);
                    console.log(error)
                }
            }
        });
    });
    const absentButtons = document.querySelectorAll(".absent-btn");
absentButtons.forEach((btn) => {
    btn.addEventListener("click", async (event) => {
        const absentPath = event.target.getAttribute("data-path");
        const listItem = event.target.closest('li'); // Get the closest li element
        if (absentPath && listItem) {
            const absentPaths = ref(database, `School/Student/${absentPath}/Attendanace`);
            try {
                await absentFunction(absentPaths, listItem);
                alert("Absent Attendance Added");
                
                // location.reload();
            } catch (error) {
                alert("Failed to mark attendance: " + error.message);
                console.log(error)
            }
        }
    });
});
});




async function presentFunction(docRef, listItem) {
    try {
        const presentPath = push(docRef); // Assuming docRef is already a reference
        const time = new Date();
        const Day = time.getDate();
        const Month = time.getMonth() + 1; // Months start from 0, so add 1 to get the correct month
        const Year = time.getFullYear();
        const CurrentTime = Day + "/" + Month + "/" + Year;
        
        await set(presentPath, {
            Date: CurrentTime,
            Status: "Present"
        });
        listItem.parentNode.removeChild(listItem);
    } catch (error) {
        throw new Error("Failed to mark attendance: " + error.message);
    }
}

async function absentFunction(docRef, listItem) {
    try {
        const absentPath = push(docRef); // Assuming docRef is already a reference
        const time = new Date();
        const Day = time.getDate();
        const Month = time.getMonth() + 1; // Months start from 0, so add 1 to get the correct month
        const Year = time.getFullYear();
        const CurrentTime = Day + "/" + Month + "/" + Year;
        
        await set(absentPath, {
            Date: CurrentTime,
            Status: "Absent"
        });
        listItem.parentNode.removeChild(listItem);
    } catch (error) {
        throw new Error("Failed to mark attendance: " + error.message);
    }
}


    let Atttendance = document.getElementById("SelectResultStudent");
    onValue(ref(database, `/School/Class/${localStorage.getItem("Class")}/StudentList`), (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const childData = childSnapshot.val();
          Atttendance.innerHTML += `<option value="${childData.DataRef}">${childData.Name}</option>`
        console.log(childData)
    
        });
        });

// auth.onAuthStateChanged((user) => {
// if (user) {

// mainPage.style.display = "block";
// username.innerHTML = localStorage.getItem("Name")
// loginPage.style.display = "none";
// }
// else {

// mainPage.style.display = "block";

// loginPage.style.display = "none";
// }
// });


// Add Homework Section

let PreviousHomeworkPage = document.getElementById("PreviousHomeworkPage")
onValue(ref(database, `/School/Class/${localStorage.getItem("Class")}/Homework`), (snapshot) => {
    snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
const key = childSnapshot.key;


    // If homework data is present
    PreviousHomeworkPage.innerHTML += `
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header border-0 pb-0">
                        <h5 class="card-title">Daily Homework</h5>
                    </div>
                    <div class="card-body">
                        <p class="card-text">
                            <table class="table rounded" >
                                <thead>
                                    <tr>
                                        <th scope="col">Subject</th>
                                        <th scope="col">Work</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${childData.Homework}      
                                </tbody>
                            </table>
                        </p>
                    </div>
                    <div class="card-footer border-0 pt-0">
                        <p class="card-text d-inline">${childData.Date}</p>
                        <a href="javascript:void(0);"  class="card-link float-end deleteHomework" data-path="${key}">Delete</a>
                    </div>
                </div>
            </div>
        </div>
    `;


        // console.log(childData);
        const DeleteHomeworkBtn = document.querySelectorAll(".deleteHomework");
        DeleteHomeworkBtn.forEach((btn) => {
        btn.addEventListener("click", (event) => {
        const documentIdToDelete = event.target.getAttribute("data-path");
        if (documentIdToDelete) {
        const documentRefToDelete = ref(database, `/School/Class/${localStorage.getItem("Class")}/Homework/${documentIdToDelete}`);
        
        DeleteHomeworkFunction(documentRefToDelete);
        }
        });
        });
    });
    

    });

    async function DeleteHomeworkFunction(docRef) {
        alert("Homework Delete in process")
        try {
        await remove(docRef);
        alert("Homework Deleted");
        location.reload();
        } catch (error) {
        console.error(error);
        setInterval(function() {
        location.reload();
        }, 500);
        }
        }
    
 let PreviousExamPage = document.getElementById("PreviousExamPage");
 onValue(ref(database, `/School/Class/${localStorage.getItem("Class")}/Exam`), (snapshot) => {
    snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
const key = childSnapshot.key;


    // If homework data is present
    PreviousExamPage.innerHTML += `
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header border-0 pb-0">
                        <h5 class="card-title">${childData.Title}</h5>
                    </div>
                    <div class="card-body">
                        <p class="card-text">
                            <table class="table rounded" >
                                <thead>
                                    <tr>
                                        <th scope="col">Subject</th>
                                        <th scope="col">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${childData.Exam}      
                                </tbody>
                            </table>
                        </p>
                    </div>
                    <div class="card-footer border-0 pt-0">
                        <p class="card-text d-inline">${childData.Date}</p>
                        <a href="javascript:void(0);"  class="card-link float-end DeleteExam" data-path="${key}">Delete</a>
                    </div>
                </div>
            </div>
        </div>
    `;


        // console.log(childData);
        const DeleteExam = document.querySelectorAll(".DeleteExam");
        DeleteExam.forEach((btn) => {
        btn.addEventListener("click", (event) => {
        const documentIdToDelete = event.target.getAttribute("data-path");
        if (documentIdToDelete) {
        const documentRefToDelete = ref(database, `/School/Class/${localStorage.getItem("Class")}/Exam/${documentIdToDelete}`);
        
        DeleteExamFunction(documentRefToDelete);
        }
        });
        });
    });
    

    });

    async function DeleteExamFunction(docRef) {
        alert("Exam Delete in process")
        try {
        await remove(docRef);
        alert("Exam Deleted");
        location.reload();
        } catch (error) {
        console.error(error);
        setInterval(function() {
        location.reload();
        }, 500);
        }
        }
    

        // let PreviousResultPage = document.getElementById("PreviousResultPage")
        // onValue(ref(database, `/School/Student/PANKAJ20040805/Result`), (snapshot) => {
        //     snapshot.forEach((childSnapshot) => {
        //         const childData = childSnapshot.val();
        // const key = childSnapshot.key;
        
        
        //     // If homework data is present
        //     PreviousHomeworkPage.innerHTML += `
        //         <div class="row">
        //             <div class="col-12">
        //                 <div class="card">
        //                     <div class="card-header border-0 pb-0">
        //                         <h5 class="card-title">Daily Homework</h5>
        //                     </div>
        //                     <div class="card-body">
        //                         <p class="card-text">
        //                             <table class="table rounded" >
        //                                 <thead>
        //                                     <tr>
        //                                         <th scope="col">Subject</th>
        //                                         <th scope="col">Work</th>
        //                                     </tr>
        //                                 </thead>
        //                                 <tbody>
        //                                     ${childData.Homework}      
        //                                 </tbody>
        //                             </table>
        //                         </p>
        //                     </div>
        //                     <div class="card-footer border-0 pt-0">
        //                         <p class="card-text d-inline">${childData.Date}</p>
        //                         <a href="javascript:void(0);"  class="card-link float-end deleteHomework" data-path="${key}">Delete</a>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     `;
        
        
        //         // console.log(childData);
        //         const DeleteHomeworkBtn = document.querySelectorAll(".deleteHomework");
        //         DeleteHomeworkBtn.forEach((btn) => {
        //         btn.addEventListener("click", (event) => {
        //         const documentIdToDelete = event.target.getAttribute("data-path");
        //         if (documentIdToDelete) {
        //         const documentRefToDelete = ref(database, `/School/Class/${localStorage.getItem("Class")}/Homework/${documentIdToDelete}`);
                
        //         DeleteHomeworkFunction(documentRefToDelete);
        //         }
        //         });
        //         });
        //     });
            
    
        
        //     });
        
        //     async function DeleteHomeworkFunction(docRef) {
        //         alert("Homework Delete in process")
        //         try {
        //         await remove(docRef);
        //         alert("Homework Deleted");
        //         location.reload();
        //         } catch (error) {
        //         console.error(error);
        //         setInterval(function() {
        //         location.reload();
        //         }, 500);
        //         }
        //         }
        let RoutineSection = document.getElementById("RoutineSection")    
        onValue(ref(database, `/School/Class/${localStorage.getItem("Class")}/Routine`), (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childData = childSnapshot.val();
        const key = childSnapshot.key;
        
        
            // If homework data is present
            RoutineSection.innerHTML += `
            <div class="row">
            <div class="col-12">
            <div class="card">
            <div class="card-header border-0 pb-0">
            <h5 class="card-title">${childData.Title}</h5>
            </div>
            <div class="card-body">
            <p class="card-text">
              <table class="table rounded">
                <thead>
                <tr>
                <th scope="col">Class</th>
              
                <th scope="col">Start Time</th>
                <th scope="col">End Time</th>

              </tr>
                </thead>
                <tbody>
                 ${childData.Exam}
                </tbody>
                </table>
                
            </p>
            </div>
            <div class="card-footer border-0 pt-0">
            <p class="card-text d-inline">${childData.Date}</p>
             </div>
            </div>
            </div>
            </div>
            `;
        
        
                // console.log(childData);
            
            });
            
        
            });


            let MessageSection = document.getElementById("MessageSection")    
            onValue(ref(database, `/School/Message`), (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    const childData = childSnapshot.val();
                    const Title = childData.Title;
                    const Disc = childData.Disc;
                    const Date = childData.Date
            const key = childSnapshot.key;
            
            
                // If homework data is present
                MessageSection.innerHTML += `
                <a href="#">
                <div class="notification active">
                <h6>${Title}</h6>
                <p>${Disc}</p>
                <div class="notification-footer">
                <span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z" stroke="#787878" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M6 3V6L8 7" stroke="#787878" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
                ${childData.Date}
                </span>
               
                </div>
                </div>
                </a>
                `;
            
            
                    // console.log(childData);
                
                });
                
            
                });
    

function AddHomework() {

    let HomeworkTable = document.getElementById("HomeworkTable")
    // Get values from input fields
    let HomeworkSubject = document.getElementById("HomeworSubject").value;
    let HomeworkDetails = document.getElementById("HomeworkDetails").value;

 
    // Append the new row to the table
    HomeworkTable.innerHTML += `<tr>
    <th scope="row">${HomeworkSubject}</th>

    <td class="amountcal">${HomeworkDetails}</td>
</tr>`;

    HomeworkSubject.value = " ";
    HomeworkDetails.value = " ";
}

AddHomeworkBtn.addEventListener('click', function(){
    AddHomework();
    document.getElementById("HomeworSubject").value = ""
})

function SubmitHomework() {
    alert("Please wait...");
    // e.preventDefault();

    let time = new Date();
    let Day = time.getDate();
    let Month = time.getMonth() + 1; // Months start from 0, so add 1 to get the correct month
    let Year = time.getFullYear();
    let CurrentTime = Day + "/" + Month + "/" + Year;

    const HomeworkRef = push(ref(database, `School/Class/${localStorage.getItem("Class")}/Homework`));

    set(HomeworkRef, {
        Homework: document.getElementById("HomeworkTable").innerHTML,
        Date: CurrentTime
    });

    alert("Homework Added")
    location.reload();
}
let SubmitHomeworkBtn = document.querySelector("#SubmitHomeworkBtn")
SubmitHomeworkBtn.addEventListener("click", function(){
    SubmitHomework();
});


// Add Exam Section

function AddExam() {

    let ExamTable = document.getElementById("ExamTable")
    // Get values from input fields
    let ExamTitle = document.getElementById("ExamTitle").value;
    let ExamSubject = document.getElementById("ExamSubject").value;
    let ExamDate = document.getElementById("ExamDate").value;

 
    // Append the new row to the table
    ExamTable.innerHTML += `<tr>
    <th scope="row">${ExamSubject}</th>

    <td class="amountcal">${ExamDate}</td>
</tr>`;
}

let AddExamBtn = document.querySelector("#AddExamBtn")
AddExamBtn.addEventListener('click', function(){
    AddExam();
})

function SubmitExam() {
    alert("Please wait...");
    
    let time = new Date();
    let Day = time.getDate();
    let Month = time.getMonth() + 1; // Months start from 0, so add 1 to get the correct month
    let Year = time.getFullYear();
    let CurrentTime = Day + "/" + Month + "/" + Year;

    const ExamRef = push(ref(database, `School/Class/${localStorage.getItem("Class")}/Exam`));

    set(ExamRef, {
        Exam: document.getElementById("ExamTable").innerHTML,
        Date: CurrentTime,
        Title: document.getElementById("ExamTitle").value
    });

    alert("Exam Added")
    location.reload();
}

let SubmitExamBtn = document.querySelector("#SubmitExamBtn")
SubmitExamBtn.addEventListener("click", function(){
    SubmitExam();
});


SelectResultStudent.addEventListener('change', function(){
    console.log(SelectResultStudent.value)
})
let SelectResultExam = document.querySelector("#SelectResultExam")
SelectResultExam.addEventListener('change', function(){
    console.log(SelectResultExam.value)
})

function AddResult() {

    let ResultTable = document.getElementById("ResultTable")
    // Get values from input fields
    let ResultSubject = document.getElementById("ResultSubject").value;
    let TotalMarks = document.getElementById("ExamTotalMarks").value;
    let ObtainMarks = document.getElementById("ExamObtainMarks").value;

 
    // Append the new row to the table
    ResultTable.innerHTML += `<tr>
    <th scope="row">${ResultSubject}</th>
    <td class="amountcal">${TotalMarks}</td>
    <td class="amountcal">${ObtainMarks}</td>
</tr>`;
}

AddResultBtn.addEventListener('click', function(){
    AddResult();
})

function SubmitResult(e) {
    alert("Please wait...");
    // e.preventDefault();
   
    let time = new Date();
    let Day = time.getDate();
    let Month = time.getMonth() + 1; // Months start from 0, so add 1 to get the correct month
    let Year = time.getFullYear();
    let CurrentTime = Day + "/" + Month + "/" + Year;

    const ResultRef = push(ref(database, `School/Student/${SelectResultStudent.value}/Result/${SelectResultExam.value}/`));

    set(ResultRef, {
        Result: document.getElementById("ResultTable").innerHTML,
        Date: CurrentTime,
        Title: document.getElementById("ResultTitle").value
    });

    alert("Result Added")
    location.reload();
}
let SubmitResultBtn = document.querySelector("#SubmitResultBtn")
SubmitResultBtn.addEventListener("click", function(){
    SubmitResult();
});

