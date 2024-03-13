
// var Offlinetable = document.getElementById("Offlinetodo");
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword , createUserWithEmailAndPassword, deleteUser} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getDatabase, ref, push, set,get, onValue, remove } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

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

const OldDBRef = ref(database, "School/Class/1ST/Student");
const NewDBRef = ref(database, "School/Class/12TH/Student");

LogInBtn.addEventListener("click", async function (e) {


// copyData();

alert("Please Wait Find Your Data")
let LoginName = document.getElementById("LoginName").value.toUpperCase();
let LoginPassword = document.getElementById("LoginPassword").value;
let NewLoginID = LoginName + LoginPassword.replace(/-/g, "");
console.log(LoginPassword.replace(/-/g, ""))
localStorage.setItem("LoginID", NewLoginID)
console.log("Student" +"_"+LoginName + LoginPassword + "@gmail.com")
e.preventDefault();

try { 
const userCredential = await signInWithEmailAndPassword(auth, "Student" +"_"+LoginName + LoginPassword.replace(/-/g, "") + "@gmail.com", LoginPassword.replace(/-/g, "") );
const user = userCredential.user;
console.log("Success! Welcome back!");
alert("Welcome Back To VJSSS");

} catch (error) {
if(error.code == "auth/invalid-login-credentials"){
alert("Please Check Your Mobile And Password")
}
console.log(error);
}
});

onValue(ref(database, `School/Student/${localStorage.getItem("LoginID")}/Personal/`), (snapshot) => {
snapshot.forEach((childSnapshot) => {
  const childData = childSnapshot.val();
  localStorage.setItem("Name", childData.Name)
  localStorage.setItem("FatherName", childData.FatherName)
  localStorage.setItem("MotherName", childData.MotherName)
  localStorage.setItem("Mobile", childData.Mobile)
  localStorage.setItem("DOB", childData.DOB)
  localStorage.setItem("Class", childData.Class)
  
  

});
});

onValue(ref(database, `School/Student/${localStorage.getItem("LoginID")}/Personal/`), (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const childData = childSnapshot.val();
    document.getElementById("TotalFee").innerHTML = childData.TotalFee;
    document.getElementById("SubmitedFee").innerHTML = childData.Submited;
    document.getElementById("PandingFee").innerHTML = childData.Panding
      
    
    });
    });

    let FeeRecord  = document.getElementById("FeeRecord")
            onValue(ref(database, `/School/Student/${localStorage.getItem("LoginID")}/Record`), (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    const childData = childSnapshot.val();
            const key = childSnapshot.key;
            
            
                // If homework data is present
                FeeRecord.innerHTML += `
                <li>
                <a href="javascript:void(0);" class="item-content item-link">
                    <div class="dz-inner">
                        <span class="dz-title">₹${childData.Submited} -- ${childData.Date} 
                        </span>
                    </div>
                </a>
                </li>
                `;
            
            
                 
                });
                
            });

    let ParentList = document.getElementById("ParentList")
            onValue(ref(database, `/School/Student/${localStorage.getItem("LoginID")}/Personal`), (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    const childData = childSnapshot.val();
                    
            const key = childSnapshot.key;
            
            
                // If homework data is present
                ParentList.innerHTML += `
                <li>
                    <div class="item-content">
                    <a href="#" class="item-media"><img src="../assets/images/images.png" alt="logo" width="55" /></a>
                    <div class="item-inner">
                    <div class="item-title-row my-3">
                    <h6 class="item-title"><a href="#">Father:- ${childData.FatherName}</a></h6>
                    <h6 class="item-title"><a href="#">Mother:- ${childData.MotherName}</a></h6>
                    <h5 class="item-title"><a href="#">Mobile:- ${childData.Mobile}</a></h5>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    <div class="sortable-handler"></div>
                    </li>
                `;
            
            
                 
                });
                
            });

