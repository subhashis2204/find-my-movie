const form = document.querySelector('form');
const container = document.querySelector('#container');

const link = 'https://api.tvmaze.com/search/shows?q='


const errorline = () => {
    const h1 = document.createElement('h1')
    h1.innerHTML = 'Sorry! &#128532; No movies found....'
    h1.style.fontWeight = '400'
    container.append(h1)
}

const displayimage = (results) => {
    if (results.length == 0)
        errorline();
    else {
        for (let result of results) {
            if (result.show.image != null) {
                const img = document.createElement('img');
                img.src = result.show.image.medium;
                img.style.margin = '10px'
                container.append(img);
            }
        }
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    container.innerHTML = ''
    const query = form.elements.search.value;
    const config = { params: { q: query } }
    try {
        const res = await axios.get(`https://api.tvmaze.com/search/shows`, config)
        displayimage(res.data)
    }
    catch (e) {
        errorline();
    }
    form.elements.search.value = ''
});
