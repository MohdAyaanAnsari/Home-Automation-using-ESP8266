function home() {
  const box = document.querySelector('.container');
  box.classList.add('hidden');

  setTimeout(() => {
    box.innerHTML = `
        <section>
          ${["Bulb1", "Bulb2", "Fan", "LED", "Socket1", "Socket2", "Socket3", "AC", "TV"].map(name => `
            <div class="appliance">
                <div class="rect">
                    <div class="circle"></div>
                </div>
                <h2 class="name">${name}</h2>
            </div>
          `).join("")}
        </section>
      `;

    box.classList.remove('hidden');

    app();

    document.querySelectorAll('script').forEach(e => {
      if (e.src.includes('admin.js')) e.remove();
    });
    const b_script = document.createElement('script');
    b_script.src = 'admin.js';
    document.body.appendChild(b_script);

  }, 500);
}

function toggleApp(event, appliance) {
      event.preventDefault(); // ✅ Prevent reload

      fetch('http://localhost:3000/api/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appliance: appliance })
      })
      .then(res => res.json())
      .then(data => {
        const rect = document.querySelector(`#${appliance}-rect`);
        const circle = rect.querySelector('.circle');

        const isOn = rect.style.backgroundColor === 'rgb(170, 22, 163)';

        // ✅ Better: use data-newstate from server
        if (data.newState === "1") {
          rect.style.backgroundColor = 'rgb(170, 22, 163)';
          circle.style.transform = 'translateX(15px)';
        } else {
          rect.style.backgroundColor = 'rgb(211, 211, 211)';
          circle.style.transform = 'translateX(0px)';
        }

        circle.style.transition = 'transform 0.4s ease-in-out';
      })
      .catch(err => {
        alert("Error toggling appliance");
        console.error(err);
      });
    }


function logout() {
  document.body.classList.add('hidden')
  setTimeout(() => {
    window.location.href = "index.html"
  }, 500);
}

function user_control() {
  async function fetchUsers() {
    const response = await fetch('http://localhost:3000/userdata');
    const users = await response.json();
    console.log(users);

    const box = document.querySelector('.container')

    box.classList.add('hidden');
    setTimeout(() => {
      box.innerHTML = `
            <div class="containor">
              <h3>List of Users</h3>
            </div>
            <div class="buttons">
            <button id="AddUser" onclick="add_user_click()">Add new User</button>
            <button id="RemoveUser" onclick="remove_user_click()">Remove a User</button>
            </div>
            `
      const sbox = document.querySelector('.containor')
      users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.username}`;
        sbox.appendChild(li);
      });
      box.classList.remove('hidden');
    }, 500);
  }
  document.body.lastElementChild.remove();
  const script = document.createElement('script');
  script.src = "admin.js";
  document.body.appendChild(script);
  fetchUsers();
}


function add_user_click() {
  const box = document.querySelector('.buttons');
  box.classList.add('hidden');

  setTimeout(() => {
    box.innerHTML = `
      <span id="back">
        <img src="https://static.thenounproject.com/png/1410611-200.png" height="60" onclick="back()" />
      </span>
      <h2>Enter Details</h2>
      <input type="text" id="username" placeholder="Enter username">
      <input type="password" id="password" placeholder="Enter password">
      <button id="Add_User" class="adus">Add User</button>
    `;

    // Remove old <script> if needed
    const lastScript = document.querySelector('script[src="admin.js"]');
    if (lastScript) lastScript.remove();

    // Re-add the admin.js script
    const script = document.createElement('script');
    script.src = "admin.js";
    document.body.appendChild(script);

    box.classList.remove('hidden');

    // Attach event listener to the Add User button
    document.getElementById('Add_User').addEventListener('click', add_user_submit);
  }, 500);
}

async function add_user_submit() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const response = await fetch('http://127.0.0.1:3000/adduser', {  // or /register if you choose that
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    alert(data.message);
  } catch (err) {
    alert('Server error occurred!');
    console.error(err);
  }
}



function remove_user_click() {
  const box = document.querySelector('.buttons');
  box.classList.add('hidden');

  setTimeout(() => {
    box.innerHTML = `
      <span id="back">
        <img src="https://static.thenounproject.com/png/1410611-200.png" height="60" onclick="back()" />
      </span>
      <h2>Enter Details</h2>
      <input type="text" id="username" placeholder="Enter username">
      <input type="password" id="password" placeholder="Enter password">
      <button id="Remove_User" class ="adus">Remove User</button>
    `;

    // Remove previous script if exists
    const oldScript = document.querySelector('script[src="admin.js"]');
    if (oldScript) oldScript.remove();

    // Re-add the admin.js script
    const script = document.createElement('script');
    script.src = "admin.js";
    document.body.appendChild(script);

    // Re-enable the box
    box.classList.remove('hidden');

    // Attach event listener to button
    document.getElementById('Remove_User').addEventListener('click', remove_user_submit);
  }, 500);
}

async function remove_user_submit() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const response = await fetch('http://127.0.0.1:3000/remove', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    alert(data.message);
  } catch (err) {
    alert('Error removing user');
    console.error(err);
  }
}


function back() {
  const box = document.querySelector('.buttons')

  box.classList.add('hidden');
  setTimeout(() => {
    box.innerHTML = `
            <button id="AddUser" onclick="add_user_click()">Add new User</button>
            <button id="RemoveUser" onclick="remove_user_click()">Remove a User</button>
            `
    box.classList.remove('hidden');
  }, 500);
}