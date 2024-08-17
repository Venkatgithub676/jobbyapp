import {Link, withRouter} from 'react-router-dom'
import {MdWork} from 'react-icons/md'
import {IoMdHome} from 'react-icons/io'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const clickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const mediumDevices = (
    <div className="medium-devices-con">
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
    </div>
  )

  const lowDevices = (
    <ul className="low-devices-ul-con">
      <li className="low-device-li-item">
        <Link to="/" className="low-device-link">
          <IoMdHome color="#ffffff" fontSize={30} />
        </Link>
      </li>
      <li className="low-device-li-item">
        <Link to="/jobs" className="low-device-link">
          <MdWork color="#ffffff" fontSize={30} />
        </Link>
      </li>
      <li className="low-device-li-item">
        <button type="button" onClick={clickLogout} className="low-device-link">
          <FiLogOut color="#ffffff" fontSize={30} alt="logoutBtn" />
        </button>
      </li>
    </ul>
  )

  return (
    <nav className="nav-con">
      <Link to="/" className="link-img">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="nav-logo"
        />
      </Link>

      {mediumDevices}
      {lowDevices}
    </nav>
  )
}
export default withRouter(Header)
