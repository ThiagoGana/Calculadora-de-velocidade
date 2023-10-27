const testArea = document.querySelector("#test-area");
const gabaritoArea = document.querySelector("#origin-text")
const theTimer = document.querySelector(".timer");
const testWrapper = document.querySelector(".test-wrapper");
const resetButton = document.querySelector("#reset");

const GABARITOS = [
    "Para mim, o computador é a mais extraordinária ferramenta que já tivemos. É o equivalente à bicicleta para nossa mente - Steve Jobs",
    "Mostre-me o seu computador que saberei quem és - Juliana P.H.S",
    "Meus filhos terão computadores, sim, mas antes terão livros. Sem livros, sem leitura, os nossos filhos serão incapazes de escrever – inclusive a sua própria história - Bill Gates",
    "Quanto mais se aumenta a memória de um computador mais se expande sua complexidade; Quanto mais se aumenta a capacidade de amar de um ser humano, mais se aumenta sua simplicidade - Augusto Cury",
    "Basicamente você assiste TV pra desligar seu cérebro, e usa o computador quando você o quer de volta! - Steve Jobs",
    "Qualquer pessoa que quer ser perfeita demais estará apta para ser um computador, mas não uma pessoa completa - Augusto Cury",
    "Vejo o cérebro como um computador que deixará de funcionar quando seus componentes falharem. Não existe paraíso ou vida além da morte para computadores quebrados; isso é um conto de fadas para pessoas com medo da escuridão. - Stephen Hawking",
    "Qualquer professor que possa ser substituído por um computador deve ser substituído. - Arthur C. Clarke",
    "O NERD só casa por que ainda não descobriram um computador que busca café. - Wendel Henrique Ferreira",
    "Se o cerebro fosse realmente como um computador, você poderia deletar alguns pensamentos. - Daniel A. de Angelis",
    "Esta é a regra fundamental desse computador que vive no corpo humano: só vai para a memória aquilo que e objeto do desejo. A tarefa primordial do professor: seduzir o aluno para que ele deseje e, desejando, aprenda. - Rubem Alves",
    "Já dizia o velho sábio: O computador veio para resolver os problemas que nós ainda não tínhamos. - Hernani Soares Neto",
    "Se eu apagar a lixeira do computador, pra onde ela vai? - Roberto Bartolomeu",
    "Solteiro(a) sim, longe do computador jamais !! - KaayOltramari", 
    "Queria que minha vida fosse como um jogo de computador. Se tomar a decisão errada, perco uma vida. Se tomar a decisão certa, ganho pontos. - Jéssica Quimberli",
]

timer = [0,0,0,0];
var interval;
var timerRunning = false;

function spellCheck() {
    const textoInseridoText = testArea.value;
    const gabaritoText = gabaritoArea.innerText;

    if (textoInseridoText == gabaritoText) {
        clearInterval(interval);
        testWrapper.style.borderColor = "#429890";
    } else {
        if (textoInseridoText == gabaritoText) {
            testWrapper.style.borderColor = "#65CCf3";
        } else {
            testWrapper.style.borderColor = "#E95D0F";
        }
    }

}

// Adiciona zero inicial aos números <= 9 (apenas para estética):
function leadingZero(time) {
    if(time <= 9){
        time = "0" + time;
    }
    return time;
}

// Executa um timer padrão de minuto / segundo / centésimos:
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

function start(){
    let textEnteredLength = testArea.value.length;
     if (textEnteredLength === 0 && !timerRunning) {
         timerRunning = true;
         interval = setInterval(runTimer, 10);
     }
 }

// Função de recomeçar:
async function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";

    const gabaritoValue = await getGabarito()
    console.log('xxxx_gabarito', gabaritoValue)
    gabaritoArea.innerText = gabaritoValue;
}

function loadGabarito() {

}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  
testArea.addEventListener("keyup", spellCheck, false);
testArea.addEventListener("keypress", start, false);
resetButton.addEventListener("click", reset, false);

async function getGabarito()  {
    const defer = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(GABARITOS[getRandomInt(68)])
        }, 2000);
    });

    return defer
        .then((data) => {
            return data;
        })
}

window.addEventListener('load', async (event) => {

    console.log('The page has fully loaded');
    const gabaritoValue = await getGabarito()
    console.log('xxxx_gabarito', gabaritoValue)
    gabaritoArea.innerText = gabaritoValue;
});
