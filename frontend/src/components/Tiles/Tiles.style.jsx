import styled from "styled-components";

const Tile = styled.div`
  display: inline-block;
  background: #fff;
  color: black;
  border-radius: 40px;
  padding: 8px;
  margin: 10px;
  width: 300px;

  @media only screen and (min-width: 768px) {
    width: 350px;
  }
`;

const Name = styled.div`
  font-weight: 800;
`;
const Code = styled.div`
  color: #7f7f7f;
`;

export { Tile, Name, Code };
