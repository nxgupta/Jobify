import {Link, useRouteError} from "react-router-dom"
import Wrapper from "../assets/wrappers/ErrorPage"
import notFoundImage from "../assets/images/not-found.svg"
const Error = () => {
  let error = useRouteError()
  if (error.status == 404) {
    return (
      <Wrapper>
        <div>
          <img src={notFoundImage} alt="not found" className="img" />
          <h3>Ohh! page not found</h3>
          <p>{`We can't seem to find the page you are looking for`}</p>
          <Link to="/dashboard">back home</Link>
        </div>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <div>
        <h3>Something went wrong</h3>
        <Link to="/dashboard">back home</Link>
      </div>
    </Wrapper>
  )
}

export default Error
