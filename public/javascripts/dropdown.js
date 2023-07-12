function initMenu() {
    if (localStorage.token) {
        let user = JSON.parse(localStorage.user);
        document.getElementById('dropdown').innerHTML =
            `<a class="dropdown-item" >${user.username}</a>
            <li><hr class="dropdown-divider"></li>
            <a class="dropdown-item" onclick="logout()">Logout</a>`;
    } else {
        document.getElementById('dropdown').innerHTML =
            `<a class="dropdown-item" href="/login.html">Login</a>
            <a class="dropdown-item" href="/register.html">Register</a>`;
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
}

initMenu()