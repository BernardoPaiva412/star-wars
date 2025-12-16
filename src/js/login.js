document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Simulação de delay de processamento
    const btn = this.querySelector('button');
    const originalText = btn.innerText;
    btn.innerText = "AUTENTICANDO...";
    btn.classList.add('opacity-70', 'cursor-not-allowed');

    setTimeout(() => {
        // CAMINHO RELATIVO: Funciona independente da porta (3000 ou 5500)
        // Sobe um nível (../) e entra na pasta admin
        window.location.href = "../admin/index.html";
    }, 800);
});