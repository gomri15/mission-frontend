import React, { Component } from "react";
import Axios from "axios";

import { API, API_PORT, PLAYERS_ROUTE } from "./../config";
import { validateFields } from "./../utils/validate"
import { MyFormWrapper } from "../componentsStyle/MyFormWrapper"
import { MyButton } from "../componentsStyle/MyButton"
import { MyErrorLabel } from "../componentsStyle/MyErrorLabel"
import { MyLabel } from "../componentsStyle/MyLabel"


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

  parseData = async () => {
    const [validName, nameError] = await validateFields("name", this.state.name);
    const [validPassword, passwordError] = await validateFields(
      "password",
      this.state.password
    );
    const [validAge, ageError] = await validateFields("age", this.state.age);
    const [validrole, roleError] = await validateFields("role", this.state.role);
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
    if (await this.parseData()) {
      const payload = {
        name: this.state.name,
        password: this.state.password,
        age: this.state.age,
        role: this.state.role
      };
      try {
        await Axios.post(
          `${API}:${API_PORT}${PLAYERS_ROUTE}`,
          payload
        );
        // console.log(res);
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
        <MyFormWrapper>
          <div>
            <MyLabel>Name</MyLabel>
            <input
              type="text"
              name="name"
              onChange={this.handleInputChange}
              value={this.state.name}
            />
            <br />
            <MyErrorLabel>{this.state.nameError}</MyErrorLabel>
          </div>
          <div>
            <MyLabel>Password</MyLabel>
            <input
              type="password"
              name="password"
              onChange={this.handleInputChange}
              value={this.state.password}
            />
            <MyErrorLabel>{this.state.passwordError}</MyErrorLabel>
          </div>
          <div>
            <MyLabel>Age</MyLabel>
            <select
              onChange={this.handleInputChange}
              name="age"
              value={this.state.age}
            >
              {ageDropDown}
            </select>
            <MyErrorLabel>{this.state.ageError}</MyErrorLabel>
          </div>
          <div>
            <MyLabel>Role</MyLabel>
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
            <MyErrorLabel>{this.state.roleError}</MyErrorLabel>
          </div>
          <div>
            <MyButton
              type="submit"
              value="Submit"
              className="btn btn-primary"
              onClick={this.handleSubmit}
            >
              Submit
            </MyButton>

            <MyErrorLabel>{this.state.submitError}</MyErrorLabel>
          </div>
        </MyFormWrapper>
      </div>
    );
  }
}

export default Register;
