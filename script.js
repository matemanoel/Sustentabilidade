// ==========================================
// CAPTURA ELEMENTOS do HTML
// ==========================================

const formulario = document.getElementById("formResposta");

const nome = document.getElementById("nome");

const resposta = document.getElementById("resposta");

const mensagem = document.getElementById("mensagem");

const listaRespostas = document.getElementById("respostas");


// ==========================================
// CARREGAR RESPOSTAS SALVAS
// ==========================================

let respostas = JSON.parse(
    localStorage.getItem("respostasBlog")
) || [];


// ==========================================
// MOSTRAR AS RESPOSTAS NA TELA
// ==========================================

function mostrarRespostas() {

    listaRespostas.innerHTML = "";

    if (respostas.length === 0) {

        listaRespostas.innerHTML =
            "<p>Ainda não existem respostas. Seja o primeiro a comentar!</p>";

        return;
    }


    respostas.forEach(function(item) {

        const div = document.createElement("div");

        div.classList.add("resposta");


        const titulo = document.createElement("h3");

        titulo.textContent = item.nome;


        const texto = document.createElement("p");

        texto.textContent = item.resposta;


        const data = document.createElement("small");

        data.textContent = item.data;


        div.appendChild(titulo);

        div.appendChild(texto);

        div.appendChild(data);


        listaRespostas.appendChild(div);

    });
}


// ==========================================
// ENVIAR UMA NOVA RESPOSTA
// ==========================================

formulario.addEventListener("submit", function(event) {

    // Impede o navegador de recarregar a página
    event.preventDefault();


    // Captura os valores digitados
    const nomeDigitado = nome.value.trim();

    const respostaDigitada = resposta.value.trim();


    // Verifica se os campos foram preenchidos
    if (nomeDigitado === "" || respostaDigitada === "") {

        mensagem.textContent =
            "Preencha todos os campos.";

        return;
    }


    // Cria a nova resposta
    const novaResposta = {

        nome: nomeDigitado,

        resposta: respostaDigitada,

        data: new Date().toLocaleString("pt-BR")

    };


    // Adiciona a resposta no início da lista
    respostas.unshift(novaResposta);


    // Salva no navegador
    localStorage.setItem(
        "respostasBlog",
        JSON.stringify(respostas)
    );


    // Atualiza a tela
    mostrarRespostas();


    // Mensagem de sucesso
    mensagem.textContent =
        "Resposta enviada com sucesso!";


    // Limpa os campos
    formulario.reset();

});


// ==========================================
// EXIBIR AS RESPOSTAS AO ABRIR A PÁGINA
// ==========================================

mostrarRespostas();
