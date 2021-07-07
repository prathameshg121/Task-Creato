import React, { useState, useContext, useEffect } from "react";
import BorderColorTwoToneIcon from "@material-ui/icons/BorderColorTwoTone";
import Zoom from "@material-ui/core/Zoom";
import AlarmAddTwoToneIcon from "@material-ui/icons/AlarmAddTwoTone";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import Login from "./login";
import Signup from "./signup";
import Clock from "./clock";
import NotesArea from "./notesArea";
import { Card, Form, Button, Navbar } from "react-bootstrap";
import imageLogo from "./images/logo2.png";
import Home from "./Home";
import { getByDisplayValue } from "@testing-library/react";
import { Add } from "@material-ui/icons";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import Profile from "./profile";
import { AuthContext } from "../context/auth-context";
import EnhancedEncryptionIcon from "@material-ui/icons/EnhancedEncryption";
import PageNotFound from "./invalidpage";

function Heading(proc) {
  const [page, setPage] = useState("./index");
  const [isLogin, setLogin] = useState(false);
  let histor = useHistory();
  const auth = useContext(AuthContext);
  function display(value) {
    setLogin(value);
  }
  function logout() {
    console.log("logout called");
    localStorage.removeItem("jwtToken");
    setLogin(false);
    auth.logout();
    histor.push("/login");
  }
  useEffect(() => {
    console.log("auth Login" + auth.isLoggedIn);
    if (auth.isLoggedIn || localStorage.getItem("jwtToken")) setLogin(true);
    else setLogin(false);
  });

  // When the user clicks the button, open the modal
  function dialog() {
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    if ((modal.style.display = "block")) {
      span.onclick = function () {
        modal.style.display = "none";
      };
    }

    // // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }
  function goToHome() {
    histor.push("/");
  }

  return (
    <Router>
      <div>
        <nav>
          <header className="nameOfApp">
            <nav class="navbar bg navbar-expand-lg navbar-dark">
              <a class="navbar-brand" href="">
                <dfn title="Task Creato">
                  <img
                    className="logimag"
                    src={imageLogo}
                    onClick={goToHome}
                  ></img>
                </dfn>
                <h3 className="productName">Task Creato</h3>
              </a>
              <button
                class="navbar-toggler  hambBtn"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                {isLogin ? (
                  <ul class="navbar-nav ml-auto">
                    <li className=" nav-item poductList nav-item">
                      <Link to="/notes">
                        <dfn title="Add Notes">
                          <Add className="addbtn" />
                        </dfn>{" "}
                      </Link>
                    </li>
                    <li className="nav-item poductList">
                      <Link to="/clock">
                        {" "}
                        <dfn title="Add alarm">
                          {" "}
                          <AddAlertOutlinedIcon className="addbtn" />
                        </dfn>{" "}
                      </Link>{" "}
                    </li>
                    <li className=" nav-item poductList">
                      {" "}
                      <dfn title="Encrytion">
                        <EnhancedEncryptionIcon
                          id="myBtn"
                          onClick={dialog}
                          style={{ color: "#0000FF" }}
                          className="addbtn"
                        />
                      </dfn>
                      {/* /////////////////////////////////////////////////// */}
                      <div id="myModal" class="modal">
                        <div class="modalcontent">
                          <span class="close">&times;</span>
                          <p>Set password for Encryption and Decryption..</p>
                          <input type="password"></input>
                          <button type="submit">set</button>
                        </div>
                      </div>
                      {/* ///////////////////////////// */}
                    </li>
                    <li className="poductList nav-item">
                      <Link to="/profile">
                        {" "}
                        <dfn title="Profile">
                          {" "}
                          <AccountCircleOutlinedIcon className="addbtn" />
                        </dfn>{" "}
                      </Link>{" "}
                    </li>
                    <li className="poductList nav-item">
                      {" "}
                      <dfn title="Logout">
                        <LogoutIcon
                          onClick={logout}
                          style={{ color: "#0000FF" }}
                          className="addbtn"
                        />
                      </dfn>
                    </li>
                  </ul>
                ) : (
                  <ul class="navbar-nav ml-auto">
                    <li className="linav nav-item">
                      <Link to="/login">
                        <dfn title="Sign in">
                          <h3>Signin</h3>
                        </dfn>
                      </Link>
                    </li>
                    <li className="linav nav-item">
                      <Link to="/signUp">
                        <dfn title="Sign up">
                          <h3>Sign Up</h3>
                        </dfn>
                      </Link>{" "}
                    </li>
                  </ul>
                )}
              </div>
            </nav>
          </header>
        </nav>
        <Switch>
          <Route path="/login">
            <Login checkLogin={display} />
          </Route>
          <Route path="/signUp">
            <Signup />
          </Route>
          <Route path="/clock">
            <Clock checkLogin={display} />
          </Route>
          <Route path="/notes">
            <NotesArea checkLogin={display} socket={proc.socket} />
          </Route>
          <Route exact path="/">
            <Home checkLogin={display} />
          </Route>
          <Route path="/profile">
            <Profile checkLogin={display} />
          </Route>
          <Route component={PageNotFound}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Heading;
