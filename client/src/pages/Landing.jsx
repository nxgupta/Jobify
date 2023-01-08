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
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum quidem assumenda molestias veritatis sint fuga itaque quae, quos commodi recusandae hic omnis amet et. Vel laborum atque.</p>
          <Link to='/register' className="btn btn-hero">Login/Register</Link>
        </div>
        <img src={main} alt='landing-image' className="img main-img"/>
      </div>
    </Wrapper>
  )
}


export default Landing
