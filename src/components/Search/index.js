import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  noResult: 'NO_RESULT',
}

class Search extends Component {
  state = {
    searchInput: '',
    searchData: '',
    apiStatus: apiStatusConstants.initial,
  }

  getSearchData = async () => {
    const {searchInput} = this.state
    this.state({
      apiStatus: apiStatusConstants.initial,
    })
    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
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
      if (formattedData.length === 0) {
        this.setState({
          apiStatus: apiStatusConstants.noResult,
        })
      } else {
        this.setState({
          apiStatus: apiStatusConstants.success,
          searchData: formattedData,
        })
      }
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  updateSearchInput = value => {
    this.setState({searchInput: value})
  }

  searchLoaderView = () => (
    <div className="search-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  searchFailureView = () => (
    <div className="search-loader-container">
      <img
        src="https://res.cloudinary.com/dc2b69ycq/image/upload/v1670002135/Movies%20App/Failure_l6kgfg.png"
        alt="failure view"
        className="search-failure-image"
      />
      <p className="search-failure-text">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="search-retry-button"
        onClick={this.getSearchApiData}
      >
        Try Again
      </button>
    </div>
  )

  searchSuccessView = () => {}

  render() {
    const {searchInput} = this.state
    return (
      <div className="search-bg-container">
        <Header
          updateSearchInput={this.updateSearchInput}
          searchInput={searchInput}
        />
        {this.searchFailureView()}
      </div>
    )
  }
}
export default Search
