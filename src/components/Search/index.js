import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import MovieItem from '../MovieItem'
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
    searchData: [],
    apiStatus: apiStatusConstants.initial,
  }

  getSearchData = async () => {
    const {searchInput} = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
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
        onClick={this.getSearchData}
      >
        Try Again
      </button>
    </div>
  )

  searchNoResultView = () => {
    const {searchInput} = this.state

    return (
      <div className="search-loader-container">
        <img
          src="https://res.cloudinary.com/dc2b69ycq/image/upload/v1670000784/Movies%20App/Not_Found_qfz2oz.png"
          alt="no movies"
          className="search-no-result-image"
        />
        <p className="search-no-result-text">
          {`
          Your search for ${searchInput} did not find any matches.`}
        </p>
      </div>
    )
  }

  searchSuccessView = () => {
    const {searchData} = this.state
    return (
      <div className="search-data-container">
        <ul className="search-data-list">
          {searchData.map(eachItem => (
            <MovieItem movieDetails={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  searchDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.searchLoaderView()
      case apiStatusConstants.success:
        return this.searchSuccessView()
      case apiStatusConstants.failure:
        return this.searchFailureView()
      case apiStatusConstants.noResult:
        return this.searchNoResultView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="search-bg-container">
        <Header
          updateSearchInput={this.updateSearchInput}
          searchInput={searchInput}
          getSearchData={this.getSearchData}
        />
        {this.searchDetails()}
      </div>
    )
  }
}
export default Search
