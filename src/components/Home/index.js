import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import TrendingSection from '../TrendingSection'
import TopRatedSection from '../TopRatedSection'
import MovieSlider from '../MovieSlider'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    originalsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getResponse()
  }

  getResponse = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const url = 'https://apis.ccbp.in/movies-app/originals'
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
        originalsData: formattedData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  posterLoadingView = () => (
    <>
      <Header />
      <div className="loader-card">
        <div className="loader-container" testid="loader">
          <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
        </div>
      </div>
    </>
  )

  posterFailureView = () => (
    <>
      <Header />
      <div className="loader-card">
        <div className="loader-container">
          <img
            src="https://res.cloudinary.com/dc2b69ycq/image/upload/v1670040709/Movies%20App/alert-triangle_sc1zom.png"
            alt="failure view"
            className="poster-failure-image"
          />
          <p className="failure-title">
            Something went wrong. Please try again
          </p>
          <button
            type="button"
            className="failure-retry-button"
            onClick={this.getResponse}
          >
            Try Again
          </button>
        </div>
      </div>
    </>
  )

  posterSuccessView = () => {
    const {originalsData} = this.state
    const num = Math.floor(Math.random() * (originalsData.length - 1))
    const posterImage = originalsData[num]
    return (
      <div
        style={{
          backgroundImage: `url(${posterImage.backdropPath})`,
        }}
        className="bg-image"
      >
        <Header />
        <div className="movies-heading-container">
          <div className="movies-heading-card">
            <h1 className="movie-title">{posterImage.title}</h1>
            <p className="title-description">{posterImage.overview}</p>
            <button type="button" className="play-button">
              Play
            </button>
          </div>
        </div>
      </div>
    )
  }

  posterDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.posterSuccessView()
      case apiStatusConstants.inProgress:
        return this.posterLoadingView()
      case apiStatusConstants.failure:
        return this.posterFailureView()
      default:
        return null
    }
  }

  originalLoaderView = () => (
    <div className="trending-loader-card">
      <div className="trending-loader-container" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={32} width={32} />
      </div>
    </div>
  )

  originalFailureView = () => (
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

  originalSuccessView = () => {
    const {originalsData} = this.state
    return (
      <div className="slider-container">
        <MovieSlider moviesData={originalsData} />
      </div>
    )
  }

  originalDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.originalSuccessView()
      case apiStatusConstants.inProgress:
        return this.originalLoaderView()
      case apiStatusConstants.failure:
        return this.originalFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-bg-container">
        {this.posterDetails()}
        <div className="title-card title-container">
          <h1 className="trending-title">Trending Now</h1>
          <TrendingSection />
        </div>
        <div className="title-card">
          <h1 className="trending-title">Popular</h1>
          <TopRatedSection />
        </div>
        <div className="title-card">
          <h1 className="trending-title">Originals</h1>
          {this.originalDetails()}
        </div>
        <Footer />
      </div>
    )
  }
}
export default Home
