import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Component} from 'react'
import MovieSlider from '../MovieSlider'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TrendingSection extends Component {
  state = {
    trendingData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTrendingData()
  }

  getTrendingData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/trending-movies'
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
        trendingData: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  trendingLoaderView = () => (
    <div className="trending-loader-card">
      <div className="trending-loader-container" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={32} width={32} />
      </div>
    </div>
  )

  trendingFailureView = () => (
    <div className="trending-loader-card">
      <div className="trending-loader-container">
        <img
          src="https://res.cloudinary.com/dc2b69ycq/image/upload/v1670040709/Movies%20App/alert-triangle_sc1zom.png"
          alt="failure view"
          className="trending-failure-image"
        />
        <p className="trending-failure-title">
          Something went wrong. Please try again
        </p>
        <button
          type="button"
          className="trending-failure-retry-button"
          onClick={this.getTrendingData}
        >
          Try Again
        </button>
      </div>
    </div>
  )

  trendingSuccessView = () => {
    const {trendingData} = this.state
    return (
      <div className="slider-container">
        <MovieSlider moviesData={trendingData} />
      </div>
    )
  }

  trendingDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.trendingSuccessView()
      case apiStatusConstants.inProgress:
        return this.trendingLoaderView()
      case apiStatusConstants.failure:
        return this.trendingFailureView()
      default:
        return null
    }
  }

  render() {
    return <>{this.trendingDetails()}</>
  }
}

export default TrendingSection
