import styled from "styled-components";


export const NowPlayer = styled.div`
  bottom: 52.3px;
  right:0;
  left:0;
  visibility: ${(props) => (!props.isMobile ? "hidden" : "visible")};
  position: fixed;
  padding-left: .8rem;
  padding-right: .8rem;
  width: 100%;
  z-index:6;
  box-sizing: border-box;
  border-top: 1px solid ${props => props.theme.tc};
  background: ${props => props.theme.pc};
  display: flex;
  justify-content:space-between;
  align-items:center;
  a{
    text-decoration: none
  }
`

export const Title = styled.span`
    color: ${props => props.theme.w};
    font-weight: bold

`
export const Artist = styled.span`
    color: ${props => props.theme.ts};
    font-weight: bold
`

export const ProgressBar = styled.progress`
  top: -0.2rem;
  left: 0;
  height: 0.1rem;
  position: absolute;
  /* color: ${props => props.theme.qc}; */
  appearance: none;
  width: 100%;
  ::-moz-progress-bar { background-color: ${props => props.theme.w}; };
  ::-moz-progress-value { background-color: ${props => props.theme.w}; };
  ::-webkit-progress-value { background-color: ${props => props.theme.w}; };
  ::-webkit-progress-bar { background-color: ${props => props.theme.qc}; };
`
