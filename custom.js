jQuery( document ).ready(function($) {
	"use strict";
	
	if(typeof Cookies.get('nome') === 'undefined' ) {
		window.location.replace("index.html");
	}
	
	// ---------------------- topo
	if($('body').hasClass('minha-conta')) {
	   
	} else {
		$('body').prepend('<header><div><a href="minha-conta.html" style="font-size: 13px;"><span id="header-initial"></span>Olá, <span id="header-nome">' + Cookies.get('nome') + '</span></a></div><div><a href="#" id="avisos-side"><i class="far fa-bell"></i></a></div><div id="warning"><ul></ul></div>');
	}
	
	// ---------------------- avisos
	var aviso="http://gbm.org.br/app/webservice/avisos.php";
	$.getJSON(aviso,function(result){
		if (result.length) {
			$.each(result, function(i, field){
				var id = field.id;
				var titulo = field.post_title;
				var d = field.post_date.slice(0, 10).split('-');   
				var data = d[2] +'/'+ d[1] +'/'+ d[0];


				$("#warning ul").append('<li><a href="ver-aviso.html" id=' + id + '><h4><i class="fas fa-caret-right"></i> ' + titulo + '</h4><span class="date"><i class="fas fa-calendar-alt"></i> ' + data + '</span></a></li>');
			});
		}
		else {
			$("#warning ul").append('<li>Ainda não existem avisos.</li>');
		}
	});
	
	// ---------------------- rodapé
	
	$('body').append('<footer><ul><li class="menu-footer"><img src="images/menu-1.jpg" alt="" /><ul><li><a href="inicial.html" class="inicial-icon"><i class="fas fa-home"></i> Inicio</a></li><li><a href="ferramentas-medicas.html"><img src="images/pack.png" alt="" /> Ferramentas Médicas</a></li><li><a href="encontre-um-especialista.html"><img src="images/doc.png" alt="" /> Encontre um especialista</a></li><li><a href="por-dentro-do-gbm.html"><img src="images/book.png" alt="" /> Por dentro do GBM</a></li><li><a href="dicas-de-prevencao.html"><img src="images/heart.png" alt="" /> Dicas de Prevenção</a></li><li><a href="links-uteis.html"><img src="images/link.png" alt="" /> Links Úteis</a></li></ul></li><li><a href="chat.html"><img src="images/chat-1.jpg" alt="" /></a></li><li class="big menu-footer"><img src="images/redes-2.jpg" alt="" /><ul><li><a href="https://www.facebook.com/grupobrasileirodemelanoma/" target="_blank"><img src="images/facebook-1.png" alt="" /> Facebook</a></li><li><a href="https://www.instagram.com/grupobrasileirodemelanoma/?hl=pt-br" target="_blank"><img src="images/instagram-1.png" alt="" /> Instagram</a></li></ul></li><li><a href="mailto:gbm@gbm.org.br?subject=Preciso de ajuda - APP GBM"><img src="images/ajuda-1.jpg" alt="" /></a></li></ul></footer>');
	
	//$('.ver-topico footer').prepend('<form id="reply-topic" action="" method="post"><textarea name="conteudo"></textarea><input type="hidden" name="nome_autor" value="" /><input type="hidden" name="email_autor" value="" /><input type="hidden" name="data" value="" /><input type="hidden" name="topico" value="'+ getParameterByName('id-topic') +'" /><button type="submit"><i class="fab fa-telegram-plane"></i></button></form>');

	// ----------------------
	var str = $('#header-nome').text();
    var res = str.substring(0,1);
	$('#header-initial').append(res);
	
	$('#header-nome').each(function () { $('#header-initial').append($(this).text().replace(/^(\S+)\s(\S).*/, '$2'));});
	
	$('.menu-footer').click(function(){ $(this).find('ul').toggle( "fade" ); });
	
	$('#content, .title').click(function(){
		$(".menu-footer ul, .big ul").css('display','none');
	});
	
	
	
	$("#avisos-side").click(function () { $('#warning').toggle( "fade" ); });
	$('#warning').on('click', function(e) { if (e.target === this) { $('#warning').toggle( "fade" );} });
		
	$("#search-side").click(function () { $('.search-div').toggle( "fade" ); });
	
	$("#encontre").submit(function(){
		$('#loader-encontre').css('display','block');
	});
	
	//$("#add-topic").colorbox({inline:true, width:"90%"});
	
	$('#seach-lesoes').on('submit',function(){return false;});
	$('#pesquisa-lesoes').keyup(function(){ 
		var query = $.trim($('#pesquisa-lesoes').val()).toLowerCase();
		
		$('.title-galery').each(function(){ 
			var $this = $(this); 
			if($this.text().toLowerCase().indexOf(query) === -1) {
				$this.closest('.atlas-galery').fadeOut(); 
			} else { $this.closest('.atlas-galery').fadeIn(); }
		});
	});
	
	$('#seach-topicos').on('submit',function(){return false;});
	$('#pesquisa-topicos').keyup(function(){ 
		var query = $.trim($('#pesquisa-topicos').val()).toLowerCase();
		
		$('.topic-list li').each(function(){ 
			var $this = $(this); 
			if($this.text().toLowerCase().indexOf(query) === -1) {
				$this.fadeOut(); 
			} else { $this.fadeIn(); }
		});
	});
	
	$(".inline").colorbox({inline:true, width:"80%"});
	$(".inline").click(function(){
		var id = $(this).attr('name');
		
		$('#inline_content #topic-id').val(id);
	});
	
	$('.page-id-37 .your-name input').val($('#header-nome').text());
	$('.page-id-37 .your-email input').val($('#header-email').text());
	
});

