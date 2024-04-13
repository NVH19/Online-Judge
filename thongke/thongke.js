document.addEventListener('DOMContentLoaded', function () {
    // Dữ liệu mẫu về kết quả của các kỳ thi
    var examResults = [
        { examId: 'EX001', examName: 'Kỳ thi giữa kỳ I', studentId: 'SV001', studentName: 'Nguyễn Văn Chiến', score: 8.5, status: 'Hoàn thành' },
        { examId: 'EX001', examName: 'Kỳ thi giữa kỳ I', studentId: 'SV002', studentName: 'Trần Thị Hoa', score: 7, status: 'Hoàn thành' },
        { examId: 'EX002', examName: 'Luyện tập', studentId: 'SV003', studentName: 'Phạm Văn Hoàng', score: 6, status: 'Chưa hoàn thành' },
        { examId: 'EX001', examName: 'Kỳ thi giữa kỳ I', studentId: 'SV003', studentName: 'Nguyễn Văn A', score: 8.5, status: 'Hoàn thành' },
        { examId: 'EX002', examName: 'Luyện tập', studentId: 'SV002', studentName: 'Trần Thị Hoa', score: 7, status: 'Hoàn thành' },
        { examId: 'EX002', examName: 'Luyện tập', studentId: 'SV003', studentName: 'Phạm Văn Hoàng', score: 5, status: 'Chưa hoàn thành' },
        { examId: 'EX001', examName: 'Kỳ thi giữa kỳ I', studentId: 'SV004', studentName: 'Nguyễn Văn A', score: 8.5, status: 'Hoàn thành' },
        { examId: 'EX002', examName: 'Luyện tập', studentId: 'SV002', studentName: 'Trần Thị Hoa', score: 7, status: 'Hoàn thành' },
        { examId: 'EX002', examName: 'Luyện tập', studentId: 'SV003', studentName: 'Phạm Văn Hoàng', score: 6, status: 'Hoàn thành' },
        // Thêm dữ liệu các kỳ thi khác ở đây
    ];

    // Hàm hiển thị bảng thống kê tổng hợp
    function displaySummary() {
        var summaryData = document.getElementById('summaryData');
        summaryData.innerHTML = '';

        // Tạo một đối tượng để lưu trữ thông tin thống kê cho mỗi kỳ thi
        var examSummary = {};

        examResults.forEach(function (result) {
            // Tạo hoặc cập nhật thông tin thống kê cho từng kỳ thi
            if (!examSummary[result.examId]) {
                examSummary[result.examId] = {
                    name: result.examName,
                    totalParticipants: 0,
                    completedCount: 0,
                    totalScore: 0,
                };
            }

            examSummary[result.examId].totalParticipants++;
            if (result.status === 'Hoàn thành') {
                examSummary[result.examId].completedCount++;
            }
            examSummary[result.examId].totalScore += result.score || 0;
        });

        // Hiển thị thông tin thống kê trên bảng
        Object.keys(examSummary).forEach(function (examId) {
            var exam = examSummary[examId];
            var completionRate = (exam.completedCount / exam.totalParticipants) * 100;
            var averageScore = exam.totalScore / exam.totalParticipants;

            var row = summaryData.insertRow();
            row.insertCell(0).textContent = exam.name;
            row.insertCell(1).textContent = exam.totalParticipants;
            row.insertCell(2).textContent = completionRate.toFixed(2) + '%';
            row.insertCell(3).textContent = averageScore.toFixed(2);
        });
    }

    // Hàm tạo biểu đồ phân phối điểm số
    function createScoreDistributionChart() {
        // Lập danh sách điểm số từ kết quả của tất cả các kỳ thi
        var scores = examResults.map(function (result) {
            return result.score || 0;
        });

        var ctx = document.getElementById('scoreDistributionCanvas').getContext('2d');
        var scoreDistributionChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: scores.map(function (_, index) {
                    return 'student' + (index + 1);
                }),
                datasets: [{
                    label: 'Scores',
                    data: scores,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    // Hàm áp dụng bộ lọc
    function applyFilters() {
        // Code xử lý áp dụng bộ lọc sẽ được thêm sau
    }

    // Gọi các hàm để hiển thị dữ liệu và biểu đồ khi trang được tải
    displaySummary();
    createScoreDistributionChart();
});


function exportToPDF() {
    window.print();
}

