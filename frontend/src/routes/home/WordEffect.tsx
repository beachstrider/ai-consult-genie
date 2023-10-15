import React from "react"

interface WordEffectProps {
  text: string[]
  delay: number
  className?: string
}

const WordEffect: React.FC<WordEffectProps> = ({ text, delay, className }) => {
  const [completed, setCompleted] = React.useState(false)
  const [visibleText, setVisibleText] = React.useState("")
  const [currentTextIndex, setCurrentTextIndex] = React.useState(0)

  React.useEffect(() => {
    let currentIndex = 0
    let animationTimer: NodeJS.Timeout | null = null

    const animateText = () => {
      const currentWord = text[currentTextIndex].split(" ")[currentIndex]
      setVisibleText((prevText) => prevText + " " + currentWord)
      currentIndex++

      if (currentIndex < text[currentTextIndex].split(" ").length) {
        animationTimer = setTimeout(animateText, delay)
      } else {
        if (currentTextIndex + 1 < text.length) {
          setCurrentTextIndex((prevIndex) => prevIndex + 1)
          setVisibleText("")
          currentIndex = 0
          animationTimer = setTimeout(animateText, delay)
        } else {
          setCompleted(true)
        }
      }
    }

    animationTimer = setTimeout(animateText, delay)

    return () => {
      if (animationTimer) {
        clearTimeout(animationTimer)
      }
    }
  }, [text, delay, completed, currentTextIndex])

  React.useEffect(() => {
    if (completed) {
      setVisibleText("")
      setCompleted(false)
      setCurrentTextIndex(0)
    }
  }, [completed])

  return (
    <div
      className={`text-md md:text-md xl:text-md font-medium ${className} text-gray-500`}
    >
      {visibleText}
    </div>
  )
}

export default WordEffect
