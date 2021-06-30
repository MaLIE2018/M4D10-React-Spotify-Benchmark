import styled from "styled-components"


export const List = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-between;
  padding: 0 20px 0;
  margin: .3rem 1rem;
  li{
    display:flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    color: ${props => props.theme.sc};
    font-size: 0.7rem
  }
`

export const Header = styled.header`
  bottom:0;
  position: fixed;
  width: 100%;
  z-index:5;
  border-top: 1px solid ${props => props.theme.tc};
  background: ${props => props.theme.pc}
`

export const TopHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  padding-top: 1.0rem;
  padding: 1rem 1rem;
  box-sizing: border-box;
  background:  ${props => !props.inView?"transparent": props.theme.tc};
  width: 100%;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  button{
    background-color: ${props => props.theme.buttonFollow};
    color: ${props => props.theme.buttonFcolor};
    letter-spacing: 0.05rem;
    margin-left: auto;
    margin-right: 0.6rem;
    font-size: 0.6rem;
    font-weight:bold
  }
`


