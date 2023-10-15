import { NavLink } from "react-router-dom"
import Slider from "react-slick"

// interface ICardList {
//   onClick?: () => void
//   style?: object
//   className?: string
// }

interface Props {
  cards: any
}

export default function AssistantsCardsSlider({ cards }: Props) {
  // const SampleNextArrow = (props: ICardList) => {
  //   const { className, onClick } = props

  //   return (
  //     <div
  //       className={className}
  //       style={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         alignContent: "center",
  //         height: "30px",
  //         width: "30px",
  //         borderRadius: "15px",
  //         background: `linear-gradient(
  //           90deg,
  //           #ae519d 0%,
  //           #e54389 51.04%,
  //           #f4a14c 97.92%
  //         )`,
  //         right: 0,
  //       }}
  //       onClick={onClick}
  //     />
  //   )
  // }

  // const SamplePrevArrow: React.FC<{
  //   className?: string
  //   onClick?: () => void
  // }> = ({ className, onClick }) => {
  //   return (
  //     <div
  //       className={className}
  //       style={{
  //         zIndex: 20,
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         alignContent: "center",
  //         height: "30px",
  //         width: "30px",
  //         borderRadius: "15px",
  //         background: `linear-gradient(
  //           90deg,
  //           #ae519d 0%,
  //           #e54389 51.04%,
  //           #f4a14c 97.92%
  //         )`,
  //         left: 0,
  //       }}
  //       onClick={onClick}
  //     />
  //   )
  // }

  const settings = {
    // dots: true,
    infinite: cards.length > 7,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    swipeToSlide: true,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,

    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          // infinite: true,
          // dots: true,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          // infinite: true,
          // dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          // infinite: true,
          // initialSlide: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          // infinite: true,
          // initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          // infinite: true,
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
    <section className="max-w-7xl mx-auto dark:brightness-50 w-full  overflow-x-hidden">
      {cards.length > 0 && (
        <Slider {...settings} key={"assistants-slider"}>
          {cards?.map((card: any, index: any) => {
            return (
              <div
                className="w-1/2 sm:w-1/3 lg:w-1/4
          h-auto p-1"
                key={card.name + "-on-assistants-slider"}
              >
                <NavLink
                  to={
                    "/assistants/" +
                    card.persona.replaceAll(" ", "_").toLowerCase()
                  }
                  className="
                          h-auto p-1 rounded-xl 
                          overflow-hidden 
                          border border-gray-200 dark:border-gray-800 shadow-md
                          bg-slate-100 dark:bg-slate-900
                          flex flex-col items-center"
                  key={index}
                >
                  <img
                    src={"" + card.avatar}
                    alt="image"
                    className="object-cover w-[350px] aspect-[8/7]  rounded-lg"
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
              </div>
            )
          })}
        </Slider>
      )}
      {cards.length == 0 && (
        <div className="height-[200px] w-auto flex justify-center my-2">
          <img
            src="/assets/icons_new/user-block-svgrepo-com.svg"
            alt="image"
            className="object-cover w-[180px] aspect-[3/3]  rounded-2xl dark:invert"
          />
        </div>
      )}
    </section>
  )
}
