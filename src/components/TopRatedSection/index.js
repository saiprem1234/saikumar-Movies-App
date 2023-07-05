import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Component} from 'react'
import MovieSlider from '../MovieSlider'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TopRatedSection extends Component {
  state = {
    topRatedData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTopRatedData()
  }

  getTopRatedData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/top-rated-movies'
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
        topRatedData: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  popularLoaderView = () => (
    <div className="trending-loader-card">
      <div className="trending-loader-container" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={32} width={32} />
      </div>
    </div>
  )

  popularFailureView = () => (
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
          onClick={this.getTopRatedData}
        >
          Try Again
        </button>
      </div>
    </div>
  )

  popularSuccessView = () => {
    const {topRatedData} = this.state
    return (
      <div className="slider-container">
        <MovieSlider moviesData={topRatedData} />
      </div>
    )
  }

  popularDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.popularSuccessView()
      case apiStatusConstants.inProgress:
        return this.popularLoaderView()
      case apiStatusConstants.failure:
        return this.popularFailureView()
      default:
        return null
    }
  }

  render() {
    return <>{this.popularDetails()}</>
  }
}

export default TopRatedSection
