import { NavLink } from "react-router-dom"
import Slider from "react-slick"

interface ICardList {
  onClick?: () => void
  style?: object
  className?: string
}

interface Props {
  cards: any
}

export default function ToolsCardsSlider({ cards }: Props) {
  const SampleNextArrow = (props: ICardList) => {
    const { className, onClick } = props

    return (
      <div
        className={className}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          height: "30px",
          width: "30px",
          borderRadius: "15px",
          background: `linear-gradient(
            90deg,
            #ae519d 0%,
            #e54389 51.04%,
            #f4a14c 97.92%
          )`,
          right: 0,
        }}
        onClick={onClick}
      />
    )
  }

  const SamplePrevArrow: React.FC<{
    className?: string
    onClick?: () => void
  }> = ({ className, onClick }) => {
    return (
      <div
        className={className}
        style={{
          zIndex: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          height: "30px",
          width: "30px",
          borderRadius: "15px",
          background: `linear-gradient(
            90deg,
            #ae519d 0%,
            #e54389 51.04%,
            #f4a14c 97.92%
          )`,
          left: 0,
        }}
        onClick={onClick}
      />
    )
  }

  const settings = {
    // dots: true,
    // infinite: cards.length > 3,
    infinite: false,
    // autoplay: true,
    // autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    swipeToSlide: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          // infinite: cards.length > 4,
          // dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          // infinite: cards.length > 3,
          // initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          // infinite: cards.length > 2,
          // initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          // infinite: cards.length > 2,
        },
      },
    ],
    customPaging: () => (
      <div
        style={{
          height: "20px",
          width: "20px",
          borderRadius: "50%",
          marginTop: "10px",
          // background: `linear-gradient(
          //   90deg,
          //   #ae519d 0%,
          //   #e54389 51.04%,
          //   #f4a14c 97.92%
          // )`,
        }}
      />
    ),
  }

  return (
    <section className="max-w-4xl mx-auto dark:brightness-50 w-full">
      {cards.length > 0 && (
        <Slider {...settings}>
          {cards?.map((card: any, index: any) => {
            return (
              <NavLink
                to={"/" + card.persona.replaceAll(" ", "_").toLowerCase()}
                className="
                          h-auto p-2 rounded-3xl 
                          overflow-hidden 
                          border border-gray-200 dark:border-gray-800 shadow-md
                          bg-white dark:bg-[#0b0b0b]
                          flex flex-col items-center"
                key={index}
              >
                <img
                  src={"" + card.avatar}
                  alt="image"
                  className="object-cover w-[300px] aspect-[3/3]  rounded-2xl invert dark:invert-0"
                  data-tooltip-id={index}
                />
                <div className="w-full h-1/3 text-center justify-center">
                  <h3>
                    <span
                      // href={assistant.href}
                      className=" font-semibold
                                  text-xs
                                  block
                                 
                                "
                    >
                      {/* {assistant.persona} {assistant.name} */}
                      {card.persona}
                    </span>
                  </h3>
                  {/* <p
                    className=" text-xs
                              text-yellow-500 "
                  >
                    {card.description}
                  </p> */}
                </div>
              </NavLink>
            )
          })}
        </Slider>
      )}
    </section>
  )
}
