const examForm = document.getElementById('examForm');
const examNameInput = document.getElementById('examName');
const examList = document.getElementById('examList');

let exams = [];

// Hiển thị danh sách kỳ thi
function displayExams() {
    examList.innerHTML = '';
    exams.forEach(exam => {
        const li = document.createElement('li');
        li.innerHTML = `${exam.name} <button class="edit" onclick="editExam(${exam.id})">Chỉnh sửa</button> <button class="delete" onclick="deleteExam(${exam.id})">Xóa</button>`;
        examList.appendChild(li);
    });
}

// Thêm mới kỳ thi
examForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = examNameInput.value.trim();
    if (name !== '') {
        const id = exams.length + 1;
        exams.push({ id, name });
        examNameInput.value = '';
        displayExams();
    }
});

// Chỉnh sửa kỳ thi
function editExam(id) {
    const newName = prompt('Nhập tên mới cho kỳ thi:');
    if (newName !== null && newName.trim() !== '') {
        const index = exams.findIndex(exam => exam.id === id);
        exams[index].name = newName.trim();
        displayExams();
    }
}

// Xóa kỳ thi
function deleteExam(id) {
    if (confirm('Bạn có chắc chắn muốn xóa kỳ thi này không?')) {
        exams = exams.filter(exam => exam.id !== id);
        displayExams();
    }
}

// Khởi tạo danh sách kỳ thi mẫu
exams = [
    { id: 1, name: 'TOEFL' },
    { id: 2, name: 'IELTS' },
    { id: 3, name: 'GRE' }
];

// Hiển thị danh sách kỳ thi khi trang được tải
displayExams();
