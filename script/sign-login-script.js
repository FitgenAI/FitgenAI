document.addEventListener('DOMContentLoaded', function () {
  const signupForm = document.getElementById('signupForm');

  // Preview the uploaded profile picture
  window.previewImage = function (event) {
      const imagePreview = document.getElementById('imagePreview');
      const previewImg = document.getElementById('preview');
      const noImageText = document.getElementById('noImageText');
      
      const file = event.target.files[0];

      if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
              previewImg.src = e.target.result;
              previewImg.style.display = 'block';
              noImageText.style.display = 'none';
          };
          reader.readAsDataURL(file);
      } else {
          previewImg.src = '#';
          previewImg.style.display = 'none';
          noImageText.style.display = 'block';
      }
  };

  // Handle the signup form submission
  signupForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;

      if (password !== confirmPassword) {
          alert('Passwords do not match!');
          return;
      }

      // Assume the signup is successful (you can add actual server-side logic later)
      console.log('Sign up with:', { username, email, password });

      // Show success alert and redirect to index.html
      alert('Account created successfully!');
      window.location.href = 'index.html'; // Redirect to index.html
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');

  // Handle the login form submission
  loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      // Assume login is successful (you can add actual authentication logic later)
      console.log('Login with:', { email, password });

      // Show success alert and redirect to index.html
      alert('Login successful!');
      window.location.href = 'index.html'; // Redirect to index.html
  });
});
