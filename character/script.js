const API = 'https://rickandmortyapi.com/api/'

const characters = document.getElementById('characters')
const getCharacter = document.getElementById('get-character')
const pages = document.getElementById('input-pages')
const nextPages = document.getElementById('next-pages')
const prevPages = document.getElementById('prev-pages')
const pagess = document.getElementById('pagess')
const filterStatus = document.getElementById('filter-status')
const filterSpecies = document.getElementById('filter-species')
const filterGender = document.getElementById('filter-gender')
const pagePagination = document.querySelector('.page-pagination')


const RickAndMorty = async () => {
    try {
        const req = await fetch(`
        ${API}character/?name=${getCharacter.value}
        &status=${filterStatus.value}
        &species=${filterSpecies.value}
        &gender=${filterGender.value}
        &page=${pages.value}`);
        const res = await req.json()
        console.log(res)
        nameUsers(res)
        res.info.next === null ? pagePagination.style.display = 'none' : pagePagination.style.display = 'flex'

    } catch (err) {
        console.log(err);
    }
}
RickAndMorty()

nextPages.addEventListener('click', () => {
    pages.value++
    RickAndMorty()
})
prevPages.addEventListener('click', () => {
    pages.value > 1 ? pages.value-- : null
    RickAndMorty()
})

const nameUsers = (response) => {
    characters.innerHTML = ''
    if (response?.results) {
        response?.results?.map(el => {
            const user = document.createElement('div')
            user.classList = 'user'
            user.innerHTML = `
            <img src="${el.image}"/ >
            <h2>${el.name}</h2>
            <div class="get-filters">
                <p>${el.status}</p>
                <p>${el.gender}</p>
                <p>${el.species}</p>
            </div>`;
            characters.append(user)
        })
        pagePagination.style.display = 'flex'
    } else {
        pagePagination.style.display = 'none'
        const notFound = document.createElement('p')
        notFound.classList = 'not-found'
        notFound.textContent = 'Нечего не найдено!'
        characters.append(notFound)
    }

}
nameUsers()