import {Link} from 'react-router-dom'
import './index.css'

const MovieItem = props => {
  const {movieDetails} = props
  const {id, title, posterPath} = movieDetails

  return (
    <li>
      <Link to={`/movies/${id}`}>
        <img src={posterPath} alt={title} className="movie-item-image" />
      </Link>
    </li>
  )
}
export default MovieItem
