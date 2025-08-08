// Функции для работы с модальными окнами авторизации

// Показать модальное окно входа
function showLoginModal() {
    const modal = new bootstrap.Modal(document.getElementById('loginModal'));
    modal.show();
}

// Показать модальное окно регистрации
function showRegisterModal() {
    const modal = new bootstrap.Modal(document.getElementById('registerModal'));
    modal.show();
}

// Обработка входа
async function handleLogin() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!username || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    const result = await window.auth.login(username, password);
    
    if (result.success) {
        // Закрываем модальное окно
        const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        modal.hide();
        
        // Очищаем форму
        document.getElementById('loginForm').reset();
        
        // Показываем уведомление об успехе
        alert('Login successful!');
    } else {
        alert('Login failed: ' + result.message);
    }
}

// Обработка регистрации
async function handleRegister() {
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    if (!username || !password) {
        alert('Please fill in username and password');
        return;
    }
    
    const result = await window.auth.register(username, password, email);
    
    if (result.success) {
        // Закрываем модальное окно
        const modal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
        modal.hide();
        
        // Очищаем форму
        document.getElementById('registerForm').reset();
        
        // Показываем уведомление об успехе
        alert('Registration successful! You can now login.');
    } else {
        alert('Registration failed: ' + result.message);
    }
}

// Обработка выхода
async function logoutUser() {
    const result = await window.auth.logout();
    
    if (result.success) {
        alert('Logout successful!');
    } else {
        alert('Logout failed: ' + result.message);
    }
}

// Делаем функции глобальными
window.showLoginModal = showLoginModal;
window.showRegisterModal = showRegisterModal;
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
window.logoutUser = logoutUser; 