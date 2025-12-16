async function loadMovieDetails() {
    try {
        // 1. Extrair o slug da URL
        const params = new URLSearchParams(window.location.search);
        const slug = params.get("slug");

        // Se o usuário tentar acessar "filme/" sem slug, manda para 404
        if (!slug) {
            console.warn("Nenhum slug fornecido.");
            window.location.href = "/404.html";
            return;
        }

        console.log("Buscando filme:", slug);

        // 2. Buscar o filme na API
        const url = `http://localhost:3000/movies/?slug=${slug}`;
        const response = await fetch(url);

        // Verifica erro de protocolo HTTP (ex: servidor fora do ar)
        if (!response.ok) {
            throw new Error("Erro na resposta da API");
        }

        const movies = await response.json();

        // 3. Verificação de Filme Não Encontrado (404)
        // O json-server retorna um array vazio [] quando não acha o slug,
        // por isso verificamos o length.
        if (!movies || movies.length === 0) {
            console.warn("Filme não encontrado no banco de dados.");
            window.location.href = "/404.html";
            return;
        }

        const movie = movies[0];
        console.log("Dados carregados:", movie);

        // 4. Atualizar o Título da Aba do Navegador
        const pageTitle = document.querySelector("#film-page-title");
        if (pageTitle) {
            pageTitle.textContent = `Site do Boba | ${movie.surname}`;
        }

        // 5. Renderizar o Conteúdo usando o Template
        const template = document.querySelector("#movie-template");
        const container = document.querySelector("#movie-container");
        
        // Limpa o container antes de adicionar (boa prática)
        container.innerHTML = ""; 
        
        const clone = template.content.cloneNode(true);

        // --- Campos Básicos ---
        clone.querySelector('.movie-cover').src = `/${movie.cover}`;
        clone.querySelector('.movie-cover').alt = `Capa do filme ${movie.title}`;
        clone.querySelector('.movie-title').textContent = movie.title;
        clone.querySelector('.movie-original-title').textContent = movie.originalTitle;
        clone.querySelector('.movie-synopsis').textContent = movie.synopsis;
        clone.querySelector('.movie-duration').textContent = movie.duration;
        clone.querySelector('.movie-release-date').textContent = movie.releaseDate;

        // --- Listas (Arrays) ---
        // Junta os itens com vírgula ou ponto separador
        clone.querySelector('.movie-cast').textContent = movie.cast.join(", ");
        clone.querySelector('.movie-directors').textContent = movie.directors.join(", ");
        clone.querySelector('.movie-genres').textContent = movie.genres.join(" • ");

        // --- Classificação Indicativa ---
        // Verifica se é array (ex: ["Violência"]) ou string ("Livre")
        const ratingElement = clone.querySelector('.movie-content-rating');
        if (Array.isArray(movie.contentRating)) {
            ratingElement.textContent = movie.contentRating.join(", ") || "Livre";
        } else {
            ratingElement.textContent = movie.contentRating;
        }

        // --- Galeria de Imagens ---
        const galleryContainer = clone.querySelector('.movie-gallery');

        if (movie.gallery && movie.gallery.length > 0) {
            movie.gallery.forEach((imageUrl) => {
                // Cria o wrapper da imagem com estilos Tailwind
                const imgWrapper = document.createElement('div');
                imgWrapper.className = "overflow-hidden rounded-lg shadow-md border border-beskar-silver/10 group cursor-pointer h-48 relative";
                
                // Cria a imagem
                const img = document.createElement('img');
                img.src = imageUrl;
                img.alt = `Cena de ${movie.title}`;
                img.className = "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110";
                
                // Adiciona ao DOM
                imgWrapper.appendChild(img);
                galleryContainer.appendChild(imgWrapper);
            });
        } else {
            // Mensagem caso não haja galeria
            galleryContainer.innerHTML = `
                <div class="col-span-full text-center py-8 border border-dashed border-beskar-silver/20 rounded-lg">
                    <p class="text-beskar-silver/60 italic font-exo2">Nenhum registro visual encontrado nos arquivos.</p>
                </div>
            `;
        }

        // Adiciona o clone preenchido à página
        container.appendChild(clone);

    } catch (error) {
        console.error("Erro crítico ao carregar detalhes do filme:", error);
        // Em caso de erro de rede ou falha grave, também redireciona
        window.location.href = "/404.html";
    }
}

// Executa a função
loadMovieDetails();