import styled from "@emotion/styled";

export const CardDiv = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;

  over-flow: hidden;
  border-radius: 15px;
  padding: 10px;
  gap: 5px;
  -ms-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;

  .card_div-img {
    transition: all 0.3s ease-in-out;
    border-radius: 10px;
    width: 100%;
    height: 280px;
    overflow: hidden;
    box-shadow: 0px 0px 5px 1px rgb(211, 211, 211), 0px 0px 10px 0px;
    margin-bottom: 10px;
  }

  .card_div-img:hover {
    box-shadow: 0px 0px 3px 0px rgb(211, 211, 211), 0px 0px 15px 5px;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
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
  .p-name {
    font-weight: 700;
  }
  .p-price {
    padding: 5px 10px;

    font-family: san-serif;
    font-size: 20px;
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
