function showMessage(message, bg = "bg-white") {
    let toast = document.getElementById('toast')
    toast.classList.add(bg)
    toast = new bootstrap.Toast(toast, {})
    console.log(document.getElementById('toast-message'))
    document.getElementById('toast-message').textContent = message;
    toast.show()
}