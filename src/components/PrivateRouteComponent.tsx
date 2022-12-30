import { useSelector } from "react-redux"
import { selectAuth } from '../redux/reducer/authReducer'

import LoadingtoRedirect from './LoadingtoRedirectComponent'
const PrivateRoute = ({children}:{children:JSX.Element|JSX.Element[]}) => {
    const {token} = useSelector(selectAuth)
  return (
  <> {
    token ? [children] : <LoadingtoRedirect />
  } 
  </>
  )
}

export default PrivateRoute