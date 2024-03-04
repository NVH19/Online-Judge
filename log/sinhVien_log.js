var usernameInput = document.getElementById("username");
var passwordInput = document.getElementById("password");
var errorMessageDiv1 = document.getElementById("username_error");
var errorMessageDiv2 = document.getElementById("password_error");
// Thêm sự kiện onblur cho phần tử input
usernameInput.onblur = function() {
    // Kiểm tra nếu người dùng không nhập username
    if (usernameInput.value === "") {
        // Hiển thị thông báo trong div
        errorMessageDiv1.textContent = "Vui lòng nhập tài khoản!";
    } else {
        // Nếu đã nhập username, xóa thông báo
        errorMessageDiv1.textContent = "";
    }
};
passwordInput.onblur = function(){
    if (passwordInput.value === ""){
        errorMessageDiv2.textContent = "Vui lòng nhập mật khẩu!"
    } else {
        // Nếu đã nhập username, xóa thông báo
        errorMessageDiv2.textContent = "";
    }
}