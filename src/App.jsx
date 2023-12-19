import './App.css'
import { HomePage } from './component/HomePage'
import { MyContextProvider } from './context/useContext'

function App() {

  return (
    <>
      <MyContextProvider>
        <HomePage />
      </MyContextProvider>
    </>
  )
}

export default App
