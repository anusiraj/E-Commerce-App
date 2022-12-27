import { AsyncThunkAction, Dispatch, AnyAction } from '@reduxjs/toolkit'
import { Product } from './types/Product'
import Home from './components/homeComponent'
import './Style.css';

const App = () => {
  return (
    <div>
      <Home/>
    </div>
  )
}

export default App

function dispatch(arg0: AsyncThunkAction<Product[] | Error | undefined, void, { state?: unknown; dispatch?: Dispatch<AnyAction> | undefined; extra?: unknown; rejectValue?: unknown; serializedErrorType?: unknown; pendingMeta?: unknown; fulfilledMeta?: unknown; rejectedMeta?: unknown }>) {
  throw new Error('Function not implemented.')
}
