import { BrowserRouter, Routes, Route} from 'react-router-dom';
import {Landing,Error,Register,ProtectedRoute} from './pages'
import {Addjob,Alljobs,Profile,SharedLayout,Stats} from './pages/dashboard'

export const endPoint='http://localhost:8082/api/v1'
function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<ProtectedRoute>
      <SharedLayout/>
    </ProtectedRoute>}>
      <Route index element={<Stats/>}/>
      <Route path='alljobs' element={<Alljobs/>}/>
      <Route path='addjob' element={<Addjob/>}/>
      <Route path='profile' element={<Profile/>}/>
    </Route>
    <Route path='/register' element={<Register/>}/>
    <Route path='/landing' element={<Landing/>}/>
    <Route path='*' element={<Error/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
