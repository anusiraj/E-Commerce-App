import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LoadingtoRedirect = () => {
    const[count, setCount] = useState(5)
    const navigate = useNavigate()
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => currentCount - 1)

        },1000)
        count === 0 && navigate('/auth')
        return () => clearInterval(interval)
    }, [count, navigate])
  return (
    <div><h3>Redirecting you in {count}sec</h3></div>
  )
}
export default LoadingtoRedirect
 