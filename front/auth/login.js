// Функция для авторизации пользователя
async function loginUser(username, password) {
    try {
        const response = await fetch('https://localhost:8081/auth/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
            credentials: 'include'
        });

        const data = await response.json();

        if (response.ok) {
            // Сохраняем информацию о пользователе
            localStorage.setItem('user', JSON.stringify({
                username: username,
                isAuthenticated: true
            }));

            // Обновляем UI
            updateAuthUI();

            return { success: true, message: data.message };
        } else {
            return { success: false, message: data.error };
        }
    } catch (error) {
        return { success: false, message: 'Network error' };
    }
}

// Функция для регистрации пользователя
async function registerUser(username, password, email = '') {
    try {
        const response = await fetch('https://localhost:8081/auth/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email
            }),
            credentials: 'include'
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, message: data.message };
        } else {
            return { success: false, message: data.error };
        }
    } catch (error) {
        return { success: false, message: 'Network error' };
    }
}

// Функция для выхода
async function logoutUser() {
    try {
        const response = await fetch('https://localhost:8081/auth/logout/', {
            method: 'POST',
            credentials: 'include'
        });

        if (response.ok) {
            // Очищаем локальное хранилище
            localStorage.removeItem('user');

            // Обновляем UI
            updateAuthUI();

            return { success: true, message: 'Logout successful' };
        } else {
            return { success: false, message: 'Logout failed' };
        }
    } catch (error) {
        return { success: false, message: 'Network error' };
    }
}

// Функция для проверки авторизации
async function checkAuthStatus() {
    try {
        const response = await fetch('https://localhost:8081/is_logged_in/', {
            credentials: 'include'
        });

        const data = await response.json();

        if (data.is_logged_in) {
            localStorage.setItem('user', JSON.stringify({
                username: data.username,
                isAuthenticated: true
            }));
        } else {
            localStorage.removeItem('user');
        }

        updateAuthUI();
        return data.is_logged_in;
    } catch (error) {
        console.error('Auth check failed:', error);
        return false;
    }
}

// Функция для обновления UI в зависимости от статуса авторизации
function updateAuthUI() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const loginBtn = document.querySelector('[data-auth="login"]');
    const logoutBtn = document.querySelector('[data-auth="logout"]');
    const registerBtn = document.querySelector('[data-auth="register"]');

    if (user.isAuthenticated) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'inline-block';
    } else {
        if (loginBtn) loginBtn.style.display = 'inline-block';
        if (registerBtn) registerBtn.style.display = 'inline-block';
        if (logoutBtn) logoutBtn.style.display = 'none';
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    checkAuthStatus();
});

// Экспорт функций для использования в других модулях
window.auth = {
    login: loginUser,
    register: registerUser,
    logout: logoutUser,
    checkStatus: checkAuthStatus,
    updateUI: updateAuthUI
};