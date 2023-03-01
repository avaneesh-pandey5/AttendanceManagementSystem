import React, { useState } from "react";

const Logform = () => {
  const [enrollment, setEnrollment] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          enroll: enrollment,
        }),
      });

      const data = await response.json();

      console.log(data);
      if (data.token) {
        localStorage.setItem("token", JSON.stringify(data.token));
        localStorage.setItem("user", JSON.stringify(data.result));
        window.location = "/dashboard";
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        console.log(error.response.data.message);
      }
    }
  };

  return (
    <div>
      <form onSubmit={loginUser} action="" className="py-2">
        <div className="form-floating mb-3">
          <input
            value={enrollment}
            onChange={(e) => setEnrollment(e.target.value)}
            type="text"
            className="form-control login-box"
            id="floatingInput"
            placeholder="enrollement no."
            required
          />
          <label htmlFor="floatingInput">Enrollment number</label>
        </div>
        <div className="d-grid gap-2 mt-4">
          <input className="btn login-btn" value="Login" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default Logform;