$( document ).ajaxStart(function() {   "use strict";  $( "#loader" ).show();});

$( document ).ajaxStop(function() {	"use strict";  $( "#loader" ).hide(); 	
	$('#atlas-page .owl-carousel').owlCarousel({
		loop:false,	margin:0,nav:false,responsive:{	0:{	items:1}, 600:{	items:1	},1000:{items:1}}
	});
	$('.inicial .owl-carousel').owlCarousel({
		loop:true, margin:10, nav:false, dots:false, autoplay:true,	responsive:{0:{items:2}, 600:{items:3},	1000:{items:5}}
	});
});

$(document).on('click', '#warning a', function() {"use strict"; Cookies.set('aviso-id', $(this).attr('id'), { expires: 1 }); Cookies.set('aviso-titilo' , $(this).text(), { expires: 1 });});

$(document).on('click', '.atlas-galery .img-galery, .atlas-galery .title-galery, .atlas-galery .galery-expand', function() {
		if($(this).parent().hasClass('open')){
			$(this).parent().removeClass('open');
			$(this).parent().find('.galery-expand').html('<i class="fas fa-caret-up"></i> expandir');
		} else {
			$(this).parent().addClass('open');
			$(this).parent().find('.galery-expand').html('<i class="fas fa-caret-down"></i> esconder');
		}
		$(this).parent().find('.imgs-galery').toggle( "fade" ); 
});

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {

    // Mock device.platform property if not available
    if (!window.device) {
        window.device = { platform: 'Browser' };
    }

    handleExternalURLs();
}

function handleExternalURLs() {
    // Handle click events for all external URLs
    if (device.platform.toUpperCase() === 'ANDROID') {
        $(document).on('click', 'a[href^="http"]', function (e) {
            var url = $(this).attr('href');
            navigator.app.loadUrl(url, { openExternal: true });
            e.preventDefault();
        });
    }
    else if (device.platform.toUpperCase() === 'IOS') {
        $(document).on('click', 'a[href^="http"]', function (e) {
            var url = $(this).attr('href');
            window.open(url, '_system');
            e.preventDefault();
        });
    }
    else {
        // Leave standard behaviour
    }
}

function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// SETUP PUSH
document.addEventListener('deviceready', function () {
  // Enable to debug issues.
  // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
  
  var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };

  window.plugins.OneSignal
    .startInit("06185201-a4d9-4967-914a-a2f8fea40a56")
    .handleNotificationOpened(notificationOpenedCallback)
    .endInit();
}, false);