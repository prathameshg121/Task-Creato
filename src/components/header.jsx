import React, { useState, useContext, useEffect } from "react";
import Zoom from "@material-ui/core/Zoom";
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
  const [isLogin, setLogin] = useState(!!localStorage.getItem("jwtToken"));
  const [secret, setSecret] = useState(null);

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

  function changeSec(event) {
    setSecret(event.target.value);
  }

  function onSubmitSec(event) {
    if (secret != "") {
      sessionStorage.setItem("SECRET", secret);
      console.log("Secret Sets :" + sessionStorage.getItem("SECRET"));
      setSecret("");
      var modal = document.getElementById("myModal");
      modal.style.display = "none";
    }
    event.preventDefault();
  }


  function dialog(event) {
    var modal = document.getElementById("myModal");

    var btn = document.getElementById("myBtn");

    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

   
    if ((modal.style.display = "block")) {
      span.onclick = function () {
        modal.style.display = "none";
      };
    }

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
      
          <Zoom in="true">
          <header >
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
                      <div id="myModal" class="modal ">
                        <div class="modalcontent col-lg-4">
                          <span class="close">&times;</span>
                          <p>Set password for Encryption and Decryption..</p>
                          <input type="password" className="form-control"></input>
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
          </Zoom>
      
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
