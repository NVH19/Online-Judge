function showManageExam() {
  document.getElementById("manageExamContent").style.display = "block";
  document.getElementById("manageStudentsContent").style.display = "none";
  document.getElementById("statisticsContent").style.display = "none";
}

var questionCounter = 1;

function addQuestion() {
  var questionList = document.getElementById("questionList");
  var questionDiv = document.createElement("div");
  questionDiv.classList.add("question");
  questionDiv.innerHTML =
    '<label for="question' +
    questionCounter +
    '">Câu hỏi ' +
    questionCounter +
    ":</label><br>" +
    '<input type="text" id="question' +
    questionCounter +
    '" name="question' +
    questionCounter +
    '"><br>' +
    '<label for="answer' +
    questionCounter +
    'A">Đáp án A:</label><br>' +
    '<input type="text" id="answer' +
    questionCounter +
    'A" name="answer' +
    questionCounter +
    "A" +
    '"><br>' +
    '<label for="answer' +
    questionCounter +
    'B">Đáp án B:</label><br>' +
    '<input type="text" id="answer' +
    questionCounter +
    'B" name="answer' +
    questionCounter +
    "B" +
    '"><br>' +
    '<label for="answer' +
    questionCounter +
    'C">Đáp án C:</label><br>' +
    '<input type="text" id="answer' +
    questionCounter +
    'C" name="answer' +
    questionCounter +
    "C" +
    '"><br>' +
    '<label for="answer' +
    questionCounter +
    'D">Đáp án D:</label><br>' +
    '<input type="text" id="answer' +
    questionCounter +
    'D" name="answer' +
    questionCounter +
    "D" +
    '"><br>' +
    '<label for="correctAnswer' +
    questionCounter +
    '">Đáp án đúng:</label><br>' +
    '<select id="correctAnswer' +
    questionCounter +
    '" name="correctAnswer' +
    questionCounter +
    '">' +
    '<option value="A">A</option>' +
    '<option value="B">B</option>' +
    '<option value="C">C</option>' +
    '<option value="D">D</option>' +
    "</select><br>" +
    '<button type="button" onclick="deleteQuestion(this)">Xóa</button>';
  questionList.appendChild(questionDiv);
  questionCounter++;
}

function submitExam() {
  var questionCounter = 1;
  var examName = document.getElementById("examName").value;
  var examDescription = document.getElementById("examDescription").value;
  var examEndDate = document.getElementById("examEndDate").value;

  var questions = [];
  var questionDivs = document.querySelectorAll(".question");
  questionDivs.forEach(function (questionDiv) {
    var questionText = questionDiv.querySelector(
      'input[name^="question"]'
    ).value;
    var answerA = questionDiv.querySelector(
      'input[name^="answer' + questionCounter + 'A"]'
    ).value;
    var answerB = questionDiv.querySelector(
      'input[name^="answer' + questionCounter + 'B"]'
    ).value;
    var answerC = questionDiv.querySelector(
      'input[name^="answer' + questionCounter + 'C"]'
    ).value;
    var answerD = questionDiv.querySelector(
      'input[name^="answer' + questionCounter + 'D"]'
    ).value;
    var correctAnswer = questionDiv.querySelector(
      'select[name^="correctAnswer' + questionCounter + '"]'
    ).value;

    var question = {
      questionText: questionText,
      answers: {
        A: answerA,
        B: answerB,
        C: answerC,
        D: answerD,
      },
      correctAnswer: correctAnswer,
    };
    questions.push(question);
    questionCounter++;
  });

  var examData = {
    examName: examName,
    examDescription: examDescription,
    examEndDate: examEndDate,
    questions: questions,
  };

  // Chuyển đổi đối tượng JSON thành chuỗi JSON
  var jsonData = JSON.stringify(examData);

  // Lưu chuỗi JSON vào một tệp hoặc gửi đến máy chủ
  // Ví dụ: lưu vào localStorage
  localStorage.setItem("examPreviewData", jsonData);
  alert("Đề thi đã được lưu!");
  window.location.href = "preview.html";
}

function deleteQuestion(button) {
  var questionDiv = button.parentNode;
  questionDiv.parentNode.removeChild(questionDiv);
  questionCounter--; // Giảm số câu hỏi khi xóa
}





// Hàm xuất báo cáo dưới dạng PDF
function exportToPDF() {
  // Thêm code để xuất báo cáo dưới dạng PDF ở đây
}

