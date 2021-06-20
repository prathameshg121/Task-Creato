import React, { Component } from 'react'
import { Button } from '@material-ui/core';
import { BrowserRouter as Router , Link , Switch , Route, useHistory } from 'react-router-dom';
import Home from './Home';
import Axios from 'axios';

import validateForm from '../utils/validateform';
import validEmailRegex from '../utils/emailRegex';
//sign in
export class Signup extends Component {
    // var history = useHistory();
    constructor(props) {
        super(props)
    this.state = {
        user: {
            email: '',
            password: ''
        },
        error: {
            message: '',
            code: ''
        },
        isloading: false,
        isLoginMode: true,

        errors: {
            email: '',
            password: ''
        }
    };
};

     mySubmitHandler = (event) => {
        this.setState(pre => ({
            isloading: true
        }))
        const auth = this.context
        event.preventDefault();

        if (validateForm(this.state.errors)) {
        } else {
        }
        if (this.state.isLoginMode) {
            Axios.post('/auth/signup', this.state.user)
                .then(response => {
                    this.setState(pre => ({
                        isloading: false
                    }))
                    this.props.history.push('/')
                    auth.login(response.data.userId, response.data.token);
                    return Axios.get('/profile/viewprofile')
                }).then(data => {
                    let profile = data.data.profile.username
                    localStorage.setItem(
                        'profileData',
                        JSON.stringify({
                            "username": profile
                        }))


                }).catch(e => {
                    console.log("error e :" + e);
                    this.setState({
                        isloading: false,
                        error: {
                            ...this.state.error, message: e.response
                            
                        }
                    });
                })

        }
        else {
            this.setState(pre => ({
                isloading: true
            }))
            Axios.post('/auth/signup', this.state.user).then(response => {
                this.setState(pre => ({
                    isloading: false
                }))
            })
                .catch(e => {
                    this.setState({ error: true });
                })
        }
        this.setState({
            user: { ...this.state.user, email: '', password: '' }
        });
    };


    myChangeHandler = (event) => {

        let nam = event.target.name;
        let val = event.target.value;
        let errors = this.state.errors;
        const { name, value } = event.target;
        switch (name) {

            case 'email':
                if (value.length === 0) {
                    errors.email =
                        value.length < 5
                            ? 'Email is Required!'
                            : '';
                    break;
                }
                if (value.length > 0) {
                    errors.email =
                        validEmailRegex.test(value)
                            ? ''
                            : 'Email is not valid!';
                    break;
                }
                break;
            case 'password':
                if (value.length > 0) {
                    errors.password =
                        value.length < 6
                            ? 'Password must be 6 characters long!'
                            : '';
                }

                if (value.length === 0) {
                    errors.password =
                        value.length === 0
                            ? 'Password is required!'
                            : '';
                }
                break;
            default:
                break;
        }

        this.setState({ errors, user: { ...this.state.user, [nam]: val } }, () => {
        });
    };

    // var switchLoginhandler = () => {
    //     this.setState(pre => ({
    //         isLoginMode: !pre.isLoginMode
    //     }))
    // };
    render (){
    return (
        <div>
        <form>
            <div className="inputeArea">
                <h2>Sign Up</h2>
                <input className="inputeplace" type="email" name="email" placeholder="email" value={this.state.user.email} required onChange={this.myChangeHandler} ></input>
                <input className="inputeplace" type="password" name="password" placeholder="password" required="required"  value={this.state.user.password}  onChange={this.myChangeHandler} ></input> 
                <input className="inputeplace" type="password" placeholder="conform-password" required="required" ></input>
                <Button variant="contained" color="primary" type="sumit" onClick={this.mySubmitHandler }>Sign up</Button>
            </div>
        </form>
             
        </div>
    )
}
}


