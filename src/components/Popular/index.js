import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import MovieItem from '../MovieItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Popular extends Component {
  state = {
    PopularData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getPopularData()
  }

  getPopularData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const url = `https://apis.ccbp.in/movies-app/popular-movies`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = data.results.map(eachMovie => ({
        id: eachMovie.id,
        backdropPath: eachMovie.backdrop_path,
        overview: eachMovie.overview,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        PopularData: formattedData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  popularLoaderView = () => (
    <div className="search-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  popularFailureView = () => (
    <div className="search-loader-container">
      <div>
        <img
          src="https://res.cloudinary.com/dc2b69ycq/image/upload/v1670040709/Movies%20App/alert-triangle_sc1zom.png"
          alt="failure view"
          className="search-failure-image"
        />
      </div>
      <p className="search-failure-text">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="search-retry-button"
        onClick={this.getPopularData}
      >
        Try Again
      </button>
    </div>
  )

  popularSuccessView = () => {
    const {PopularData} = this.state
    return (
      <div className="search-data-container">
        <ul className="search-data-list">
          {PopularData.map(eachItem => (
            <MovieItem movieDetails={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  popularDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.popularLoaderView()
      case apiStatusConstants.success:
        return this.popularSuccessView()
      case apiStatusConstants.failure:
        return this.popularFailureView()
      case apiStatusConstants.noResult:
        return this.popularNoResultView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="search-bg-container">
        <Header />
        {this.popularDetails()}
        <Footer />
      </div>
    )
  }
}
export default Popular
