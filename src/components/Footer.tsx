import styled from 'styled-components';

const StyledFooter = styled.footer`
  background: ${(props) => props.theme.colors.light};
  border-top: 1px solid ${(props) => props.theme.colors.black};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
`;

const StyledLink = styled.a`
  font-size: inherit;
  font-weight: 700;
  color: transparent;
  background-clip: text;
  background-image: linear-gradient(
    to right,
    rebeccapurple,
    hotpink,
    midnightblue
  );
`;

export default function Footer() {
  return (
    <StyledFooter>
      Desenvolvido por&nbsp;
      <StyledLink href="https://github.com/jvkf" target="_blank">
        jota
      </StyledLink>
    </StyledFooter>
  );
}
