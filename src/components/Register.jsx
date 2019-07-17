import React, { Component } from "react";
import Axios from "axios";

import { API, API_PORT, PLAYERS_ROUTE, USERNAME_CHECK_ROUTE } from "./../config";
import { validateFields, usernameExists } from "./../utils/validate"

let initalState = {
  name: "",
  age: 0,
  password: "",
  role: "",
  nameError: "",
  passwordError: "",
  ageError: "",
  roleError: "",
  submitError: ""
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = initalState;
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  parseData = () => {
    const [validName, nameError] = validateFields("name", this.state.name);
    const [validPassword, passwordError] = validateFields(
      "password",
      this.state.password
    );
    const [validAge, ageError] = validateFields("age", this.state.age);
    const [validrole, roleError] = validateFields("role", this.state.role);
    if (validName && validPassword && validAge && validrole) {
      return true;
    } else {
      this.setState({
        nameError,
        passwordError,
        ageError,
        roleError
      });
    }
  };

  handleSubmit = async event => {
    event.preventDefault();
    if (this.parseData()) {
      const payload = {
        name: this.state.name,
        password: this.state.password,
        age: this.state.age,
        role: this.state.role
      };
      try {
        const res = await Axios.post(
          `${API}:${API_PORT}${PLAYERS_ROUTE}`,
          payload
        );
        console.log(res);
        this.setState(initalState);
      } catch (error) {
        this.setState({ submitError: "Failed to connect to server " });
        throw error;
      }
    }
  };

  render() {
    const listOfYears = [];
    for (let i = 0; i < 99; i++) {
      listOfYears.push(i);
    }
    const ageDropDown = listOfYears.map(year => {
      return <option key={year}>{year}</option>;
    });
    return (
      <div>
        <form>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              onChange={this.handleInputChange}
              value={this.state.name}
            />
            <br />
            {this.state.nameError}
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={this.handleInputChange}
              value={this.state.password}
            />
            {this.state.passwordError}
          </div>
          <div>
            <label>Age</label>
            <select
              onChange={this.handleInputChange}
              name="age"
              value={this.state.age}
            >
              {ageDropDown}
            </select>
            {this.state.ageError}
          </div>
          <div>
            <label>Role</label>
            <select
              onChange={this.handleInputChange}
              name="role"
              value={this.state.role}
            >
              <option defaultValue="" />
              <option>Druid</option>
              <option>Paladin</option>
              <option>Sorcerer</option>
              <option>Knight</option>
            </select>
            {this.state.roleError}
          </div>
          <div>
            <button
              type="submit"
              value="Submit"
              className="btn btn-primary"
              onClick={this.handleSubmit}
            >
              Submit
            </button>
            {this.state.submitError}
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
