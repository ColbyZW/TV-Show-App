const form = document.querySelector('#searchForm')
let imagesPresent = false;
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearImages()
    toggleImageHolder();
    const search = await grabImages()
    populateImages(search);
    toggleImageHolder();
    form.elements.query.value = '';
})

const toggleImageHolder = () => {
    if (imagesPresent) {
        document.querySelector(".images").style.display = "block";
    } else {
        document.querySelector(".images").style.display = "none";
    }
}

const clearImages = () => {
    if (imagesPresent === true) {
        const images = document.querySelectorAll('#image')
        for (let pics of images) {
            pics.remove();
        }
        imagesPresent = false;
    }
}

const grabImages = async () => {
    const userInput = form.elements.query.value;
    try {
        const searchTerm = form.elements.query.value;
        const config = { params: { q: searchTerm } };
        const search = await axios.get(`https://api.tvmaze.com/search/shows`, config);
        return search.data
    } catch (e) {
        console.log("Unable to grab images", e);
    }
}

const populateImages = (shows) => {
    if (shows.length == 0) {
        document.querySelector(".images").style.display = "none";
        console.log("No images grabbed");
        document.querySelector(".error").style.display = "block";
        imagesPresent = false;
    }
    for (let result of shows) {
        document.querySelector(".error").style.display = "none";
        if (result.show.image) {
            const img = document.createElement('IMG')
            img.setAttribute('id', 'image');
            img.src = result.show.image.medium
            // document.body.append(img)
            document.querySelector(".images").append(img);
        }
        imagesPresent = true;
    }

}