document.addEventListener("DOMContentLoaded", function () {
  var n;
  var y = 0;
  var calcForm = document.getElementById("calc");
  calcForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const captchaResponse = grecaptcha.getResponse();
    if(captchaResponse.lenght == 0) {
      throw new Error("reCaptcha is not complete!!!")
    }
    retr(new FormData(e.target));
  });
  function retr(body) {
    n = document.getElementById("di").value;
    n=DOMPurify.sanitize(n);
    y = calc(n);
    disp();
    save(body);
  }
  function disp() {
    var one = document.getElementById("n");
    one.innerHTML = n;
    var two = document.getElementById("answer");
    two.innerHTML = y;
  }
  function calc(x) {
    if (x <= 0) {
      return 0;
    } else if (x == 1) {
      return 1;
    } else {
      return calc(x - 1) + calc(x - 2);
    }
  }
  async function save(formData) {
    try {
      var formObj = {};
      formData.forEach((value, key) => {
        formObj[key] = value;
      });
      const captaRes = grecaptcha.getResponse();
      const response = await fetch("https://cn-project-2-backend.vercel.app/save-calculation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formObj,
          y: y,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save calculation");
      }
      const data = await response.json();
      console.log("Saved to calculations:", data);
    } catch (error) {
      console.error("Error saving calculation:", error);
      alert("Error saving to calculations");
    }
  }
});
