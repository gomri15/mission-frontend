import React, {
    Component
} from 'react';
import Axios from 'axios';

import { API, API_PORT, LOGIN_ROUTE } from "./../config";
import { MyButton } from "../componentsStyle/MyButton"
import { MyErrorLabel } from "../componentsStyle/MyErrorLabel"
import { MyLabel } from "../componentsStyle/MyLabel"

const initalState = {
    username: "",
    password: "",
    loginError: ""
}

class LoginFrom extends Component {
    state = initalState

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handleSubmit = async event => {
        event.preventDefault()
        const payload = {
            username: this.state.username,
            password: this.state.password
        }
        const res = await Axios.post(
            `${API}:${API_PORT}${LOGIN_ROUTE}`,
            payload
        );
        // const loginRes = await res.json()
        alert("Login successfull")
    }

    render() {
        return (<div>
            <form>
                <MyLabel>Username</MyLabel>
                <input type="text"
                    name="username"
                    onChange={this.handleInputChange}
                    value={this.state.username} >
                </input>
                {this.state.loginError}
                <MyLabel>Password</MyLabel>
                <input type="password"
                    name="password"
                    onChange={this.handleInputChange}
                    value={this.state.password} >
                </input>
                <MyErrorLabel>{this.state.loginError}</MyErrorLabel>
                <MyButton
                    type="submit"
                    value="Submit"
                    className="btn btn-primary"
                    onClick={this.handleSubmit}
                >
                    Submit
              </MyButton>
            </form>
        </div>);
    }
}

export default LoginFrom;