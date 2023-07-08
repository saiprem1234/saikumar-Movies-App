import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container" alt="not found">
    <div className="not-found-content">
      <h1 className="not-found-title">Lost Your Way ?</h1>
      <p className="not-found-title-description">
        we are sorry, the page you requested could not be found Please go back
        to the homepage
      </p>
      <Link to="/" className="link">
        <button className="not-found-button" type="button">
          Go to Home
        </button>
      </Link>
    </div>
  </div>
)
export default NotFound
