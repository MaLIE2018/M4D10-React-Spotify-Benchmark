import FastAverageColor from 'fast-average-color';
import imageToBase64 from 'image-to-base64/browser'
import getAverageColor from 'get-average-color'
//Get unique albums in a query search and artist fetch
export const uniqueAlbums = (data) => {
    let uniqueAlbums = [];
    data.forEach((song) => {
        let i = uniqueAlbums.findIndex((x) => {
            return x.id === song.album.id
        })
        if (i <= -1) {
            uniqueAlbums.push({ id: song.album.id, cover: song.album.cover_medium, title: song.album.title, name: song.artist.name, artistid: song.artist.id })
        }
    })
    return uniqueAlbums
}

//Return Tracks
export const getTracks = (data) => {
    let tracks = [];
    data.forEach((song) => {
        tracks.push({
            artist: { name: song.artist.name, id: song.artist.id },
            preview: song.preview,
            title: song.title,
            duration: song.duration,
            id:song.id,
            albumId: song.album.id,
            trackListURL: song.album.tracklist
        })
    })
    
    return tracks
}

export const getTrackTime = (duration) => {
        let hours = duration / 3600
        let min = duration 
}



export const getColor = async(image) => {
  try {
    const color = await getAverageColor(image.src)
    return color
  } catch (error) {
    console.log(error)
  }
}

