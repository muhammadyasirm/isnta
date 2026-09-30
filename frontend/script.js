/*
  DEPLOYMENT CHANGE:
  Jab aap Render par backend deploy karenge, Render aapko ek live URL dega.
  Local testing k liye "http://localhost:5000" rahega, 
  Production (Cloudflare Pages) k liye apna Render backend URL yahan daalein.
*/
// const BACKEND_URL = "https://your-render-service-name.onrender.com"; // <-- Replace with your Render URL
const BACKEND_URL = "http://localhost:5000";

const userForm = document.getElementById("userForm");
const submitBtn = document.getElementById("submitBtn");
const responseMessage = document.getElementById("responseMessage");

userForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Clear previous message & show loading status
  // responseMessage.className = "message";
  // responseMessage.textContent = "";
  submitBtn.disabled = true;
  // submitBtn.textContent = "Submitting...";

  try {
    /*
      DEPLOYMENT CALL:
      Cloudflare Pages (HTTPS) se Render (HTTPS) API call ja rahi hai.
    */
    const response = await fetch(`${BACKEND_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (response.ok) {
      responseMessage.className = "message success";
      responseMessage.textContent =
        result.message || "User created successfully!";
      userForm.reset();
    } else {
      responseMessage.className = "message error";
      responseMessage.textContent = result.error || "An error occurred.";
    }
  } catch (error) {
    responseMessage.className = "message error";
    // Note: Render free tier first request par spin-up hone me 30-50s le sakta hai
    responseMessage.textContent =
      "Unable to connect to backend server. Render server might be waking up, please wait a moment and retry.";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit";
  }
});
