import styled from 'styled-components'
import { Carousel } from 'react-bootstrap'
import {useState} from 'react'
import {useRouter} from 'next/router'

export default function CarouselDiv(props) {
  const router = useRouter()

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel
      fade
      activeIndex={index}
      onSelect={handleSelect}
      style={{ width: '100%' }}
      // prevLabel=''
      // nextLabel=''
      interval={5000}
    >
      {props.carouselList.map((s) => (
        <Carousel.Item key={s.id}>
          <img
            onClick={() =>
              router.push(
                `/details/${s.id}?tv=${s.first_air_date ? true : false}`
              )
            }
            className='d-block w-50'
            src={`https://image.tmdb.org/t/p/w500/${s.poster_path}`}
            alt='First slide'
          />
          {/* <TransparentBlack>
            <Carousel.Caption>
              <h3>
                {s.original_title} {`(${s.release_date.split('-')[0]})`}
              </h3>
            </Carousel.Caption>
          </TransparentBlack> */}
        </Carousel.Item>
      ))}
    </Carousel>
  )

}

const TransparentBlack = styled.div`
  width: 100%;
  height: 7rem;
  background-color: rgba(0,0,0,0.5);
  position: absolute;
  bottom: 0;
`