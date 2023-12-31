import {Component} from 'react'
import {HiOutlineSearch} from 'react-icons/hi'
import {MdMenuOpen} from 'react-icons/md'
import {AiFillCloseCircle} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import './index.css'

class Header extends Component {
  state = {
    showOptions: false,
    currentPath: '',
  }

  componentDidMount() {
    const path = window.location.pathname
    this.setState({
      currentPath: path,
    })
  }

  onChangeSearchInput = event => {
    const {updateSearchInput} = this.props
    updateSearchInput(event.target.value)
  }

  onToggleMenu = () => {
    this.setState(prevState => ({
      showOptions: !prevState.showOptions,
    }))
  }

  onEnterSearch = event => {
    const {getSearchData} = this.props
    if (event.key === 'Enter') {
      getSearchData()
    }
  }

  onSearch = () => {
    const {getSearchData} = this.props
    getSearchData()
  }

  render() {
    const {showOptions, currentPath} = this.state
    const {searchInput} = this.props
    return (
      <>
        <nav className="navbar">
          <div className="navbar-container">
            <div className="options-container">
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/dpoyt9wp0/image/upload/v1688382078/Group_7399_p2tymc.svg"
                  className="website-logo"
                  alt="website logo"
                />
              </Link>
              <ul className="options-card">
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
              </ul>
            </div>
            <ul className="nav-items-list">
              {currentPath === '/search' ? (
                <li className="search-input-container">
                  <input
                    onKeyDown={this.onEnterSearch}
                    type="search"
                    placeholder="Search"
                    className="search-input"
                    onChange={this.onChangeSearchInput}
                    value={searchInput}
                  />
                  <button
                    onClick={this.onSearch}
                    className="search-input-icon-button"
                    type="button"
                    testid="searchButton"
                  >
                    <HiOutlineSearch className="search-image" size={16} />
                  </button>
                </li>
              ) : (
                <li>
                  <Link to="/search">
                    <button
                      onClick={this.onClickSearch}
                      className="search-icon-button"
                      type="button"
                      testid="searchButton"
                    >
                      <HiOutlineSearch size={20} />
                    </button>
                  </Link>
                </li>
              )}
              <li className="avatar-container">
                <Link to="/account">
                  <img
                    src="https://res.cloudinary.com/dc2b69ycq/image/upload/v1669785109/Movies%20App/Vector_Avatar1_hiwft7.png"
                    alt="profile"
                  />
                </Link>
              </li>
              <li className="hamburger-container">
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
