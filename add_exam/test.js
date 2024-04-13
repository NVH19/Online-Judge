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
  
  // Hàm để hiển thị danh sách câu hỏi
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
  
  // Thêm câu hỏi mới
  function addQuestion() {
    const questionList = document.getElementById('questionList');
    const div = document.createElement('div');
    const index = questionList.getElementsByTagName('div').length + 1;
    div.innerHTML = `
      <label for="question${index}">Câu hỏi ${index}:</label><br />
      <textarea id="question${index}" name="question${index}" rows="4" cols="50"></textarea><br />
      <label for="answer${index}">Đáp án:</label><br />
      <input type="text" id="answer${index}" name="answer${index}" /><br />
    `;
    questionList.appendChild(div);
  }
  