import { useState } from "react"

interface ReadCompleteAddressProps {
    text: string,
    maxChar: number,
}


const ReadCompleteAddress = ({ text, maxChar }: ReadCompleteAddressProps) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const shortText = text.slice(0, maxChar)
    // const remainingText = text.slice(maxChar)

    const toggleButton = () => {
        setIsExpanded(!isExpanded)
    }
    return (
        <p className="font-semibold">
            {isExpanded ? text : shortText}
            {
                text.length > maxChar && (
                    <button onClick={toggleButton} className="text-xs text-gray-600 hover:text-cyan-500 pl-2">
                        {
                            isExpanded ? "Read Less" : `. . . Read More`
                        }
                    </button>
                )
            }
             {/* {isExpanded && text.length > maxChar && <p>{remainingText}</p>} */}
        </p>
    )
}

export default ReadCompleteAddress