// Hàm xuất báo cáo dưới dạng Excel
function exportToExcel() {
  // Thêm code để xuất báo cáo dưới dạng Excel ở đây
}
// Hàm để đọc file Excel
function importQuestionsFromExcel() {
  const fileInput = document.getElementById('excelFileInput');
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });

    // Đọc dữ liệu từ sheet đầu tiên của file Excel
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];

    // Chuyển đổi dữ liệu từ sheet sang mảng JSON
    const questions = XLSX.utils.sheet_to_json(worksheet);

    // Hiển thị danh sách câu hỏi
    displayQuestions(questions);
  };

  reader.readAsArrayBuffer(file);
}
function displayQuestions(questions) {
  const questionList = document.getElementById('questionList');
  questionList.innerHTML = '';

  questions.forEach((question, index) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <label for="question${index + 1}">Câu hỏi ${index + 1}:</label><br />
      <textarea id="question${index + 1}" name="question${index + 1}" rows="4" cols="50">${question.text}</textarea><br />
      <label for="answer${index + 1}">Đáp án:</label><br />
      <input type="text" id="answer${index + 1}" name="answer${index + 1}" value="${question.answer}" /><br />
    `;
    questionList.appendChild(div);
  });
}


function UploadProcess() {
  //Reference the FileUpload element.
  var fileUpload = document.getElementById("fileUpload");

  //Validate whether File is valid Excel file.
  var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
  if (regex.test(fileUpload.value.toLowerCase())) {
      if (typeof (FileReader) != "undefined") {
          var reader = new FileReader();

          //For Browsers other than IE.
          if (reader.readAsBinaryString) {
              reader.onload = function (e) {
                  GetTableFromExcel(e.target.result);
              };
              reader.readAsBinaryString(fileUpload.files[0]);
          } else {
              //For IE Browser.
              reader.onload = function (e) {
                  var data = "";
                  var bytes = new Uint8Array(e.target.result);
                  for (var i = 0; i < bytes.byteLength; i++) {
                      data += String.fromCharCode(bytes[i]);
                  }
                  GetTableFromExcel(data);
              };
              reader.readAsArrayBuffer(fileUpload.files[0]);
          }
      } else {
          alert("This browser does not support HTML5.");
      }
  } else {
      alert("Please upload a valid Excel file.");
  }
};
function GetTableFromExcel(data) {
  //Read the Excel File data in binary
  var workbook = XLSX.read(data, {
      type: 'binary'
  });

  //get the name of First Sheet.
  var Sheet = workbook.SheetNames[0];

  //Read all rows from First Sheet into an JSON array.
  var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[Sheet]);

  //Create a HTML Table element.
  var myTable  = document.createElement("table");
  myTable.border = "1";

  //Add the header row.
  var row = myTable.insertRow(-1);

  //Add the header cells.
  var headerCell = document.createElement("TH");
  headerCell.innerHTML = "Id";
  row.appendChild(headerCell);

  headerCell = document.createElement("TH");
  headerCell.innerHTML = "Name";
  row.appendChild(headerCell);

  headerCell = document.createElement("TH");
  headerCell.innerHTML = "Country";
  row.appendChild(headerCell);
  
  headerCell = document.createElement("TH");
  headerCell.innerHTML = "Age";
  row.appendChild(headerCell);
  
  headerCell = document.createElement("TH");
  headerCell.innerHTML = "Date";
  row.appendChild(headerCell);
  
  headerCell = document.createElement("TH");
  headerCell.innerHTML = "Gender";
  row.appendChild(headerCell);


  //Add the data rows from Excel file.
  for (var i = 0; i < excelRows.length; i++) {
      //Add the data row.
      var row = myTable.insertRow(-1);

      //Add the data cells.
      var cell = row.insertCell(-1);
      cell.innerHTML = excelRows[i].Id;

      cell = row.insertCell(-1);
      cell.innerHTML = excelRows[i].Name;

      cell = row.insertCell(-1);
      cell.innerHTML = excelRows[i].Country;
      
      cell = row.insertCell(-1);
      cell.innerHTML = excelRows[i].Age;
      
      cell = row.insertCell(-1);
      cell.innerHTML = excelRows[i].Date;
      
      cell = row.insertCell(-1);
      cell.innerHTML = excelRows[i].Gender;
  }
  

  var ExcelTable = document.getElementById("ExcelTable");
  ExcelTable.innerHTML = "";
  ExcelTable.appendChild(myTable);
};

