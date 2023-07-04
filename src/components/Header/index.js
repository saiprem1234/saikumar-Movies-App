import {Component} from 'react'
import {HiOutlineSearch} from 'react-icons/hi'
import {MdMenuOpen} from 'react-icons/md'
import {AiFillCloseCircle} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import './index.css'

class Header extends Component {
  state = {
    showOptions: false,
  }

  onToggleMenu = () => {
    this.setState(prevState => ({
      showOptions: !prevState.showOptions,
    }))
  }

  render() {
    const {showOptions} = this.state
    return (
      <>
        <nav className="navbar">
          <div className="navbar-container">
            <div>
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/dpoyt9wp0/image/upload/v1688382078/Group_7399_p2tymc.svg"
                  className="website-logo"
                  alt="login website logo"
                />
              </Link>
            </div>
            <ul className="nav-items-list">
              <li>
                <button className="search-icon-button" type="button">
                  <HiOutlineSearch size={20} />
                </button>
              </li>
              <li>
                <button
                  onClick={this.onToggleMenu}
                  className="hamburger-button"
                  type="button"
                >
                  <MdMenuOpen size={30} />
                </button>
              </li>
            </ul>
          </div>
        </nav>
        {showOptions && (
          <div className="menu-options-container">
            <ul className="menu-options-card">
              <li>
                <Link className="menu-option" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="menu-option" to="/popular">
                  Popular
                </Link>
              </li>
              <li>
                <Link className="menu-option" to="/account">
                  Account
                </Link>
              </li>
              <li>
                <button
                  onClick={this.onToggleMenu}
                  className="close-icon-button"
                  type="button"
                >
                  <AiFillCloseCircle size={25} />
                </button>
              </li>
            </ul>
          </div>
        )}
      </>
    )
  }
}
export default Header