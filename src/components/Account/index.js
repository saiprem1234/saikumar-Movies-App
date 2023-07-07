import './index.css'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'

const Account = props => {
  const onLogOut = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="account-bg-container">
      <Header />
      <div className="account-container">
        <div className="account-card">
          <h1 className="account-title">Account</h1>
          <hr className="cross-line" />
          <div className="membership-container">
            <p className="membership-title">Member ship</p>
            <div className="user-details-card">
              <p className="user-mail">rahul@gmail.com</p>
              <p className="user-password">Password : ************</p>
            </div>
          </div>
          <hr className="cross-line" />
          <div className="membership-container">
            <p className="plan-details-name">Plan details</p>
            <p className="premium-name">Premium</p>
            <p className="ultra-hd-stream">Ultra HD</p>
          </div>
          <hr className="cross-line" />
        </div>
        <button onClick={onLogOut} className="logout-button" type="button">
          Logout
        </button>
      </div>
      <Footer />
    </div>
  )
}
export default Account
