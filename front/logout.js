const logout = () => {
    localStorage.removeItem('user');
};

window.logout = logout;