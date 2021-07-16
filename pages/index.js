import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Carousel from '../Components/Carousel'
import { getNowPlaying, getSearchMovies,getGenreBasedMovies,getYearBasedMovies } from '../tmdb'

function Home(props) {
  const router = useRouter()

  const [searchInput, setSearchInput] = useState('')
  const [isSearching,setIsSearching] = useState(false)
  const [currentList, setCurrentList] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [nowPlayingMovieList, setNowPlayingMovieList] = useState(
    props.nowPlaying.results
  )
  const [genreSearching,setGenreSearching] = useState(null)
  const [yearSearching,setYearSearching] = useState(null)

  const loadMoreHandler = async () => {
    setIsLoading(true)
    const currentScrollHeight = document.body.scrollHeight
    var nowPlayingList2
    if(genreSearching) {
      nowPlayingList2 = await getGenreBasedMovies(genreSearching,currentList + 1)
    } else if(yearSearching) {
      nowPlayingList2 = await getYearBasedMovies(yearSearching, currentList + 1)
    } else {
      nowPlayingList2 = await getNowPlaying(currentList + 1)
    }
    setNowPlayingMovieList((prevState) => {
      const loadedResult = [...prevState, ...nowPlayingList2.results]
      return loadedResult
    })
    setIsLoading(false)
    setCurrentList(currentList + 1)
    window.scrollTo(0, currentScrollHeight - 300)
  }

  useEffect(() => {
    const timer = setTimeout(async() => {
      // Send Axios request here
      if (searchInput.trim() != '') {
        setIsSearching(true)
        setYearSearching('')
        setGenreSearching('')
        const searchResult = await getSearchMovies(searchInput)
        if (searchResult.results) {
          setIsLoading(true)
          // setNowPlayingMovieList([])
          console.log(searchResult)
          setNowPlayingMovieList(searchResult.results)
          if (searchResult.results.length >= 1) {
            setIsLoading(false)
            // setSearchInput('')
          }
          else setIsLoading(true)
        }
      } else {
        const nowPlayingList2 = await getNowPlaying(1)
        setNowPlayingMovieList((prevState) => {
          const loadedResult = [...nowPlayingList2.results]
          return loadedResult
        })
        setCurrentList(1)
        setIsSearching(false)
      }
    }, 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [searchInput])

  const genreChangeHandler = async(e) => {
    setYearSearching('')
    setGenreSearching(e.target.value)
    setIsLoading(true)

    const genreResult = await getGenreBasedMovies(e.target.value,1)
    setNowPlayingMovieList(genreResult.results)
    setIsLoading(false)
  }

  const yearChangeHandler = async (e) => {
    setGenreSearching('')
    setYearSearching(e.target.value)
    setIsLoading(true)

    const yearResult = await getYearBasedMovies(e.target.value, 1)
    setNowPlayingMovieList(yearResult.results)
    setIsLoading(false)
  }

  return (
    <div>
      <MainScreen>
        <center>
          <Carousel carouselList={props.carouselList} />
        </center>
      </MainScreen>

      <Search
        type='text'
        placeholder='Search'
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <FilterContainer>
        <Filter onChange={genreChangeHandler} value={genreSearching}>
          <option value='' disabled selected hidden>
            Genre
          </option>
          <option value='28'>Action</option>
          <option value='27'>Horror</option>
          <option value='53'>Thriller</option>
        </Filter>
        <Filter onChange={yearChangeHandler} value={yearSearching}>
          <option value='' disabled selected hidden>
            Year
          </option>
          <option value='2021'>2021</option>
          <option value='2020'>2020</option>
          <option value='2019'>2019</option>
        </Filter>
      </FilterContainer>
      <CardContainer>
        {!isLoading ? (
          nowPlayingMovieList.map((s) => (
            <Card
              key={Math.random()}
              onClick={() => router.push(`/details/${s.id}?tv=${s.first_air_date?true:false}`)}
            >
              <div className='content'>
                <img
                  src={
                    s.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${s.poster_path}`
                      : 'https://2gyntc2a2i9a22ifya16a222-wpengine.netdna-ssl.com/wp-content/uploads/sites/29/2014/12/Image-Not-Available.jpg'
                  }
                  alt='Image'
                  width='100%'
                />
                <h1>
                  {s.original_title || s.original_name}
                  {s.release_date ? ` (${s.release_date.split('-')[0]})` : ''}
                  {s.first_air_date
                    ? ` (${s.first_air_date.split('-')[0]})`
                    : ''}
                </h1>
              </div>
            </Card>
          ))
        ) : (
          <Card key={Math.random()}>
            <div className='content'>
              <img
                src={
                  'https://2gyntc2a2i9a22ifya16a222-wpengine.netdna-ssl.com/wp-content/uploads/sites/29/2014/12/Image-Not-Available.jpg'
                }
                alt='Image'
                width='100%'
              />
              <h1>No Movies Found</h1>
            </div>
          </Card>
        )}
      </CardContainer>
      {!isSearching && <Button onClick={loadMoreHandler}>Load More</Button>}
    </div>
  )
}

const MainScreen = styled.div`
  width: calc(70vw - 20px);
  max-width: 500px;
  /* padding: 20rem 0; */
  margin: 1rem auto;
  /* background-color: rgba(240, 248, 255,0.3); */
  /* background-color: transparent; */
  /* box-shadow: 0 0 10px 0 rgba(0,0,0,0.5); */
  border-radius: 10px;
  color: black;
  padding: 1rem;
`

const Search = styled.input`
  width: 40rem;
  max-width: 40vw;
  min-width: 40rem;
  display: block;
  margin: 2rem auto;
  padding: 1rem 3rem;
  font-size: 2rem;
  border-radius: 10px;
`

const FilterContainer = styled.div`
  margin: 2rem auto;
  max-width: 100vw;
  width: 60rem;
  text-align: center;
`

const Filter = styled.select`
  width: 16rem;
  margin: 0 2rem;
  padding: 1rem 3rem;
  font-size: 2rem;
  border-radius: 10px;
`

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: stretch;
  width: calc(100vw - 20px);
  max-width: 1000px;
  margin: 4rem auto;
`

const Card = styled.div`
  width: 80vw;
  max-width: 25rem;
  background-color: rgba(240, 248, 255, 0.9);
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.5);
  margin: 0 1rem 2rem 0;
  border-radius: 10px;
  text-align: center;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    padding: 1rem;
    width: 100%;
    margin: 0 auto;
  }
  & h1 {
    margin: 1rem 0;
    font-size: 1.5rem;
  }
`

const Button = styled.button`
  display: block;
  padding: 1rem;
  margin: 1rem auto;
  background-color: rgba(240, 248, 255, 0.8);
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.5);
  font-size: 1.8rem;
  font-weight: bold;
  color: black;
  width: 10vw;
  min-width: 150px;
  outline: none;
  border-radius: 10px;
`

export async function getStaticProps() {
  const nowPlaying = await getNowPlaying(1)
  const carouselList = [
    nowPlaying.results[0],
    nowPlaying.results[1],
    nowPlaying.results[2],
    nowPlaying.results[3],
    nowPlaying.results[4],
  ]
  return {
    props: {
      nowPlaying: nowPlaying,
      carouselList: carouselList,
    },
  }
}

export default Home
