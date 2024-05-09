import { Route, Routes } from "react-router-dom"
import HomeHeader from "./components/home/HomeHeader"
import PublicOutlet from "./outlets/PublicOutlet"


function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<PublicOutlet />}>
          <Route index element={<HomeHeader />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
