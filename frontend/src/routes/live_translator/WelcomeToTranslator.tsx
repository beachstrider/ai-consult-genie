const IMAGE_GIF = "/assets/videos/Sphere.gif"
export default function WelcomeToTranslator() {
  return (
    <div className="h-full w-full lg:block hidden bg-[#FEFCFE] dark:bg-[#010301] text-black dark:text-white">
      <div className="flex flex-col h-full w-full items-center justify-center">
        <div className="flex justify-center rounded-3xl w-[200px]">
          <img
            src={IMAGE_GIF}
            className="rounded-full  dark:invert dark:rotate-180"
          />
        </div>
        <h2 className="text-xl font-bold text-gray-500 mt-8 mb-32">
          Welcome! Translate spoken or written language with the best
          correctness.
        </h2>
      </div>
    </div>
  )
}
