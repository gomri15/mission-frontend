import React, { Component } from "react";

class Register extends Component {
  state = { name: "", age: "", password: "", role: "" };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
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
          Name{" "}
          <input type="text" name="name" onChange={this.handleInputChange} />
          <br />
          Password
          <input
            type="password"
            name="password"
            onChange={this.handleInputChange}
          />
          <br />
          Age{" "}
          <select onChange={this.handleInputChange} name="age">
            {ageDropDown}
          </select>
          <br />
          Role
          <select onChange={this.handleInputChange} name="role">
            <option defaultValue="" />
            <option>Druid</option>
            <option>Paladin</option>
            <option>Sorcerer</option>
            <option>Knight</option>
          </select>
          <br />
          <button
            type="submit"
            value="Submit"
            className="btn btn-primary"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Register;
