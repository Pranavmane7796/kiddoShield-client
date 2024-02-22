import { useEffect, useRef, useState } from "react";
//css
import "../../styles/childHistory.css";
import hospitalService from "../../service/hospitalService";
import swal from "sweetalert";
import { Link } from "react-router-dom";

export default function HospitalAllAppointment() {
  const [plist, setplist] = useState([]);

  let date = new Date();
  let getDay = date.getDate();
  //-----------------------------------------------------
  const fetchdata = () => {
    hospitalService
      .getAppointment()
      .then((result) => {
        setplist([...result.data]);
      })
      .catch((error) => {
        swal("something went wrong");
      });
  };
  useEffect(() => {
    fetchdata();
  }, []);

  //----------------------------------------------------
  return (
    <>
      <nav
        className="navbar  fixed-top "
        id="navbar--id"
        style={{ background: "rgb(240, 240, 240)" }}
      >
        <Link to={"/hospitalDashboard"}>
          <h5> back</h5>
        </Link>
        <h2 className="navbar-heading">All Appointment</h2>
      </nav>
      <div className="tbl-container-outer">
        <div className="tbl-container-inner">
          <table
            style={{ fontSize: "15px" }}
            id="history-table"
            className="table table-striped table-bordered"
          >
            <thead
              className="thead-dark"
              style={{ fontSize: "20px" }}
              align="center"
            >
              <tr>
                <th scope="col">Appoinment id</th>
                <th scope="col">Child Id</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Contact</th>
                <th scope="col">Vaccine </th>
              </tr>
            </thead>
            <tbody align="center" style={{ fontSize: "19px" }}>
              {plist?.map((ob) => (
                <tr>
                  <td>{ob.aid}</td>
                  <td>{ob.cid}</td>
                  <td>{ob.date}</td>
                  <td>{ob.time}</td>
                  <td>{ob.contact}</td>
                  <td>{ob.vname}</td>
                  {/* <td>
                    <button className="btn btn-outline-info" id="username">
                      Click Here
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
