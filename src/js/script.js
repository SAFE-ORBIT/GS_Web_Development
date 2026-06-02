// Garantir que o script rode apos o carregamento completo do HTML
document.addEventListener("DOMContentLoaded", () => {
    
    // --- 0. TELA DE ABERTURA (SPLASH SCREEN DE VIDEO) ---
    const telaSplash = document.getElementById("splash-screen");
    const videoSplash = document.getElementById("splash-video");
    const botaoPularSplash = document.getElementById("splash-btn-pular");

    // Funcao para ocultar o splash screen de forma suave
    function encerrarSplash() {
        if (telaSplash) {
            telaSplash.classList.add("fade-out"); // Dispara a transicao de fade-out do CSS
            
            // Pausa o video apos sumir da tela para economizar recursos de processamento
            setTimeout(() => {
                if (videoSplash) {
                    videoSplash.pause();
                }
            }, 800);
        }
    }

    // Evento de clique para pular a animacao e acessar o site imediatamente
    if (botaoPularSplash) {
        botaoPularSplash.addEventListener("click", encerrarSplash);
    }

    // Evento disparado automaticamente quando a execucao do video terminar
    if (videoSplash) {
        videoSplash.addEventListener("ended", encerrarSplash);
        
        // Garante a liberacao da tela caso o video demore para carregar ou falhe
        setTimeout(encerrarSplash, 8000); // Limite de tolerância de 8 segundos
    }

    // --- 1. SELECAO DE TEMAS (TROCA DE TEMA) ---
    // Seleciona os botoes de tema pelo ID
    const botaoTema1 = document.getElementById("tema-padrao");
    const botaoTema2 = document.getElementById("tema-cinza");
    const botaoTema3 = document.getElementById("tema-azul");

    // Funcao para mudar a classe do body, alterando as variaveis de cores no CSS
    function mudarTema(nomeTema) {
        // Remove as classes de temas anteriores
        document.body.classList.remove("tema-padrao", "tema-cinza", "tema-azul");
        // Adiciona a nova classe selecionada
        document.body.classList.add(nomeTema);
        // Salva a escolha do usuario no navegador para persistir na proxima visita
        localStorage.setItem("tema-salvo", nomeTema);
    }

    // Adiciona o evento de clique em cada botao
    if (botaoTema1) {
        botaoTema1.addEventListener("click", () => mudarTema("tema-padrao"));
    }
    if (botaoTema2) {
        botaoTema2.addEventListener("click", () => mudarTema("tema-cinza"));
    }
    if (botaoTema3) {
        botaoTema3.addEventListener("click", () => mudarTema("tema-azul"));
    }

    // Recupera o tema salvo no navegador anteriormente (se existir)
    const temaSalvo = localStorage.getItem("tema-salvo");
    if (temaSalvo) {
        mudarTema(temaSalvo);
    } else {
        // Tema padrao inicial
        mudarTema("tema-padrao");
    }


    // 2. SLIDESHOW DE IMAGENS
    // Lista com os caminhos das imagens e seus textos alternativos
    const imagensSlideshow = [
        {
            src: "./src/assets/debris_orbit.png",
            alt: "Ilustracao digital de satelites orbitando a Terra rodeados por pequenos detritos espaciais"
        },
        {
            src: "./src/assets/satellite_repair.png",
            alt: "Satelite em orbita utilizando um braco robotico com capsula de resina para auto-reparo de impactos"
        },
        {
            src: "./src/assets/space_industry.png",
            alt: "Estacao espacial futurista com paineis solares e naves na orbita terrestre"
        }
    ];

    let indiceSlideAtual = 0; // Guarda a posicao da imagem exibida atualmente (0, 1 ou 2)
    const imgElemento = document.getElementById("slideshow-img");
    const botaoAnterior = document.getElementById("slide-anterior");
    const botaoProximo = document.getElementById("slide-proximo");

    // Funcao que atualiza a imagem na tela
    function atualizarSlide() {
        if (imgElemento) {
            // Define o novo caminho e texto alternativo da imagem
            imgElemento.src = imagensSlideshow[indiceSlideAtual].src;
            imgElemento.alt = imagensSlideshow[indiceSlideAtual].alt;
        }
    }

    // Avanca para o proximo slide
    if (botaoProximo) {
        botaoProximo.addEventListener("click", () => {
            indiceSlideAtual = indiceSlideAtual + 1;
            // Se passar da ultima imagem, volta para a primeira (indice 0)
            if (indiceSlideAtual >= imagensSlideshow.length) {
                indiceSlideAtual = 0;
            }
            atualizarSlide();
        });
    }

    // Volta para o slide anterior
    if (botaoAnterior) {
        botaoAnterior.addEventListener("click", () => {
            indiceSlideAtual = indiceSlideAtual - 1;
            // Se for menor que zero, vai para a ultima imagem
            if (indiceSlideAtual < 0) {
                indiceSlideAtual = imagensSlideshow.length - 1;
            }
            atualizarSlide();
        });
    }


    // --- 3. VALIDACAO DO FORMULARIO ---
    const formulario = document.getElementById("formulario-contato");
    const mensagemErro = document.getElementById("form-erro-mensagem");

    if (formulario) {
        formulario.addEventListener("submit", (evento) => {
            // Pega os campos de entrada do formulario
            const campoNome = document.getElementById("form-nome");
            const campoEmail = document.getElementById("form-email");
            const campoMensagem = document.getElementById("form-mensagem");

            // Verifica se algum dos campos esta vazio
            if (campoNome.value.trim() === "" || campoEmail.value.trim() === "" || campoMensagem.value.trim() === "") {
                // Impede o envio do formulario
                evento.preventDefault();
                
                // Exibe a mensagem de erro na tela
                if (mensagemErro) {
                    mensagemErro.textContent = "Por favor, preencha todos os campos antes de enviar.";
                    mensagemErro.style.color = "#ff6b6b";
                    mensagemErro.style.display = "block";
                }
            } else {
                // Caso tudo esteja correto
                if (mensagemErro) {
                    mensagemErro.style.display = "none";
                }
                alert("Obrigado pelo contato! Mensagem enviada com sucesso.");
            }
        });
    }


    // --- 4. QUIZ DINÂMICO (10 PERGUNTAS) ---
    // Estrutura de dados contendo as perguntas, alternativas e a resposta correta (0 a 3)
    const perguntasQuiz = [
        {
            pergunta: "O que é lixo espacial?",
            opcoes: [
                "Lixo descartado por astronautas diretamente na Lua.",
                "Restos de satélites e foguetes desativados na órbita terrestre.",
                "Fragmentos de meteoritos que caíram em nosso planeta.",
                "Nuvens de poeira cósmica vindas de fora do Sistema Solar."
            ],
            correta: 1
        },
        {
            pergunta: "Qual o principal perigo do lixo espacial atualmente?",
            opcoes: [
                "Ele pode bloquear a luz solar que chega à Terra.",
                "Ele altera de forma perceptível a gravidade terrestre.",
                "Ele pode colidir com satélites ativos em altíssimas velocidades.",
                "Ele atrai meteoros maiores em direção à Terra."
            ],
            correta: 2
        },
        {
            pergunta: "Qual tecnologia a Safe Orbit propõe para evitar colisões?",
            opcoes: [
                "Redes gigantes instaladas no espaço para capturar detritos.",
                "Lasers na Terra para vaporizar todos os objetos no espaço.",
                "Sistemas de monitoramento por radar e desvios automáticos.",
                "Mover a órbita da Terra para fugir dos detritos."
            ],
            correta: 2
        },
        {
            pergunta: "O que a Safe Orbit usa para reparar danos físicos causados por microdetritos?",
            opcoes: [
                "Fita adesiva de alta resistência térmica espacial.",
                "Cápsulas com resina expansiva que cobrem e isolam os danos.",
                "Robôs astronautas que consertam a lataria soldando placas.",
                "Pintura metálica especial que repele poeira espacial."
            ],
            correta: 1
        },
        {
            pergunta: "Em caso de desvio urgente, qual propulsor a Safe Orbit aciona?",
            opcoes: [
                "Propulsor químico.",
                "Propulsor elétrico.",
                "Propulsor de água a vapor.",
                "Painéis de vela solar."
            ],
            correta: 0
        },
        {
            pergunta: "Qual a quantidade estimada de objetos NÃO monitorados na órbita da Terra?",
            opcoes: [
                "Cerca de 30 mil objetos.",
                "Nenhum, todos são perfeitamente catalogados hoje.",
                "Apenas 1 milhão de fragmentos.",
                "Mais de 100 milhões de objetos pequenos."
            ],
            correta: 3
        },
        {
            pergunta: "De quem é a responsabilidade de lidar com o lixo na órbita terrestre?",
            opcoes: [
                "Exclusivamente da NASA e da agência espacial europeia.",
                "De todos os países e empresas que lançam objetos no espaço.",
                "De nenhuma entidade, pois a gravidade queima tudo na atmosfera.",
                "Apenas das empresas privadas de turismo espacial."
            ],
            correta: 1
        },
        {
            pergunta: "Qual tipo de propulsão é preferencial para manobras lentas e econômicas da Safe Orbit?",
            opcoes: [
                "Propulsão química pesada.",
                "Propulsão elétrica.",
                "Propulsão nuclear térmica.",
                "Propulsão eletromagnética solar."
            ],
            correta: 1
        },
        {
            pergunta: "Quem é o público-alvo principal da solução Safe Orbit?",
            opcoes: [
                "Astrônomos amadores que estudam o céu.",
                "Empresas e governos que operam satélites na órbita.",
                "Turistas que desejam viajar para a Lua ou Marte.",
                "Pilotos de aeronaves comerciais de carga."
            ],
            correta: 1
        },
        {
            pergunta: "Qual o principal benefício financeiro da nossa solução?",
            opcoes: [
                "Aumentar a vida útil dos satélites e evitar gastos de substituição.",
                "Cobrar pedágio de outros países para usar a órbita.",
                "Reciclar o ferro-velho espacial para revender na Terra.",
                "Vender energia solar gerada diretamente no espaço."
            ],
            correta: 0
        }
    ];

    let indicePerguntaAtual = 0; // Pergunta que esta sendo exibida agora
    let pontuacaoFinal = 0; // Quantas respostas corretas o usuario acertou

    // Elementos da tela do Quiz
    const containerPergunta = document.getElementById("quiz-pergunta-container");
    const elementoTextoPergunta = document.getElementById("quiz-pergunta-texto");
    const containerOpcoes = document.getElementById("quiz-opcoes-container");
    const elementoNumeroPergunta = document.getElementById("quiz-numero-pergunta");
    
    const containerResultado = document.getElementById("quiz-resultado-container");
    const textoResultadoScore = document.getElementById("quiz-resultado-texto");
    const botaoReiniciarQuiz = document.getElementById("quiz-reiniciar");

    // Funcao para carregar e exibir a pergunta atual
    function mostrarPergunta() {
        if (!containerPergunta || !elementoTextoPergunta || !containerOpcoes || !elementoNumeroPergunta) return;

        // Limpa as opcoes anteriores
        containerOpcoes.innerHTML = "";
        
        // Pega os dados da pergunta atual
        const dadosPergunta = perguntasQuiz[indicePerguntaAtual];
        
        // Atualiza o contador de progresso
        elementoNumeroPergunta.textContent = `Pergunta ${indicePerguntaAtual + 1} de ${perguntasQuiz.length}`;
        // Define o texto da pergunta
        elementoTextoPergunta.textContent = dadosPergunta.pergunta;

        // Cria dinamicamente um botao para cada alternativa
        dadosPergunta.opcoes.forEach((opcao, indice) => {
            const botaoOpcao = document.createElement("button");
            botaoOpcao.classList.add("quiz-opcao-btn");
            botaoOpcao.textContent = opcao;
            
            // Quando clicar na alternativa, processa a resposta
            botaoOpcao.addEventListener("click", () => verificarResposta(indice));
            
            containerOpcoes.appendChild(botaoOpcao);
        });
    }

    // Funcao que verifica se a alternativa escolhida esta correta
    function verificarResposta(indiceSelecionado) {
        const dadosPergunta = perguntasQuiz[indicePerguntaAtual];
        
        // Se a resposta estiver correta, soma na pontuacao
        if (indiceSelecionado === dadosPergunta.correta) {
            pontuacaoFinal++;
        }

        // Avanca para a proxima pergunta
        indicePerguntaAtual++;

        // Verifica se ainda existem perguntas para exibir
        if (indicePerguntaAtual < perguntasQuiz.length) {
            mostrarPergunta();
        } else {
            // Fim do quiz, exibe os resultados
            exibirResultadoQuiz();
        }
    }

    // Exibe a tela final com a pontuacao do usuario
    function exibirResultadoQuiz() {
        if (containerPergunta) containerPergunta.style.display = "none";
        if (containerResultado) {
            containerResultado.style.display = "block";
            textoResultadoScore.textContent = `Você acertou ${pontuacaoFinal} de ${perguntasQuiz.length} perguntas!`;
        }
    }

    // Reinicia o quiz limpando as variaveis de controle
    if (botaoReiniciarQuiz) {
        botaoReiniciarQuiz.addEventListener("click", () => {
            indicePerguntaAtual = 0;
            pontuacaoFinal = 0;
            if (containerResultado) containerResultado.style.display = "none";
            if (containerPergunta) containerPergunta.style.display = "block";
            mostrarPergunta();
        });
    }

    // Inicia a primeira pergunta ao carregar a pagina
    mostrarPergunta();


    // --- 5. NAVEGACAO COM CLASSE ATIVA AO ROLAR A PAGINA ---
    // Seleciona todas as secoes e links de navegacao
    const secoes = document.querySelectorAll("main section, main .card");
    const linksNav = document.querySelectorAll("header nav a");

    // Funcao para monitorar o scroll e atualizar o link ativo
    function destacarMenuNoScroll() {
        let secaoAtivaId = "";
        
        secoes.forEach(secao => {
            const secaoTopo = secao.offsetTop;
            const secaoAltura = secao.offsetHeight;
            
            // Verifica se a posicao atual do scroll esta dentro dos limites da secao
            if (window.scrollY >= (secaoTopo - 150)) {
                secaoAtivaId = secao.getAttribute("id");
            }
        });

        // Remove a classe "active" de todos os links e adiciona no link correspondente
        linksNav.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${secaoAtivaId}`) {
                link.classList.add("active");
            }
        });
    }

    // Adiciona o evento de rolagem (scroll)
    window.addEventListener("scroll", destacarMenuNoScroll);
});