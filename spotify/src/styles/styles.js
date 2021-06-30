import styled from "styled-components";

export const Button = styled.button`
      border: 0;
      border-radius: 5px;
      padding: .2rem 0.8rem;
`

export const H1 = styled.h1`
    font-size: 32px;
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 36px;
`

export const H3 = styled.h3`
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 27px;
`

export const TopNavTitle = styled.span`
    transition: 0.2s linear;
    flex: 1 1 0%;
    opacity: 1;
    overflow: hidden;
    padding: 0px 12px;
    text-overflow: ellipsis;
    text-align: center;
    white-space: nowrap;
    font-weight: bold;
`

export const SubTitle = styled.p`
    font-weight: 300;
    letter-spacing: normal;
    line-height: 20px;
    text-transform: none;
    color: rgba(255, 255, 255, 0.7);
    text-align: center;

`
export const Info = styled.span`
  color: ${props => props.theme.sc};
  font-size: 0.8rem;
  font-weight: 400;
  text-align: center;
`