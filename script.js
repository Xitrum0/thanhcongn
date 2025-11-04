// 🌐 API base URL
const API_BASE = "https://banhngot.fitlhu.com/api";

// 🔁 Chuyển tab
const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

loginTab.onclick = () => {
  loginTab.classList.add("active");
  registerTab.classList.remove("active");
  loginForm.classList.add("active");
  registerForm.classList.remove("active");
};

registerTab.onclick = () => {
  registerTab.classList.add("active");
  loginTab.classList.remove("active");
  registerForm.classList.add("active");
  loginForm.classList.remove("active");
};

// 🔐 Đăng nhập
document.getElementById("loginBtn").addEventListener("click", async () => {
  const usernameOrEmail = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const msgBox = document.getElementById("loginMessage");
  msgBox.innerHTML = "";

  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usernameOrEmail, password }),
    });

    const data = await res.json();
    if (res.ok) {
      msgBox.innerHTML = `<div class="alert success">Đăng nhập thành công! Xin chào ${data.user.username}</div>`;
      localStorage.setItem("accessToken", data.accessToken);
      // Có thể chuyển hướng:
      // window.location.href = "profile.html";
    } else {
      msgBox.innerHTML = `<div class="alert error">${data.error || "Sai thông tin đăng nhập"}</div>`;
    }
  } catch (err) {
    msgBox.innerHTML = `<div class="alert error">Lỗi kết nối máy chủ</div>`;
  }
});

// 📝 Đăng ký
document.getElementById("registerBtn").addEventListener("click", async () => {
  const username = document.getElementById("registerUsername").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value.trim();
  const confirmPassword = document.getElementById("registerConfirm").value.trim();
  const msgBox = document.getElementById("registerMessage");
  msgBox.innerHTML = "";

  if (password !== confirmPassword) {
    msgBox.innerHTML = `<div class="alert error">Mật khẩu xác nhận không khớp!</div>`;
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, confirmPassword }),
    });

    const data = await res.json();
    if (res.ok) {
      msgBox.innerHTML = `<div class="alert success">Đăng ký thành công! Hãy đăng nhập để tiếp tục.</div>`;
      // Tự động chuyển sang tab đăng nhập
      loginTab.click();
    } else {
      msgBox.innerHTML = `<div class="alert error">${data.error || "Đăng ký thất bại!"}</div>`;
    }
  } catch (err) {
    msgBox.innerHTML = `<div class="alert error">Lỗi kết nối máy chủ</div>`;
  }
});

