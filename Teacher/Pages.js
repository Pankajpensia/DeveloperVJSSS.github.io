
      const mainPage = document.querySelector("#Main-Page")
      
      const homePage = document.querySelector("#Home-Page");

      const profilePage = document.querySelector("#Profile-Page");

      const homeworkPage = document.querySelector("#Homework-Page");
      const NewHomeworkPage = document.querySelector("#NewHomeworkPage");
      const PreviousHomeworkPage = document.querySelector("#PreviousHomeworkPage");
      const examPage = document.querySelector("#Exam-Page");
      const NewExamPage = document.querySelector("#NewExamPage");
      const PreviousExamPage  = document.querySelector("#PreviousExamPage");

      const messagePage = document.querySelector("#Message-Page");

      const resultPage = document.querySelector("#Result-Page");
      const NewResultPage = document.querySelector("#NewResultPage")
      const PreviousSchoolExamResult = document.querySelector("#PreviousSchoolExamResult");
      const PreviousClassTestResult = document.querySelector("#PreviousClassTestResult")

      const attendancePage = document.querySelector("#Attendance-Page");
      const NewAttendancePage = document.querySelector("#NewAttendancePage");
      const PreviousAttendancePage = document.querySelector("#PreviousAttendancePage")

      const noticePage = document.querySelector("#Notice-Page");
 
      const routinePage = document.querySelector("#Routine-Page")
   
      const galleryPage = document.querySelector("#Gallery-Page")
      

      const loginPage = document.querySelector("#Login-Page");
      const headerName = document.getElementById("HeaderName");
    


      function hideAllPages() {
        const allPages = [NewExamPage, PreviousExamPage,homePage, homeworkPage,profilePage ,resultPage,PreviousClassTestResult,PreviousSchoolExamResult, examPage, attendancePage, PreviousAttendancePage, noticePage, routinePage, galleryPage, loginPage];

        allPages.forEach((page) => {
          page.style.display = "none";
        });
      }

      NewExamPageBtn.addEventListener('click', function(){
        hideAllPages();

        headerName.innerHTML = "Exam Page";

        examPage.style.display = "block";
        NewExamPage.style.display = "block"
    
      })

      PreviousExamPageBtn.addEventListener("click", function(){
        hideAllPages();

        headerName.innerHTML = "Exam Page";

        examPage.style.display = "block";
        PreviousExamPage.style.display = "block"
      })

      ProfilePageBtn.addEventListener("click", function () {
        hideAllPages();

          headerName.innerHTML = "Profile Page";

          profilePage.style.display = "block";

      
      });

      HomePageBtn.addEventListener("click", function () {
        hideAllPages();

        headerName.innerHTML = "Home Page";

        homePage.style.display = "block";

        setActiveClass(HomePageBtn);
      });

      HomeworkPageBtn.addEventListener("click", function () {
        hideAllPages();

        headerName.innerHTML = "Homework Page";

        homeworkPage.style.display = "block";

        setActiveClass(HomePageBtn);
      });

      PreviousHomeworkPageBtn.addEventListener("click", function () {
        hideAllPages();

        headerName.innerHTML = "Homework Page";

        homeworkPage.style.display = "block";
        NewHomeworkPage.style.display = "none"
        PreviousHomeworkPage.style.display = "block"

        setActiveClass(HomePageBtn);
      });
      
      NewHomeworkPageBtn.addEventListener("click", function () {
        hideAllPages();

        headerName.innerHTML = "Homework Page";

        homeworkPage.style.display = "block";
        PreviousHomeworkPage.style.display = "none"
        NewHomeworkPage.style.display = "block"

        setActiveClass(HomePageBtn);
      });

      ExamPageBtn.addEventListener("click", function () {
        hideAllPages();
      
        headerName.innerHTML = "Exam Page";
      
        examPage.style.display = "block";
        NewExamPage.style.display = "block"
      
        setActiveClass(HomePageBtn);
      });

      // Event listener for DailyEntryBtn


      ResultPageBtn.addEventListener("click", function () {
        hideAllPages();
      
        headerName.innerHTML = "Result Page";
      
        resultPage.style.display = "block";
      
        // setActiveClass(DailyEntryBtn);
      });

      NewResultPageBtn.addEventListener("click", function () {
        hideAllPages();
      
        headerName.innerHTML = "Result Page";
      
        resultPage.style.display = "block";

        NewResultPage.style.display = "block"
      
        // setActiveClass(DailyEntryBtn);
      });

      SchoolExamResultBtn.addEventListener("click", function(){
        hideAllPages();
        headerName.innerHTML = "Result Page";
      
          resultPage.style.display = "block";

          NewResultPage.style.display = "none"
          PreviousSchoolExamResult.style.display = "block"
          PreviousClassTestResult.style.display = "none"
      })

      ClassExamResultBtn.addEventListener("click", function(){
        hideAllPages();
        headerName.innerHTML = "Result Page";
      
          resultPage.style.display = "block";

          NewResultPage.style.display = "none"
          PreviousSchoolExamResult.style.display = "none"
          PreviousClassTestResult.style.display = "block"
      })

      AttendancePageBtn.addEventListener("click", function () {
        hideAllPages();

        headerName.innerHTML = "Attendance Page";

        attendancePage.style.display = "block";
      });

      
      NewAttendancePageBtn.addEventListener("click", function () {
        hideAllPages();

        headerName.innerHTML = "Attendance Page";

        attendancePage.style.display = "block";
        NewAttendancePage.style.display = "none"
        PreviousAttendancePage.style.display = "block"
      });

      PreviousAttendancePageBtn.addEventListener("click", function () {
        hideAllPages();

        headerName.innerHTML = "Attendance Page";

        attendancePage.style.display = "block";
        NewAttendancePage.style.display = "block"
        PreviousAttendancePage.style.display = "none"
      });

      NoticePageBtn.addEventListener("click", function () {
        hideAllPages();

        headerName.innerHTML = "Notice Page";

        noticePage.style.display = "block";
      });

      RoutinePageBtn.addEventListener("click", function () {
        hideAllPages();
      
        headerName.innerHTML = "Routine Page";
      
        routinePage.style.display = "block";
      });

  
      GalleryPageBtn.addEventListener("click", function () {
        hideAllPages();

        headerName.innerHTML = "Gallery Page";

        galleryPage.style.display = "block";

        // setActiveClass(BottomProductBtn);
      });

      SideHomeworkPageBtn.addEventListener("click", function () {
        hideAllPages();

        headerName.innerHTML = "Homework Page";

        homeworkPage.style.display = "block";

        // setActiveClass(BottomProductBtn);
      });

      SideMessagePageBtn.addEventListener("click", function () {
        hideAllPages();

        headerName.innerHTML = "Message Page";

        messagePage.style.display = "block";

        // setActiveClass(BottomProductBtn);
      });

      HomePageBtn.addEventListener("click", function () {
        hideAllPages();

        headerName.innerHTML = "Home";

        homePage.style.display = "block";

        setActiveClass(HomePageBtn);
      });

      BottomHomeworkPageBtn.addEventListener("click", function () {
        hideAllPages();

        headerName.innerHTML = "Homework Page";

        homeworkPage.style.display = "block";

        setActiveClass(BottomHomeworkPageBtn);
      });


      BottomMessagePageBtn.addEventListener("click", function () {
        hideAllPages();

        headerName.innerHTML = "Notice Page";

        noticePage.style.display = "block";

        setActiveClass(BottomMessagePageBtn);
      });
      // Function to set active class on clicked button
      setActiveClass(HomePageBtn);
      function setActiveClass(clickedButton) {
        const allButtons = [HomePageBtn, BottomHomeworkPageBtn, BottomMessagePageBtn];

        allButtons.forEach((button) => {
          button.classList.remove("active");
        });

        clickedButton.classList.add("active");
      }

   