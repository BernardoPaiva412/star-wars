// fetch movies
const url = "http://localhost:3000/movies"
const response = await fetch(url)
const movies = await response.json()
console.log("Filmes carregados:", movies)

// render movies
const container = document.querySelector("#movies-container");
const template = document.querySelector("#movie-template");

movies.forEach((movie) => {
    const clone = template.content.cloneNode(true)
    
    // Seletores
    const card = clone.querySelector(".movie-card")
    const sceneBg = clone.querySelector(".scene-bg")
    const link = clone.querySelector(".movie-link")
    
    // Preenchimento de Dados
    clone.querySelector(".movie-title").textContent = movie.title
    clone.querySelector(".movie-release-date").textContent = movie.releaseDate
    clone.querySelector(".movie-cover").src = movie.cover
    clone.querySelector(".movie-cover").alt = `Pôster de ${movie.title}`
    
    // O link cobre o card inteiro (poster layer), então definimos o href nele
    link.href = `filme/?slug=${movie.slug}`
    
    // Tornar o card inteiro clicável para quando estiver no modo hover (info layer)
    card.addEventListener('click', (e) => {
        // Se clicar no card (fora do link do poster), navega também
        window.location.href = `filme/?slug=${movie.slug}`;
    });

    // --- Lógica do Carrossel de Cenas ---
    let carouselInterval;
    let imageIndex = 0;

    // Função auxiliar para definir o background
    const setBackground = (index) => {
        if (movie.gallery && movie.gallery.length > 0) {
            const imgUrl = movie.gallery[index % movie.gallery.length];
            sceneBg.style.backgroundImage = `url('${imgUrl}')`;
        }
    };

    // Evento: Mouse Entra (Hover)
    card.addEventListener('mouseenter', () => {
        // 1. Define imediatamente a primeira imagem para não ficar vazio
        imageIndex = 0;
        setBackground(imageIndex);

        // 2. Inicia o loop apenas se houver mais de 1 imagem
        if (movie.gallery && movie.gallery.length > 1) {
            // Limpa intervalo anterior por segurança
            clearInterval(carouselInterval);
            
            carouselInterval = setInterval(() => {
                imageIndex++;
                setBackground(imageIndex);
            }, 2500); // Troca a cada 2.5 segundos (um pouco mais lento para apreciar)
        }
    });

    // Evento: Mouse Sai
    card.addEventListener('mouseleave', () => {
        clearInterval(carouselInterval);
        // Não precisamos limpar o background, pois o poster vai cobrir tudo de novo
    });

    container.appendChild(clone)
})