let audio = ''

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
            trackListURL: song.album.tracklist
        })
    })
    
    return tracks
}

export function playMusic(event, url) {
    if (event.currentTarget.children[0].classList.contains("d-none")) { //stopbutton [0]
        if (event.currentTarget.children[1].classList.contains("played")) {
            audio.play()
        } else {
            audio = new Audio(url)
            audio.play()
        }
        event.currentTarget.children[1].classList.add("d-none")
        event.currentTarget.children[1].classList.add("played") // playbutton[]
        event.currentTarget.children[0].classList.remove("d-none")
    } else {
        audio.pause()
        event.currentTarget.children[1].classList.remove("d-none")
        event.currentTarget.children[0].classList.add("d-none")
    }
    // 
}