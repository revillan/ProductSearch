import React from 'react';
import { Link, hashHistory, withRouter } from 'react-router';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this._clearErrorsWhenSwitchForms = this._clearErrorsWhenSwitchForms.bind(this);
  }

  componentDidUpdate(){
    this.redirectIfLoggedIn();
  }

  _clearErrorsWhenSwitchForms(nextState, replace){
    this.props.receiveErrors([]);
  }

  redirectIfLoggedIn(){
    if (this.props.loggedIn) {
      this.props.router.replace('/');
    }
  }

  update(field){
		return e => { this.setState({[field]: e.currentTarget.value }); };
	}

  handleSubmit(e){
    e.preventDefault();
    const user = this.state;
    this.props.processForm({ user });
  }

  navLink(){
    if (this.props.formType === "login") {
      return <Link to="/signup" onClick={this._clearErrorsWhenSwitchForms}>
        sign up instead</Link>;
    } else {
      return <Link to="/login" onClick={this._clearErrorsWhenSwitchForms}>
        log in instead</Link>;
    }
  }

  renderErrors(){
    return(
      <ul>
        {this.props.errors.map( (error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="login-form-container">
        <form onSubmit={this.handleSubmit} className="login-form-box">
          ProductQuest
          <br/>
          Please { this.props.formType } or { this.navLink() }
          { this.renderErrors() }
          <div className="login-form">
            <br />
            <label> Username:
              <input type="text"
                value={this.state.username}
                onChange={this.update("username")}
                className="login-input" />
            </label>

            <br />
            <label> Password:
              <input type="password"
                value={this.state.password}
                onChange={this.update("password")}
                className="login-input" />
            </label>

            <br />
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}
export default withRouter(SessionForm);
