import styled from "@emotion/styled";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 400px;
  font-size: 20px;

  input {
    font-size: 20px;
    padding: 5px 15px;
    outline: none;
    border: none;
    box-shadow: 0px 0px 2px 1px;
    border-radius: 15px;
  }

  button {
    font-size: 20px;
    padding: 5px 15px;
    border: none;
    box-shadow: 0px 0px 2px 1px;
    border-radius: 15px;
  }
`;
