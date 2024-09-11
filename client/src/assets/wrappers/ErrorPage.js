import styled from "styled-components"

const Wrapper = styled.main`
  height: 100vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 90vw;
    max-width: 600px;
    margin-bottom: 2rem;
    display: block;
    margin-top: -3rem;
  }

  h3 {
    margin-bottom: 0.5rem;
  }

  p {
    line-height: 1.5;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    color: var(--text-secondary-color);
  }

  a {
    color: var(--primary-500);
    text-transform: capitalize;
    text-decoration: underline;
  }
`

export default Wrapper
