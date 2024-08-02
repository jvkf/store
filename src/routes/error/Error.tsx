import styled from 'styled-components';

const CenterDiv = styled.div`
  display: grid;
  place-items: center;
`;

export default function Error() {
  return <CenterDiv>Algo deu errado. Esta página não existe 👋🏼</CenterDiv>;
}
