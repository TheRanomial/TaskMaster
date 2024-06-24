import styled from "styled-components";

function Spinner() {
  return <div></div>;
}

const StyledSpinner=styled.div`

    margin: 3.2rem auto 1.6rem;
    width: 60px;
    aspect-ratio: 1;
    border-radius: 50%;
    border: 8px solid theme('colors.primary.900');
    border-right-color: theme('colors.primary.200');
    animation: rotate 1s infinite linear;
`

export default Spinner;
