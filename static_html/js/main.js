$(document).ready(function(){
  $(".button-collapse").sideNav();
  $('select').material_select();
});

/*
Consiglia gli ingredienti che cominciano con quello
che l'utente ha scritto.
*/
$('#ingrInput').bind("keyup input paste", function(event){
    // se il valore è cambiato
	if (oldVal != $(this).val()) {
       // aggiorna il vecchio valore di confronto
		oldVal = $(this).val();

		// svuota la lista dei consigli
		ingrConsigli.html('');
		
		// se cambia il valore, cerca max 5 consigli
		if (oldVal != '') {
			var ingrCandidati = getConsigli(oldVal);

			// crea lista consigli
			for (var i=0; i < ingrCandidati.length; i++) {
				ingrConsigli.append('<li>'+ingrCandidati[i]+'</li>');
			}

			/*
				bindig ai consigli appena aggiunti
			*/
			$('#ingrConsigli li').click(function(){
				ingrSelezionati.append('<li class="row"><span class="ingrName col s9">'+$(this).html()+'</span> <input class="col s2" type="text" placeholder="quantità"> <span class="remIngr col s1">x</span></li>');

				var justAdded = ingrSelezionati.find('li:last-child');

				$('#ingrInput').val('');

				ingrConsigli.html('');

				// non vogliamo riconsigliare lo stesso ingrediente
				// che è già stato aggiunto
				ingrTotali.splice(ingrTotali.indexOf($(this).html()), 1);

				// binding va fatto qui per la rimozione di ingredienti.
				justAdded.find('span.remIngr').click(function(){
					// rendiamo nuovamente disponibile per i consigli un
					// ingrediente appena rimosso
					ingrTotali.push($(this.parentElement).find('.ingrName').html());
					$(this.parentElement).remove();
				});
			});
		}

   	}
});

// è un azzardo ma funziona
$("#ingrInput").focusout(function(){
	setTimeout(function(){
		ingrConsigli.css('display', 'none');
	}, 100);
});

$('#ingrInput').focus(function(){
	ingrConsigli.css('display', 'block');
});

function getConsigli(prefisso) {
	var consigli = new Array();

	for (var i = 0; i < ingrTotali.length; i++) {
		if (ingrTotali[i].startsWith(prefisso.toLowerCase())) {
			consigli.push(ingrTotali[i]);
			if (consigli.length >= 5) break;
		}
	}

	return consigli;
}