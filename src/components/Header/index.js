import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const clickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-con">
      <Link to="/" className="link-img">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="nav-logo"
        />
      </Link>
      <ul className="nav-ul-con">
        <Link to="/" className="nav-link">
          <li className="nav-li-item">Home</li>
        </Link>
        <Link to="/jobs" className="nav-link">
          <li className="nav-li-item">Jobs</li>
        </Link>
      </ul>
      <button type="button" onClick={clickLogout} className="logout-btn">
        Logout
      </button>
    </nav>
  )
}
export default withRouter(Header)
