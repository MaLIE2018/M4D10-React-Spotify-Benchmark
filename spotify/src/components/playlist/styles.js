import styled from "styled-components";

export const TrackRowContainer = styled.div`
  display: flex;
  flex-direction:row;
  align-items:center;
  justify-content: space-between;
  margin: 1.3rem
`

export const Track = styled.div`
  display: flex;
  flex-direction:column;
  align-items:start;
  flex-grow:0;
  margin-right: auto;
  margin-left: 1rem;
  line-height: 1.5
`

export const AlbumTitle = styled.span`
  color: ${props => props.theme.sc};
  font-size: 0.8rem;
  font-weight: 400
`
export const TrackNumber = styled.span`
  color: ${props => props.theme.sc};
  font-size: 0.8rem;
  font-weight: 400
`

export const StickyHeader = styled.div`
    /* height: 100%; */
    min-height: 300px;
    position: sticky;
    top: 0px;
    overflow: hidden;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    h1{
      margin: 0 auto
    }    
`
export const EntityHeader = styled.div`
    padding: 64px 16px 0px;
    background: linear-gradient(rgb(32, 80, 96) 0%, transparent 100%);
    display: flex;
    flex-direction: column;
    width: 100%;
`

export const Image = styled.img`
   margin: 0 auto;
   margin-bottom: 24px;
`

export const EntityView = styled.div`
    background-image: linear-gradient(transparent, rgb(18, 18, 18) 42px);
    display: flex;
    flex-direction: column;
    min-height: 100%;
    padding-top: 16px;
    position: relative;
    width:100%;
    button{
      border-radius: 50%;
      background-color: ${props => props.theme.spotifyC};
      width: 56px;
      height: 56px;
      top: 56px;
      z-index: 1;
      text-align: center;
      margin: 0px auto 32px;
      position: sticky;
    }
`