import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isShowErrorMsg: false,
    errorMsg: '',
  }

  onEnterUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onEnterPassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onLoginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onLoginFailure = errorMsg => {
    this.setState({
      isShowErrorMsg: true,
      errorMsg,
    })
  }

  onLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onLoginSuccess(data.jwt_token)
    } else {
      this.onLoginFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, isShowErrorMsg, errorMsg} = this.state
    return (
      <div className="login-bg-container">
        <div className="website-logo-container">
          <img
            src="https://res.cloudinary.com/dpoyt9wp0/image/upload/v1688382078/Group_7399_p2tymc.svg"
            className="website-logo"
            alt="login website logo"
          />
        </div>
        <form onSubmit={this.onLogin} className="login-form-container">
          <h1 className="form-heading">Login</h1>
          <div className="input-container">
            <label className="login-input-label" htmlFor="username">
              Username
            </label>
            <input
              onChange={this.onEnterUsername}
              value={username}
              className="login-input-field"
              placeholder="Username"
              id="username"
              type="text"
            />
          </div>
          <div className="input-container">
            <label className="login-input-label" htmlFor="password">
              Password
            </label>
            <input
              onChange={(this, this.onEnterPassword)}
              value={password}
              className="login-input-field"
              placeholder=" Password"
              id="password"
              type="password"
            />
          </div>
          {isShowErrorMsg && <p className="error-msg">{errorMsg}</p>}
          <button type="submit" className="sign-in-btn">
            Sign in
          </button>
          <button type="submit" className="log-in-btn">
            Login
          </button>
        </form>
      </div>
    )
  }
}
export default Login
