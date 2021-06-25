export const retrieveData = (url) => {
    return new Promise((resolve) => {
        fetch(
                url, {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-key': 'e88938dcfcmsh276f73df3fb1e5ep1a09e1jsn71c6fe23b716',
                        'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
                    },
                }
            )
            .then((resp) => resp.json())
            .then((data) => {                
                resolve(data)
            })
            .catch((err) => console.log(err.message, err)) // could show an alert! that is smart
            .finally(() => { console.log("Stuff is loaded!"); }) // could set display:none for loader {spinner}
    })
}