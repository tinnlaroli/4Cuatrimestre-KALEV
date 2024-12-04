document.addEventListener("DOMContentLoaded", () => {
  // Animación de aparición del logo
  const logo = document.getElementById('logo');
  if (logo) {
    logo.style.animation = 'fadeInLogo 1.5s ease-out forwards'; // Llamamos a la animación de entrada del logo
  }

  // Animación de fade-in para los formularios
  function animateFormTransition(formIn, formOut) {
    if (formOut) formOut.style.animation = 'fadeOut 0.5s ease-in-out forwards';  // Animación de salida
    if (formIn) formIn.style.animation = 'fadeIn 0.5s ease-in-out forwards';  // Animación de entrada
  }

  // Agregar los efectos al hacer clic en los enlaces para cambiar entre formularios
  const goToRegister = document.getElementById('goToRegister');
  const goToLogin = document.getElementById('goToLogin');
  
  if (goToRegister && goToLogin) {
    goToRegister.addEventListener('click', function (event) {
      event.preventDefault();
      const loginForm = document.getElementById('loginForm');
      const registerForm = document.getElementById('registerForm');
      animateFormTransition(registerForm, loginForm); // Animar transición de formularios
    });

    goToLogin.addEventListener('click', function (event) {
      event.preventDefault();
      const loginForm = document.getElementById('loginForm');
      const registerForm = document.getElementById('registerForm');
      animateFormTransition(loginForm, registerForm); // Animar transición de formularios
    });
  }
});
