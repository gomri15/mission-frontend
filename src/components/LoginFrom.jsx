import React, {
    Component
} from 'react';
import Axios from 'axios';

import { API, API_PORT, LOGIN_ROUTE } from "./../config";

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
                <label>Username</label>
                <input type="text"
                    name="username"
                    onChange={this.handleInputChange}
                    value={this.state.username} >
                </input>
                {this.state.loginError}
                <label>Password</label>
                <input type="password"
                    name="password"
                    onChange={this.handleInputChange}
                    value={this.state.password} >
                </input>
                {this.state.loginError}
                <button
                    type="submit"
                    value="Submit"
                    className="btn btn-primary"
                    onClick={this.handleSubmit}
                >
                    Submit
              </button>
            </form>
        </div>);
    }
}

export default LoginFrom;