import { useRouter } from 'next/router'
import styled from 'styled-components'
import { getSingleMovie,getTrailer } from '../../tmdb'
import ReactPlayer from 'react-player/youtube'

function Single(props) {
  const router = useRouter()
  const movieId = router.query.id
  const s = props.movie
  return (
    <>
      <CardContainer>
        <Card>
          <div className='content'>
            <img
              src={
                s.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${s.poster_path}`
                  : 'https://2gyntc2a2i9a22ifya16a222-wpengine.netdna-ssl.com/wp-content/uploads/sites/29/2014/12/Image-Not-Available.jpg'
              }
              alt='Image'
              width='50%'
            />
          </div>
          <div className='content'>
            <h1>
              {s.original_title || s.original_name}
              {s.release_date ? ` (${s.release_date.split('-')[0]})` : ''}
              {s.first_air_date ? ` (${s.first_air_date.split('-')[0]})` : ''}
            </h1>
            <h4>{s.overview}</h4>
            {s.genres ? (
              <h4>
                {s.genres[0] && s.genres[0].name} |{' '}
                {s.genres[1] && s.genres[1].name} |{' '}
                {s.genres[2] && s.genres[2].name}
              </h4>
            ) : (
              ''
            )}
          </div>
        </Card>
        <Card width='55rem'>
          <ReactPlayer
            url={`https://www.youtube.com/embed/${props.trailer}`}
            controls
          />
        </Card>
      </CardContainer>
    </>
  )
}

const Card = styled.div`
  width: 70vw;
  max-width: 75rem;
  background-color: rgba(240, 248, 255, 0.9);
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.5);
  margin: 0 1rem 2rem 0;
  border-radius: 10px;
  text-align: center;
  color: black;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .content {
    padding: 1rem 1rem;
    width: 100%;
    margin: 0 auto;
  }
  & h1 {
    margin: 2rem 0;
    padding: 1rem;
    /* font-size: 1.5rem; */
  }
  & h4{
    margin: 2rem 0;
  }
`

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: calc(100vw - 20px);
  max-width: 1000px;
  margin: 2rem auto;
  padding: 1rem;
`

export async function getServerSideProps(context) {
  const tv = context.query.tv
  const movieId = context.query.id
  const result = await getSingleMovie(movieId,tv)
  // const youtubeTrailer = await getYoutubeTrailer(result.original_title || result.original_name)
  // console.log(youtubeTrailer.items[0].id.videoId)
  // console.log(result)
  const trailer = await getTrailer(movieId,tv)
  // console.log(trailer.results[0].key);
  const trailerVideo = trailer.results.find((s) => s.type == 'Trailer')
  return {
    props: {
      movie: result,
      trailer: trailerVideo.key,
    },
  }
}

export default Single
