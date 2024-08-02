import styled from 'styled-components';

export const StyledForm = styled.form`
  padding: ${(props) => props.theme.spacing.xlarge};
  margin-top: auto;
  background-color: ${(props) => props.theme.colors.light};
  border-top: 1px solid black;
`;

export const FormContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr) 10ch repeat(3, 1fr);
  margin-bottom: ${(props) => props.theme.spacing.medium};
  gap: ${(props) =>
    `${props.theme.spacing.medium} ${props.theme.spacing.xlarge}`};
  width: 100%;

  @media screen and (max-width: 900px) {
    & {
      grid-template-columns: 10ch repeat(3, 1fr);
    }
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 20px;
  grid-column: span 4;

  & > input[aria-invalid='true'] {
    border-color: red;
  }
  & > input[aria-invalid='false'].touched {
    border-color: green;
  }

  &.cvv-container {
    grid-column: span 1;
  }
  &.date-container {
    grid-column: span 3;
  }
`;

export const SubmitBtn = styled.button`
  margin: 0 auto;
  width: fit-content;
  display: block;
  appearance: none;
  cursor: pointer;
  color: white;
  background-color: ${(props) => props.theme.colors.main};
  padding: ${(props) => props.theme.spacing.small};
  border: 1px solid ${(props) => props.theme.colors.main};
  transition: all 300ms ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
    border-color: ${(props) => props.theme.colors.secondary};
  }
`;
