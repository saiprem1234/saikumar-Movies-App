import {Link} from 'react-router-dom'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const MovieSlider = props => {
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  }
  const {moviesData} = props

  return (
    <>
      <Slider {...settings}>
        {moviesData.map(eachMovie => (
          <Link
            className="thumbnail-image-card"
            to={`/movies/${eachMovie.id}`}
            key={eachMovie.id}
          >
            <img
              className="thumbnail"
              src={eachMovie.posterPath}
              alt={eachMovie.title}
            />
          </Link>
        ))}
      </Slider>
    </>
  )
}
export default MovieSlider