let mainPage = document.querySelector("#Main-Page");
let loginPage = document.querySelector("#Login-Page");
let BottomBar = document.querySelector("#BottomBar");
auth.onAuthStateChanged((user) => {
	if (user) {
	
	mainPage.style.display = "block";
	username.innerHTML = localStorage.getItem("Name")
	loginPage.style.display = "none";
    BottomBar.style.display = "block"
	}
	else {
	
	mainPage.style.display = "none";
	BottomBar.style.dis
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
	


    let HomeworkSection = document.getElementById("HomeworkSection");
    let classId = localStorage.getItem("Class");
    
    onValue(ref(database, `/School/Class/${classId}/Homework`), (snapshot) => {
        // Initialize an array to store the HTML for new items
        let newItemsHTML = '';
    
        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
    
            // If homework data is present
            const newItemHTML = `
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
                            </div>
                        </div>
                    </div>
                </div>
            `;
    
            // Prepend new item HTML to the array
            newItemsHTML = newItemHTML + newItemsHTML;
        });
    
        // Add new homework HTML at the beginning of HomeworkSection
        HomeworkSection.innerHTML = newItemsHTML + HomeworkSection.innerHTML;
    });

    
    let MessageSection = document.getElementById("MessageSection");

    onValue(ref(database, `/School/Message`), (snapshot) => {
        // Initialize an array to store the HTML for new items
        let newItemsHTML = '';
    
        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
    
            // If message data is present
            const newItemHTML = `
                <a href="#">
                    <div class="notification active">
                        <h6>${childData.Title}</h6>
                        <p>${childData.Disc}</p>
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
    
            // Prepend new item HTML to the array
            newItemsHTML = newItemHTML + newItemsHTML;
        });
    
        // Add new message HTML at the beginning of MessageSection
        MessageSection.innerHTML = newItemsHTML + MessageSection.innerHTML;
    });
    
let RoutineSection = document.getElementById("RoutineSection")
onValue(ref(database, `/School/Class/${localStorage.getItem("Class")}/Routine`), (snapshot) => {
snapshot.forEach((childSnapshot) => {
  const childData = childSnapshot.val();
  RoutineSection.innerHTML += `
  <div class="row">
  <div class="col-12">
  <div class="card">
  <div class="card-header border-0 pb-0">
  <h5 class="card-title">Class Routine</h5>
  </div>
  <div class="card-body">
  <p class="card-text">
    <table class="table rounded" id="usertable">
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
  `

});
});

let SchoolExam = document.getElementById("SchoolExamSection")
onValue(ref(database, `/School/Student/${localStorage.getItem("LoginID")}/Result/SchoolExam`), (snapshot) => {
snapshot.forEach((childSnapshot) => {
  const childData = childSnapshot.val();
  SchoolExam.innerHTML += `
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
                    </div>
          </div>
      </div>
  </div>
  `

});
});


let ClassTest = document.getElementById("ClassExamSection")
onValue(ref(database, `/School/Student/${localStorage.getItem("LoginID")}/Result/ClassExam`), (snapshot) => {
snapshot.forEach((childSnapshot) => {
  const childData = childSnapshot.val();
  ClassTest.innerHTML += `
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
                    </div>
          </div>
      </div>
  </div>
  `

});
});


let ExamSection = document.getElementById("ExamSection");
onValue(ref(database, `/School/Class/${localStorage.getItem("Class")}/Exam`), (snapshot) => {
   snapshot.forEach((childSnapshot) => {
       const childData = childSnapshot.val();
const key = childSnapshot.key;


   // If homework data is present
   ExamSection.innerHTML += `
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
                       </div>
               </div>
           </div>
       </div>
   `;
});

   });

   let presentCount = 0;
   let absentCount = 0;
   let PresentRecord = document.getElementById("PresentRecord");
   let AbsentRecord = document.getElementById("AbsentRecord")
   let AttendanceRecord = document.getElementById("AttendanceRecord")
   onValue(ref(database, `/School/Student/${localStorage.getItem("LoginID")}/Attendanace`), (snapshot) => {
    snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        const key = childSnapshot.key;

        AttendanceRecord.innerHTML += `
            <li>
                <a href="javascript:void(0);" class="item-content item-link">
                    <div class="dz-icon">
                        <img src="../Images/stopwatch.png" alt="/" />
                    </div>
                    <div class="dz-inner">
                        <span class="dz-title" >${childData.Date} -- ${childData.Status} 
                          
                            </div>
                        </span>
                    </div>
                </a>
            </li>
        `;
        // console.log(childData);

        if (childData.Status === 'Present') {
            presentCount++;
            
        } else if (childData.Status === 'Absent') {
            absentCount++;
        }
 
        PresentRecord.innerHTML = presentCount;
        AbsentRecord.innerHTML = absentCount;
    
        });
    });
    

// auth.onAuthStateChanged((user) => {
// 	if (user) {

// 	mainPage.style.display = "block";
// 	username.innerHTML = localStorage.getItem("Name")
// 	loginPage.style.display = "none";
// 	}
// 	else {

// 	mainPage.style.display = "block";

// 	loginPage.style.display = "none";
// 	}
// 	});

// firebase.initializeApp(firebaseConfig);

// onValue(ref(database, "/School/Class/1ST/Student"), async (snapshot) => {
//   snapshot.forEach(async (childSnapshot) => {
//     var key = childSnapshot.key;
//     var data = childSnapshot.val();

//     console.log("Copying data with key:", key);

//     try {
//       // Copy data to the new location
//       await set(ref(database, "School/Class/12TH/Student/" + key), data);

//       // Remove the copied node from the old location
//       await remove(ref(database, "/School/Class/1ST/Student/" + key));

//       console.log("Data copied and removed successfully.");
//     } catch (error) {
//       console.error("Error copying data:", error);
//     }
//   });
// });



