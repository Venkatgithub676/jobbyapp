import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errMsg: false}

  onSubmitForm = async event => {
    event.preventDefault()
    const apiUrl = 'https://apis.ccbp.in/login'
    const {username, password} = this.state
    // console.log(username, password)
    const userDtls = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDtls),
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      this.setState({errMsg: false})
      Cookies.set('jwt_token', data.jwt_token)
      const {history} = this.props
      history.replace('/')
      //   console.log(data, errMsg)
    } else {
      this.setState({errMsg: true})
    }
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {errMsg} = this.state
    // console.log(Cookies.get('jwt_token'))
    const errPara = errMsg ? (
      <p className="err-msg">*Username and Password did not match </p>
    ) : (
      <p>{}</p>
    )

    return (
      <div className="login-bg-con">
        <form className="login-con" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-logo-img"
          />
          <div className="label-input-con">
            <label htmlFor="username" className="login-label">
              USERNAME
            </label>
            <br />
            <input
              type="text"
              id="username"
              onChange={this.changeUsername}
              placeholder="Username"
              className="login-inputs"
            />
          </div>

          <div className="label-input-con">
            <label htmlFor="password" className="login-label">
              PASSWORD
            </label>
            <br />
            <input
              type="password"
              placeholder="Password"
              id="password"
              onChange={this.changePassword}
              className="login-inputs"
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
          {errPara}
        </form>
      </div>
    )
  }
}

export default Login
