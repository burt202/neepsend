import * as React from "react"
import {HashRouter, Routes, Route} from "react-router-dom"

import Backend from "./pages/backend"
import Public from "./pages/public"

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Public />} />
        <Route path="/backend" element={<Backend />} />
      </Routes>
    </HashRouter>
  )
}
