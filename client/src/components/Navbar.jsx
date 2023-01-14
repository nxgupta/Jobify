import Wrapper from '../assets/wrappers/Navbar'
import {FaAlignLeft, FaUserCircle, FaCaretDown, FaUser} from 'react-icons/fa'
import { useAppContext } from '../context/appContext'
import Logo from './Logo'
import { useState } from 'react'


const Navbar = () => {
const [showLogout,setShowLogout]=useState(false)

    let {toggleSidebar,logoutUser,user}=useAppContext()
  return (
    <Wrapper>
      <div className="nav-center">
        <button className='toggle-btn' onClick={()=>toggleSidebar()}>
            <FaAlignLeft/>
        </button>

        <div>
            <Logo/>
            <div className="logo-text">dashboard</div>
        </div>

        <div className="btn-container">
            <button type='button' className='btn' onClick={()=>setShowLogout(!showLogout)}>
                <FaUserCircle/>
                {user?.name}
                <FaCaretDown/>
            </button>
            <div className={showLogout?"dropdown show-dropdown":"dropdown"}>
                <button 
                type='button'
                className='dropdown-btn'
                onClick={()=>logoutUser()}>
                    logout
                </button>
            </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar
