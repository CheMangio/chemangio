/*
Script per GUI del test "che mangio?"
*/

/*
Il quiz non è lineare. La domanda successiva dipende dalla domanda attuale e dalla
risposta che le si da. In pratica non posso solo avanzare di uno ogni volta,
ho bisogno di una funzione di transizione simile a quelle degli automi a stati finiti.
*/

/*
1. Quanto tempo hai?
	meno di un'ora
	più di un'ora

2. Dolce o salato?
	dolce -> 3
	salato -> 6

== Dolce ==
3. Cioccolato?
	si
	no

4. Frutta?
	si
	no

== Salato ==
5. Finger food?
	si
	no

6. Primi, secondi, antipasti o contorni?
	primo
	secondo
	antipasto
	contorno

7. Basso contenuto calorico?
	si
	no

*/

// 8 sta per quiz terminato: restituire soluzione
var transizioni = [
					[2, 2],
					[3, 5],
					[4, 4],
					[8, 8],
					[6, 6],
					[7, 7, 7, 7],
					[8, 8]
					];

var currQuestion = 0;
var currQuestionEl;
var nextQuestion;
var answers = new Array(-1, -1, -1, -1, -1, -1, -1);


/* inizio: ingrandire il background bianco e mostrare #test-1 */
$("#test-0 .btn-large").click(function(){
	$("#test #test-0").animate({
		"opacity": 0
	}, 350, function() {
		this.style.display = "none";
		currQuestionEl = document.getElementById("test-1");
		currQuestionEl.style.display = "block";
	});
	$("#test #lightBg").animate({
		"top": 0,
		"height": "100%"
	}, 400, function() {
		$(currQuestionEl).animate({
			"opacity": 1
		}, 350);
		currQuestion = 1;
	});
});

/* al click su ogni risposta:
	- registra risposta selezionata nell'array answers
	- nascondi domanda corrente
	- mostra domanda successiva
*/
$("#test a.test-answ").click(function(){
	// setta risposta
	answers[currQuestion-1] = parseInt(this.getAttribute("data-ans"));

	// nascondi domanda corrente
	$(currQuestionEl).animate({
		"opacity": 0
	}, 350, function(){
		this.style.display = "none";
		// determina e mostra prossima domanda
		currQuestion = transizioni[currQuestion-1][answers[currQuestion-1]-1];
		currQuestionEl = document.getElementById("test-"+currQuestion);
		currQuestionEl.style.display = "block";
		$(currQuestionEl).animate({
			"opacity": 1
		}, 350);

		// se arriviamo all'ultima è l'ora del risultato
		if (currQuestion == 8) {
			showTestResult(answers);
		}
		console.log("current Question: " + currQuestion);
		console.log(answers);
	});
});


function showTestResult(answers) {
	alert("Test finito. Risposte: " + answers.join('\n'));
}