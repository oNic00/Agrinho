document.addEventListener('DOMContentLoaded', () => {
    
    // === 1. CONTADOR ANIMADO DE IMPACTO ===
    const contadores = document.querySelectorAll('.contador');
    const velocidade = 200; // Quanto maior, mais lenta a animação

    const animarContadores = () => {
        contadores.forEach(contador => {
            const atualizarContagem = () => {
                const alvo = +contador.getAttribute('data-alvo');
                const contagemAtual = +contador.innerText;
                const incremento = alvo / velocidade;

                if (contagemAtual < alvo) {
                    contador.innerText = Math.ceil(contagemAtual + incremento);
                    setTimeout(atualizarContagem, 1);
                } else {
                    contador.innerText = alvo + "+"; // Adiciona o sinal de + no final
                }
            };
            atualizarContagem();
        });
    };

    // Disparar o contador quando a seção estiver visível na tela
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animarContadores();
                observer.unobserve(entry.target); // Roda a animação apenas uma vez
            }
        });
    }, { threshold: 0.5 });

    const secaoImpacto = document.querySelector('#impacto');
    if (secaoImpacto) {
        observer.observe(secaoImpacto);
    }


    // === 2. ENVIO DO FORMULÁRIO COM VALIDAÇÃO VISUAL ===
    const formulario = document.querySelector('form');
    
    if (formulario) {
        formulario.addEventListener('submit', (e) => {
            e.preventDefault();

            const nome = document.getElementById('nome').value;
            const botao = formulario.querySelector('button');

            // Feedback visual de envio
            botao.disabled = true;
            botao.style.background = '#777';
            botao.innerText = 'Enviando...';

            // Simula o envio para o servidor
            setTimeout(() => {
                // Alerta personalizado limpando o formulário
                alert(`Olá, ${nome}! Suas informações foram recebidas pela equipe Agroforte. Entraremos em contato!`);
                
                formulario.reset();
                botao.disabled = false;
                botao.style.background = '#2d6a4f';
                botao.innerText = 'Enviar';
            }, 1800);
        });
    }

    // === 3. SUAVIZAÇÃO DOS LINKS INTERNOS ===
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const idAlvo = this.getAttribute('href');
            document.querySelector(idAlvo).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
