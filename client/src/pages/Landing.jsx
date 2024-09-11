import {Link} from "react-router-dom"
import Wrapper from "../assets/wrappers/LandingPage"
import main from "../assets/images/main.svg"
import {Logo} from "../components"

const Landing = () => {
  return (
    <Wrapper>
      <Logo />
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>Tracking</span> App
          </h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, iure deleniti officiis incidunt exercitationem eius asperiores magnam accusamus,. Nemo, iure deleniti officiis incidunt </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  )
}
export default Landing
