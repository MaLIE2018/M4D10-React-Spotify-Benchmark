import styled from "styled-components";
import styles from "../player/styles"

const {wSlideOutBottom, slideOutBottom,slideInBottom, wSlideInBottom} = styles

const MenuContainer = styled.div`
     display: flex;
    flex-direction: column;
    position: fixed;
    padding-top: 88px;
    inset: 0px;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.85);
    &.slide-out-bottom {
      -webkit-animation: ${wSlideOutBottom} 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53)
        both;
      animation: ${slideOutBottom} 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
    }

    &.slide-in-bottom {
      -webkit-animation: ${wSlideInBottom} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
        both;
      animation: ${slideInBottom} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    }
    .header{
      display: flex;
      flex-direction:row;
      padding-left: 1rem;
      align-items:center;
    }
    a{
      text-decoration: none;
      color: inherit;
    }
    button{
      position: absolute;
      bottom:0;
      background-color: transparent;
      align-self:center;
      color: inherit;
      border: 0;
      padding: 1.6rem;
      font-weight: 400;
      font-size:1rem
    }
`

const List = styled.ul`
    list-style-type: none;
    padding-left: 1rem;
    a{
      span{
        margin-left:1rem
      }
    }
    li{
      line-height:4rem;
      display:flex;
      align-items: center;
    }
`


const Styles = {
    MenuContainer,
    List
}

export default Styles