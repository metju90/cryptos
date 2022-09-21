import styled from "styled-components";

const FiltersWrapper = styled.div`
  width: 100%;
  margin: 10px;
  div {
    margin: 5px;
    display: flex;
    justify-content: space-between;
    @media only screen and (min-width: 768px) {
      justify-content: center;
    }
  }
`;

const ButtonWrapper = styled.div`
  width: 120px;
  padding: 20px;
  display: flex;
  justify-content: center;
`;

const Button = styled.div`
  display: flex;
  color: ${({ isInactive }) => (isInactive ? "#b4b4b4" : "inherit")};
  span {
    cursor: pointer;
    padding: 10px;
    svg {
      margin-right: 5px;
    }
  }
  @media only screen and (min-width: 768px) {
    width: 250px;
  }
`;

export { FiltersWrapper, Button, ButtonWrapper };
