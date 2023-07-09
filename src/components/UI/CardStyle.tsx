import styled from "@emotion/styled";

export const CardDiv = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 2px 0px;
  over-flow: hidden;
  border-radius: 15px;
  padding: 10px;
  gap: 5px;
  -ms-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;

  .card_div-img {
    border-radius: 15px;
    width: 100%;
    height: 280px;
    overflow: hidden;
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 15px;
    transition: all 0.3s ease-in-out;
  }
  img:hover {
    scale: 1.1;
  }

  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 5px;
    width: 100%;
    text-align: center;
  }
  p:fist-child {
    font-weight: 500;
  }
`;

export const CardBask = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 3px 0px;
  border-radius: 15px;
  padding: 10px;
  gap: 5px;
  -ms-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  overflow: hidden;

  img {
    width: 100%;
    border-radius: 15px;
    transition: all 0.3s ease-in-out;
  }
  img:hover {
    scale: 1.01;
  }

  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 5px;
    width: 100%;
    text-align: center;
  }
`;
