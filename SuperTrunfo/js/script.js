const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  const data = await APIResponse.json();
  return data;
}

var cartaMaquina;
var cartaJogador;
document.getElementById("btnSortear").addEventListener("click", sortear);

function sortear() {
  var idCartaMaquina = parseInt(Math.random() * 907);
  cartaMaquina = idCartaMaquina;

  var idCartaJogador = parseInt(Math.random() * 907);
  while (idCartaMaquina == idCartaJogador) {
    var idCartaJogador = parseInt(Math.random() * 907);
  }
  cartaJogador = idCartaJogador;

  document.getElementById("btnSortear").disabled = true;
  document.getElementById("btnJogar").disabled = false;

  renderPokemonJogador(cartaJogador, "carta-jogador");
}

async function renderPokemonJogador (pokemon, id) {

  const data = await fetchPokemon(pokemon);

  var attackStat = data.stats[1].base_stat;
  var specialAtkStat = data.stats[3].base_stat;
  var speedStat = data.stats[5].base_stat;
  var attack = data.stats[1].stat.name;
  var specialAtk = data.stats[3].stat.name;
  var speed = data.stats[5].stat.name;

  var cartaExibida = document.getElementById(id);
  var moldura = '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent-ajustado.png" style=" width: inherit; height: inherit; position: absolute;">';
  var tagHTML = "<div id='opcoes' class='carta-status'>";

  var cartaImg = data['sprites']['front_default'];
  cartaExibida.style.backgroundImage = `url(${cartaImg})`;

  var nome = `<p class="carta-subtitle">${data.name}</p>`;

  var opcoesTexto = "";
  opcoesTexto += "<input type='radio' name='atributo' value='" + attack + "'/>" + attack + " " + attackStat +
  "<br><input type='radio' name='atributo' value='" + specialAtk + "'/>" + specialAtk + " " + specialAtkStat +
  "<br><input type='radio' name='atributo' value='" + speed + "'/>" + speed + " " + speedStat;

  cartaExibida.innerHTML = moldura + nome + tagHTML + opcoesTexto + "</div>";

  cartaJogador = {
    nome: data.name,
    atributos: {
      attack: attackStat,
      specialAtk: specialAtkStat,
      speed: speedStat
    }
  };
}

async function renderPokemonMaquina (pokemon, id) {

  const data = await fetchPokemon(pokemon);

  var attackStat = data.stats[1].base_stat;
  var specialAtkStat = data.stats[3].base_stat;
  var speedStat = data.stats[5].base_stat;
  var attack = data.stats[1].stat.name;
  var specialAtk = data.stats[3].stat.name;
  var speed = data.stats[5].stat.name;

  var cartaExibida = document.getElementById(id);
  var moldura = '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent-ajustado.png" style=" width: inherit; height: inherit; position: absolute;">';
  var tagHTML = "<div id='opcoes' class='carta-status'>";

  var cartaImg = data['sprites']['front_default'];
  cartaExibida.style.backgroundImage = `url(${cartaImg})`;

  var nome = `<p class="carta-subtitle">${data.name}</p>`;

  var opcoesTexto = "";
  opcoesTexto += "<input type='radio' name='atributo' value='" + attack + "'/>" + attack + " " + attackStat +
  "<br><input type='radio' name='atributo' value='" + specialAtk + "'/>" + specialAtk + " " + specialAtkStat +
  "<br><input type='radio' name='atributo' value='" + speed + "'/>" + speed + " " + speedStat;

  cartaExibida.innerHTML = moldura + nome + tagHTML + opcoesTexto + "</div>";
  
  cartaMaquina = {
    nome: data.name,
    atributos: {
      attack: attackStat,
      specialAtk: specialAtkStat,
      speed: speedStat
    }
  };
}

function obtemAtributoSelecionado() {
  var radioAtributos = document.getElementsByName("atributo");

  for (var i = 0; i < radioAtributos.length; i++) {
    if (radioAtributos[i].checked) {
      return radioAtributos[i].value;
    }
  }
}

document.getElementById("btnJogar").addEventListener("click", jogar);

async function jogar() {
  await renderPokemonMaquina(cartaMaquina, "carta-maquina");

  var atributoSelecionado = obtemAtributoSelecionado();
  var elementoResultado = document.getElementById("resultado");
  var valorCartaJogador = cartaJogador.atributos[atributoSelecionado];
  var valorCartaMaquina = cartaMaquina.atributos[atributoSelecionado];
  console.log(valorCartaJogador);
  console.log(valorCartaMaquina);

  if (valorCartaJogador > valorCartaMaquina) {
    elementoResultado.innerHTML = "<p class='resultado-final'>Você venceu!, o atributo da carta escolhido, é maior que o da máquina.</p>";
  } else if (valorCartaMaquina > valorCartaJogador) {
    elementoResultado.innerHTML = "<p class='resultado-final'>Você perdeu, o atributo da carta escolhido, é menor que o da máquina.</p>";
  } else {
    elementoResultado.innerHTML = "<p class='resultado-final'>Empatou</p>";
  }
  
  document.getElementById("btnJogar").disabled = true;
  document.getElementById("btnReiniciar").disabled = false;
}

document.getElementById("btnReiniciar").addEventListener("click", reiniciar);

function reiniciar() {
  location.reload();
}