import { useState } from "react";
import userService from "../../service/userService.js";
import swal from "sweetalert";
import "../../styles/forgotpassword.css";
import hospitalService from "../../service/hospitalService.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function DoctorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const pwordHandler = (event) => {
    setPassword(event.target.value);
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    const obj = {
      password: password,
      email: email,
    };
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\S]{8,}$/.test(obj.password)
    ) {
      swal(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit."
      );
      return;
    }

    try {
      const response = await hospitalService.loginDoctor(obj);
      console.log(response);

      if (response.data.message === "Login Success") {
        sessionStorage.setItem("loginStatus", true);

        const res = await axios.post(
          "http://localhost:8086/Hospital/doctorinfo",
          obj
        );
        sessionStorage.setItem("doctorInfo", res.data.dfname);
        console.log(res.data);

        navigate("/doctordashboard/" + res.data.did);
        swal("login successfull");
      }
      if (response.data.message === "password Not Match") {
        swal("check credentials again");
      }
    } catch (error) {
      swal("something went wrong,try again later");
    }
  };

  return (
    <>
      <div
        className="forgot-password-container"
        style={{ marginTop: "15%", marginLeft: "30%" }}
      >
        <h1 style={{ marginLeft: "23%", fontSize: "30px" }}>Doctor Login</h1>
        <div class="card resetpword-card" style={{ width: "30%" }}>
          <div class="card-body">
            <h2 class="card-title">Login</h2>
            <form onSubmit={submitHandler}>
              <div className="form-group">
                <label> Enter Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={emailHandler}
                  placeholder="Email"
                  class="form-control"
                  required
                />
              </div>
              <br />
              <div className="form-group">
                <label> Enter Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={pwordHandler}
                  placeholder="Confirm Password"
                  class="form-control"
                  required
                />
              </div>
              <br />
              <button
                type="submit"
                style={{ marginLeft: "40%" }}
                className="btn btn-primary "
                id="resetpword-btn"
                // onClick={}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
