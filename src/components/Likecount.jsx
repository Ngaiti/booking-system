import { useState } from 'react'

export default function Likecount() {
    const [likeCount, setLikeCount] = useState(0)
    function increaseLike() {
        setLikeCount(likeCount + 1)
    }
    return (
        <>
            <button onClick={increaseLike}>  O_O {likeCount} </button>
        </>
    )
}