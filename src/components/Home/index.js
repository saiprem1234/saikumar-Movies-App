import Cookies from 'js-cookie'
import {Component} from 'react'
import Header from '../Header'
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
    console.log(response.ok)
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
      </div>
    )
  }

  posterDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.posterSuccessView()
      default:
        return null
    }
  }

  render() {
    return <div className="home-bg-container">{this.posterDetails()}</div>
  }
}
export default Home
