import {Component} from 'react'
import Loader from 'react-loader-spinner'
import format from 'date-fns/format'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import MovieItem from '../MovieItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieDetailedItem extends Component {
  state = {
    movieDetailsData: [],
    similarMoviesData: [],
    audioData: [],
    genresData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  getGenresData = data => ({
    id: data.id,
    name: data.name,
  })

  getSimilarMoviesData = data => ({
    id: data.id,
    backdropPath: data.backdrop_path,
    posterPath: data.poster_path,
    title: data.title,
  })

  getSpokenLanguageData = data => ({
    id: data.id,
    englishName: data.english_name,
  })

  getMovieDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const movieDetailApiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(movieDetailApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = {
        adult: data.movie_details.adult,
        backdropPath: data.movie_details.backdrop_path,
        budget: data.movie_details.budget,
        id: data.movie_details.id,
        overview: data.movie_details.overview,
        posterPath: data.movie_details.poster_path,
        releaseDate: data.movie_details.release_date,
        runtime: data.movie_details.runtime,
        title: data.movie_details.title,
        voteAverage: data.movie_details.vote_average,
        voteCount: data.movie_details.vote_count,
      }
      const genre = data.movie_details.genres.map(eachGenre =>
        this.getGenresData(eachGenre),
      )
      const similarMovies = data.movie_details.similar_movies.map(eachMovie =>
        this.getSimilarMoviesData(eachMovie),
      )
      const audio = data.movie_details.spoken_languages.map(eachLanguage =>
        this.getSpokenLanguageData(eachLanguage),
      )
      this.setState({
        movieDetailsData: formattedData,
        similarMoviesData: similarMovies,
        audioData: audio,
        genresData: genre,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  movieDetailedLoaderView = () => (
    <>
      <Header />
      <div className="search-loader-container" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </>
  )

  movieDetailedFailureView = () => (
    <>
      <Header />
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
          onClick={this.getMovieDetails}
        >
          Try Again
        </button>
      </div>
    </>
  )

  runTime = () => {
    const {movieDetailsData} = this.state
    const {runtime} = movieDetailsData
    const hours = Math.floor(runtime / 60)
    const minutes = Math.floor(runtime % 60)

    return `${hours}h ${minutes}m`
  }

  releasedYear = () => {
    const {movieDetailsData} = this.state
    const {releaseDate} = movieDetailsData
    if (releaseDate !== undefined) {
      return format(new Date(releaseDate), 'yyyy')
    }
    return null
  }

  formattedReleaseDate = () => {
    const {movieDetailsData} = this.state
    const {releaseDate} = movieDetailsData
    if (releaseDate !== undefined) {
      return format(new Date(releaseDate), 'do MM yyyy')
    }
    return null
  }

  movieDetailedSuccessView = () => {
    const {
      movieDetailsData,
      genresData,
      audioData,
      similarMoviesData,
    } = this.state
    const bgImage = movieDetailsData.backdropPath
    const censorRating = movieDetailsData.adult ? 'A' : 'U/A'
    return (
      <>
        <div
          style={{backgroundImage: `url(${bgImage})`}}
          className="movie-item-content-container"
        >
          <Header />
          <div className="movie-item-content-card">
            <div className="movie-item-heading-container">
              <h1 className="movie-item-heading">{movieDetailsData.title}</h1>
              <div className="movie-duration-card">
                <p className="movie-duration">{this.runTime()}</p>
                <p className="movie-certified-symbol">{censorRating}</p>
                <p className="movie-duration">{this.releasedYear()}</p>
              </div>
              <p className="movie-item-description">
                {movieDetailsData.overview}
              </p>
              <button type="button" className="movie-item-play-button">
                Play
              </button>
            </div>
          </div>
        </div>
        <div className="movie-item-details-container">
          <div className="movie-item-detailed-card1">
            <ul className="movie-item-details-card">
              <li className="movie-item-list-item">
                <h1 className="movie-items-details-title">Genres</h1>
                {genresData.map(each => (
                  <p
                    key={each.id}
                    className="movie-items-details-title-description"
                  >
                    {each.name}
                  </p>
                ))}
              </li>
              <li>
                <h1 className="movie-items-details-title">Audio Available</h1>
                {audioData.map(each => (
                  <p
                    key={each.id}
                    className="movie-items-details-title-description"
                  >
                    {each.englishName}
                  </p>
                ))}
              </li>
              <li>
                <div>
                  <h1 className="movie-items-details-title">Rating Count</h1>
                  <p className="movie-items-details-title-description">
                    {movieDetailsData.voteCount}
                  </p>
                </div>
                <div>
                  <h1 className="movie-items-details-title">Rating Average</h1>
                  <p className="movie-items-details-title-description">
                    {movieDetailsData.voteAverage}
                  </p>
                </div>
              </li>
              <li>
                <div>
                  <h1 className="movie-items-details-title">Budget</h1>
                  <p className="movie-items-details-title-description">
                    {movieDetailsData.budget}
                  </p>
                </div>
                <div>
                  <h1 className="movie-items-details-title">Release Date</h1>
                  <p className="movie-items-details-title-description">
                    {this.formattedReleaseDate()}
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <h1 className="similar-movies-heading">More like this</h1>
          <ul className="movie-item-details-card1">
            {similarMoviesData.map(eachItem => (
              <MovieItem
                getMovieDetails={this.getMovieDetails}
                movieDetails={eachItem}
                key={eachItem.id}
              />
            ))}
          </ul>
        </div>
      </>
    )
  }

  movieItemDetailedOutputView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.movieDetailedSuccessView()
      case apiStatusConstants.inProgress:
        return this.movieDetailedLoaderView()
      case apiStatusConstants.failure:
        return this.movieDetailedFailureView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="movie-detailed-container">
        {this.movieItemDetailedOutputView()}
        <Footer />
      </div>
    )
  }
}
export default MovieDetailedItem
