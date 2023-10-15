import WordEffect from "./WordEffect"
import { ANIMATED_TEXT } from "../../constants/nav.constants"

const IMAGE_GIF = "assets/videos/Sphere.gif"
const title = "Hi, I am Adamo 👋"

function HeroSection() {
  return (
    <div className="mt-2 flex items-center justify-center">
      <section className="relative flex  flex-col  items-center justify-center max-w-4xl">
        {/* <video
          autoPlay
          muted
          loop
          className="relative h-full w-full rounded-lg"
        >
          <source src={videoSrc} type="video/mp4" />
        </video> */}

        <div className="flex justify-start rounded-3xl w-[200px]">
          <img
            src={IMAGE_GIF}
            className="rounded-2xl dark:invert dark:rotate-180"
          />
        </div>
        {/* <div className="absolute bottom-0 text-start w-[330px]"> */}
        <div className="text-start w-[330px]">
          <h1 className="font-bold text-2xl text-black dark:text-white dark:brightness-75">
            {title}
          </h1>
          {/* <h3 className="font-semibold text-xl text-sky-500 dark:text-green-800">
            {discription1}
          </h3>
          <h3 className="font-semibold text-md text-indigo-500 dark:text-blue-800">
            {discription2}
          </h3> */}
          <div className="h-12">
            <WordEffect text={ANIMATED_TEXT} delay={200} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default HeroSection
