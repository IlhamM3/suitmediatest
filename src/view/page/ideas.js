import axios from "axios";

const ideas = {
    async render() {
        return `
            <div class="imgherosection">
                <img src="./img/hero.jpg" alt="Hero Image">
            </div>
            <div class="textherosection">
                <h4>Ideas</h4>
                <p>Where all our great things begin</p>
            </div>
            <section class="ideascontent">
                <div id="divfilter" class="divfilter">
                    <div class="showpage">
                        <p>Showing <p id="showingpage"></p> of 100</p>
                    </div>
                    
                    <div class="filter">
                        <div class="buttonfilter">Show per page 
                            <select id="pagesize">
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                            </select>
                        </div>
                        <div class="buttonfilter">Short by: 
                            <select id="sorting">
                                <option value="-published_at">newest</option>
                                <option value="published_at">oldest</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div id="containercard" class="containercard">
                    <img id="loading" class="loading" src="./svg/loading.svg"></img>
                </div>
            </section>
        `;
    },

    async afterRender() {
        const pagesize = document.getElementById('pagesize');
        const sorting = document.getElementById('sorting');
        const showingpage = document.getElementById('showingpage');
        let pagesizes = localStorage.getItem('pagesize') || '10';
        let sortings = localStorage.getItem('sorting') || '-published_at';

        cekshowingpage();
        pagesize.value = pagesizes;
        sorting.value = sortings;

        fetchData();

        pagesize.addEventListener("change", () => {
            pagesizes = pagesize.value;
            localStorage.setItem('pagesize', pagesizes);
            cekshowingpage();
            fetchData();
            location.reload();
        });

        sorting.addEventListener("change", () => {
            sortings = sorting.value;
            localStorage.setItem('sorting', sortings);
            cekshowingpage();
            fetchData();
            location.reload();
        });

        function fetchData() {
            const BaseUrl = 'https://suitmedia-backend.suitdev.com/api';

            axios.get(`${BaseUrl}/ideas`, {
                params: {
                    'page[number]': 1,
                    'page[size]': pagesizes,
                    append: ['medium_image'],
                    sort: sortings,
                },
            })
                .then(response => {
                    const loading = document.getElementById('loading');
                    loading.style.display = 'none';

                    displayData(response.data.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
        function cekshowingpage(){
            if (pagesizes === '10') {
                showingpage.innerHTML = `1-10`;
            } else if (pagesizes === '20') {
                showingpage.innerHTML = `1-20`;
            } else if (pagesizes === '50') {
                showingpage.innerHTML = `1-50`;
            }
        }
        function displayData(data) {
            const containercard = document.getElementById('containercard');
            containercard.innerHTML = '';

            data.forEach(({ id, title, published_at, medium_image }) => {
                const formattanggal = new Date(published_at);
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                const longtanggal = formattanggal.toLocaleDateString('id-ID', options);
                const urlimg = medium_image.length > 0 ? medium_image[0].url : '';

                containercard.innerHTML += createCard({ id, img: urlimg, tanggal: longtanggal, title });
            });
        }

        function createCard({ id, img, tanggal, title }) {
            return `
                <div class="card" id="${id}">
                    <img src="${img}" alt="Photo card" loading="lazy">
                    <div class="informasicard">
                        <p class="tanggal">${tanggal}</p>
                        <h4 class="title">${title}</h4>
                    </div>
                </div>
            `;
        }
    },
};

export default ideas;
