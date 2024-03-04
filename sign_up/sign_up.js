var usernameInput = document.getElementById("username");
var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("password");
var confirmPasswordInput = document.getElementById("confirm-password");

var usernameError = document.getElementById("username-error");
var emailError = document.getElementById("email-error");
var passwordError = document.getElementById("password-error");
var confirmPasswordError = document.getElementById("confirm-password-error");

// Kiểm tra tính hợp lệ của username
usernameInput.addEventListener("blur", function() {
    if (usernameInput.value === "") {
        usernameError.textContent = "Vui lòng nhập tài khoản!";
    } else {
        usernameError.textContent = "";
    }
});

// Kiểm tra tính hợp lệ của email
emailInput.addEventListener("blur", function() {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value === ""){
        emailError.textContent = "Vui lòng nhập email!"
    }
    else if (!emailPattern.test(emailInput.value)) {
        emailError.textContent = "Vui lòng nhập đúng định dạng email!";
    } else {
        emailError.textContent = "";
    }
});

// Kiểm tra tính hợp lệ của password
passwordInput.addEventListener("blur", function() {
    if (passwordInput.value === "") {
        passwordError.textContent = "Vui lòng nhập mật khẩu!";
    } else if (passwordInput.value.length < 8) {
        passwordError.textContent = "Mật khẩu phải có ít nhất 8 kí tự";
    } else{
        passwordError.textContent = "";
    }
});

// Kiểm tra tính hợp lệ của confirm-password
confirmPasswordInput.addEventListener("blur", function() {
    if (confirmPasswordInput.value === "") {
        confirmPasswordError.textContent = "Vui lòng xác nhận mật khẩu!";
    } else if (confirmPasswordInput.value !== passwordInput.value) {
        confirmPasswordError.textContent = "Mật khẩu không khớp!";
    } else {
        confirmPasswordError.textContent = "";
    }
});