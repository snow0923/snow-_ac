// 存入api網址
const BASC_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASC_URL + '/api/v1/movies/'
const POSTERS_URL = BASC_URL + '/posters/'
const dataPanel = document.querySelector('#data-panel')
// 清單寫入html
function renderMoiveList(data) {
    let rendHtml = ''
    console.log(dataPanel)
    data.forEach(item => {
        rendHtml += `
        <div class="col-sm-3">
        <div class="mb-2">
          <div class="card">
            <img
              src="${POSTERS_URL + item.image}"
              class="card-img-top" alt="Movie Poster" />
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
            </div>
            <div class="card-footer">
                <!-- data-bs-toggle="modal" data-bs-target="#movie-modal" 另開小視窗 -->
              <button class="btn btn-primary btn-show-movie" data-bs-toggle="modal" data-bs-target="#movie-modal" data-id="${item.id}">
                More
              </button>
              <button class="btn btn-info btn-add-favorite">+</button>
            </div>
          </div>
        </div>
      </div>
        `
    });
    dataPanel.innerHTML = rendHtml
}
function showMovieModal(id) {
    const modalTitle = document.querySelector('#movie-modal-title')
    const modalImage = document.querySelector('#movie-modal-image')
    const modalDate = document.querySelector('#movie-model-date')
    const modalDirector = document.querySelector('#movie-model-director')
    // 呼叫api
    axios.get(INDEX_URL + id).then((Response) => {
        console.log(Response.data.dataset)
        let data=Response.data.results
        modalTitle.innerText = data.title
        modalDate.innerText = 'Release date: ' + data.release_date
        modalDirector.innerText = data.description
        modalImage.innerHTML = `<img src="${POSTERS_URL + data.image
        }" alt="movie-poster" class="img-fluid">`
    })
}
// 電影祥細內容
dataPanel.addEventListener('click', function onPanelClicked(event) {
    if (event.target.matches('.btn-show-movie')) {
        showMovieModal(Number(event.target.dataset.id))
    }
})
// 呼叫api
let movies = []
axios.get(INDEX_URL).then((Response) => {
    movies.push(...Response.data.results)
    renderMoiveList(movies)
    console.log(movies)
})