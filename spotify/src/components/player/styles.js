import styled, {keyframes }from "styled-components";

const wSlideInBottom = keyframes`
  0% {
    -webkit-transform: translateY(1000px);
    transform: translateY(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
`
const slideInBottom = keyframes`
  0% {
    -webkit-transform: translateY(1000px);
    transform: translateY(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
`
const wSlideOutBottom = keyframes`
   0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(1000px);
    transform: translateY(1000px);
    opacity: 0;
  }
`
const slideOutBottom = keyframes`
   0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(1000px);
    transform: translateY(1000px);
    opacity: 0;
  }
`

 const ModalLayer = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    opacity: 0;
    z-index: 9;
    background-image: linear-gradient(rgba(176, 0, 56, 1), rgb(0, 0, 0) 85%);

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

    .controls{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 1rem
    }
    .img-container{
      display: flex;
      justify-content:center;
      margin: 36px 0px;
    }
    .player-header{
      display: flex;
      justify-content: center;
      margin: 1rem 1rem;
      align-items: center
    }
    .controls-footer{
      display: flex;
      margin: 0 1rem;
      justify-content: flex-end
    }
`

const Image = styled.img`
  margin-bottom: 24px;
  min-width: ${props => props.isMobile? "65%": "90%"};
  margin: 1rem 1rem
`

const NowPlayerView = styled.div`

`

const PlayerHeader = styled.div`
  margin: 1rem 1rem;
`

const ProgressBar = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  progress{
    appearance: none;
    height: 4px;
    width: 100%;
    &::-moz-progress-bar { background-color: ${props => props.theme.w}; };
    &::-moz-progress-value { background-color: ${props => props.theme.w}; };
    &::-webkit-progress-value { background-color: ${props => props.theme.w}; };
    &::-webkit-progress-bar { background-color: ${props => props.theme.qc}; };
  }
  .duration{
    display: flex;
    justify-content: space-between;
  }
  span{
    font-size: 0.8rem
  }
`

 const Styles = {
  ModalLayer,
  Image,
  NowPlayerView,
  PlayerHeader,
  ProgressBar, 
  wSlideInBottom,
  slideInBottom,
  wSlideOutBottom,
  slideOutBottom
}

export default Styles