import { Logo } from "../components"
import main from "../assets/images/main.svg"
import Wrapper from "../assets/wrappers/LandingPage"
import { Link } from "react-router-dom"
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo/>
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job<span> Tracking </span>App
          </h1>
          <p>No more messy job search spreadsheets. Jobify keeps track of every detail about your job opportunities regardless of where you found them</p>
          <Link to='/register' className="btn btn-hero">Login/Register</Link>
        </div>
        <img src={main} alt='landing-image' className="img main-img"/>
      </div>
    </Wrapper>
  )
}


export default Landing
