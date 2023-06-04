$(document).ready(function () {
  // Variáveis globais
  let respostaClicada = "";
  let respostaCorreta;
  let questaoErrada = false;

  // Exibe as respostas em ordem aleatória
  for (let i = 1; i <= 4; i++) {
    $("#resposta" + i).css("order", getRandomInt(4 + 1));
  }

  // Função para randomizar números inteiros de 0 até max-1
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  // Define as perguntas e respostas
  let perguntas = [
    {
      pergunta: "QUAL É O SISTEMA OPERACIONAL DESENVOLVIDO PELA APPLE?",
      respostas: ["iOS", "Windows", "Linux", "Android"],
      answered: false,
    },
    {
      pergunta: "QUAL DESTES COMPONENTES NÃO FAZ PARTE DE UM COMPUTADOR?",
      respostas: ["PROCESSADOR", "IMPRESSORA", "PLACA DE VÍDEO", "MEMÓRIA RAM"],
      answered: false,
    },
    {
      pergunta: "QUAL É O SITE DE BUSCAS MAIS POPULAR?",
      respostas: ["YAHOO", "BING", "GOOGLE", "DUCKDUCKGO"],
      answered: false,
    },
    {
      pergunta: "QUAL GERAÇÃO DE PROCESSADORES É MAIS RÁPIDA?",
      respostas: ["I3", "I5", "I7", "I9"],
      answered: false,
    },
  ];

  // Índice da pergunta atual
  let indicePerguntaAtual = getRandomInt(perguntas.length);

  setPergunta();

  // Função para exibir a pergunta e as respostas
  function setPergunta() {
    let perguntaAtual = perguntas[indicePerguntaAtual];
    $("#pergunta").text(perguntaAtual.pergunta);

    $("#resposta1").text(perguntaAtual.respostas[0]);
    $("#resposta2").text(perguntaAtual.respostas[1]);
    $("#resposta3").text(perguntaAtual.respostas[2]);
    $("#resposta4").text(perguntaAtual.respostas[3]);
  }
  // Reinicia as perguntas
  function resetPerguntas() {
    // Percorre todas as respostas e remove as classes selecionada, correta e errada
    $(".resposta").each(function () {
      if ($(this).hasClass("selecionada")) {
        $(this).removeClass("selecionada");
      }
      if ($(this).hasClass("correta")) {
        $(this).removeClass("correta");
      }
      if ($(this).hasClass("errada")) {
        $(this).removeClass("errada");
      }
    });
  }

  // Função executada quando uma resposta é clicada, enviando o id da resposta para a função atribuirResposta
  $(".resposta").on("click", function () {
    if (!questaoErrada) {
      resetPerguntas();
      atribuirResposta($(this).attr("id"));
      $(this).addClass("selecionada");
    }
  });

  // Atribui a resposta clicada à variável respostaClicada
  function atribuirResposta(clicada) {
    switch (clicada) {
      case "resposta1": {
        respostaClicada = "resposta1";
        break;
      }
      case "resposta2": {
        respostaClicada = "resposta2";
        break;
      }
      case "resposta3": {
        respostaClicada = "resposta3";
        break;
      }
      default: {
        respostaClicada = "resposta4";
        break;
      }
    }
  }

  // Função executada quando o botão de verificação é clicado
  $("#verificar").on("click", function () {
    verificarResposta(respostaClicada);
  });

  // Verifica se a resposta está correta ou incorreta
  function verificarResposta(respostaClicada) {
    respostaCorreta = "";
    // Determina a resposta correta com base na pergunta atual
    switch ($("#pergunta").text()) {
      case "QUAL É O SISTEMA OPERACIONAL DESENVOLVIDO PELA APPLE?":
        respostaCorreta = "resposta1";
        break;
      case "QUAL DESTES COMPONENTES NÃO FAZ PARTE DE UM COMPUTADOR?":
        respostaCorreta = "resposta2";
        break;
      case "QUAL É O SITE DE BUSCAS MAIS POPULAR?":
        respostaCorreta = "resposta3";
        break;
      case "QUAL GERAÇÃO DE PROCESSADORES É MAIS RÁPIDA?":
        respostaCorreta = "resposta4";
        break;
    }

    if (respostaClicada === respostaCorreta) {
      // A resposta está correta
      resetPerguntas();
      // Marca a pergunta como respondida
      let perguntaAtual = perguntas[indicePerguntaAtual];
      perguntaAtual.answered = true;

      // Procura a próxima pergunta que não foi respondida
      let proximaPergunta;
      for (let i = 0; i < perguntas.length; i++) {
        if (!perguntas[i].answered) {
          proximaPergunta = perguntas[i];
          break;
        }
      }

      // Exibe a próxima pergunta não respondida, se existir
      if (proximaPergunta) {
        $("#pergunta").text(proximaPergunta.pergunta);
        $("#resposta1").text(proximaPergunta.respostas[0]);
        $("#resposta2").text(proximaPergunta.respostas[1]);
        $("#resposta3").text(proximaPergunta.respostas[2]);
        $("#resposta4").text(proximaPergunta.respostas[3]);

        indicePerguntaAtual = perguntas.indexOf(proximaPergunta);
      } else {
        // Se todas as perguntas foram respondidas, finaliza o jogo
        $("#pergunta").text("Parabéns! Você acertou todas as perguntas.");
        $("#respostas").hide();
        $("#verificar").text("Reiniciar o jogo");
        $("#verificar")
          .off("click")
          .on("click", function () {
            location.reload();
          });
      }
    } else {
      // A resposta está incorreta
      questaoErrada = true;
      // Adiciona as classes correta e errada às respostas
      $("#" + respostaCorreta).addClass("correta");
      $("#" + respostaClicada).removeClass("selecionada");
      $("#" + respostaClicada).addClass("errada");
      // Recarrega a página após 4 segundos
      setTimeout(function () {
        location.reload();
      }, 4000);
    }
  }
});