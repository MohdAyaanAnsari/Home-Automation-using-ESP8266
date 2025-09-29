function login() {
  async function Authentication() {
    const usernameInput = document.querySelector('#username');
    const passwordInput = document.querySelector('#loginPassword');
    const message = document.getElementById('message');

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username === '' || password === '') {
      message.textContent = "Please enter both username and password.";
      message.className = "message error";
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/users');
      const users = await response.json();

      const user = users.find(u => u.username === username && u.password === password);

      if (user) {
        message.textContent = "Login successful!";
        message.className = "message success";

        if (username === "Admin") {
          fade1(); // Admin function
        } else {
          fade2(); // User function
        }
      } else {
        message.textContent = "Invalid username or password.";
        message.className = "message error";
      }
    } catch (error) {
      message.textContent = "Failed to connect to server.";
      message.className = "message error";
      console.error(error);
    }
  }
  Authentication();
}


function fade1(){
  setTimeout(() => {
    const box = document.querySelector('.login-box');
    box.classList.add('hidden')
    setInterval(() => {
      window.location.href='admin.html'
    }, 500);

  }, 500);
}

function fade2(){
  setTimeout(() => {
    const box = document.querySelector('.login-box');
    box.classList.add('hidden')
    setTimeout(() => {
      window.location.href='user.html'
    }, 500);
  }, 500);
}

function contentchange_createUser() {
    // document.body.style.backgroundColor = "#ACB6E5"
    const box = document.querySelector('.login-box')
    box.classList.add('hidden');
    setTimeout(() => {
        box.innerHTML=`<h2>Create Account</h2>
            <input type="text" id="fullname" placeholder="Full Name" />
            <input type="email" id="email" placeholder="Email Address" />
            <input type="password" id="password" placeholder="Password" />
            <button onclick="createUser()">Create Account</button>
            <div id="message" class="message"></div>`

        box.classList.remove('hidden');
    }, 500);
}  