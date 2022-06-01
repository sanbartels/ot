$(document).ready(function () {

	/*MENU
	 * ------------------------------------------------------ */
	$(document).on("click", ".bt-menu", function (open) {
		open.preventDefault();
		$('body').toggleClass('nav-sidebar-open');
	});

	$(document).on("click", "#close-menu", function (close) {
		close.preventDefault();
		$('body').removeClass('nav-sidebar-open');
	});

	//detecta la sombra que se genera y si le dan click se cierra
	// esta funcion controla todos los clicks cuando el menu esta deplegado
	$(document).on("click", ".collapse-container", function (close) {
		if ($('body').hasClass('nav-sidebar-open')) {
			var content = window.getComputedStyle(
				document.querySelector('.collapse-container'), ':before').getPropertyValue('opacity');
			if (content == "1") {
				$('body').removeClass('nav-sidebar-open');
			}
		}
	});

	//detecta cambio de ancho de ventana del navegador web
	window.addEventListener("resize", function (event) {
		//console.log(document.body.clientWidth + ' wide by ' + document.body.clientHeight+' high');
		$('body').removeClass('nav-sidebar-open');


		/*Scroll logo principal movil
		 * ------------------------------------------------------ */
		establecer_scroll();
	});

	//funcionan para estableser el scroll su es mayor a 767px
	function establecer_scroll() {
		if (document.body.clientWidth <= 767) {
			$(".nav-two, .nav-inner-two").attr("data-scroll", "si");
		} else {
			$(".nav-two, .nav-inner-two").attr("data-scroll", "no");
		}
	}


	/* Menu on Scrolldown y que modifique el logo solo en moviles
	 * ------------------------------------------------------ */
	establecer_scroll();
	var lastScrollTop = 0;
	var bandera_logo_inicio = 0;

	$(window).scroll(function () {
		var barra = $(window).scrollTop(),
			menuTrigger = $('.nav-two');

		//Scroll para menu fixed
		if (barra > 53) {
			menuTrigger.addClass('nav-two-bg col-md-12 col-lg-9 col-xl-10 col-xxl-11');
		} else {
			menuTrigger.removeClass('nav-two-bg col-md-12 col-lg-9 col-xl-10 col-xxl-11');
		}

		if ($('.nav-two').hasClass('nav-two-bg')) {
			$('body').addClass('fix');
		} else {
			$('body').removeClass('fix');
		}

		//Scroll logo principal movil
		if (bandera_logo_inicio != 0) {
			if ($(".nav-two, .nav-inner-two").attr("data-scroll") == "si") {
				var st = window.pageYOffset || document.documentElement.scrollTop;
				if (st > lastScrollTop) {
					$(".logo-corporativo").addClass("mini_logo");
				} else {
					$(".logo-corporativo").removeClass("mini_logo");
					//console.log('para arriba');
				}
				lastScrollTop = st;
			}
		} else {
			bandera_logo_inicio++;
		}

		//Scroll para parallax pagina detalle noticias
		var keyBg = barra * -0.12;
		var keyText = barra * 0.1;
		if (barra <= 370) {
			$('.page-header-bg').css({
				'background-position-y': +keyBg + 'px'
			});
			$('.page-header-title, .moreInfoBottom').css({
				'transform': 'translateY(' + keyText + '%)'
			});
			var alphaBg = 1 - (barra / 350);
			//console.log(alphaBg);
			$('.page-header-title').css('opacity', alphaBg)
		}
	});
	/* ------------------------------------------------------ */
	/* Flickity
	 * ------------------------------------------------------ */

	// external js: flickity.pkgd.js

	var carouselContainers = document.querySelectorAll('.carousel-container');
	var reference_flkty = null;

	for (var i = 0; i < carouselContainers.length; i++) {
		var container = carouselContainers[i];
		initCarouselContainer(container);
	}

	function initCarouselContainer(container) {
		var carousel = container.querySelector('.carousel');
		var flkty = new Flickity(carousel, {
			// options
			imagesLoaded: true,
			wrapAround: true,
			adaptiveHeight: true,
			autoPlay: false,
			prevNextButtons: true,
			pageDots: false,
			draggable: false,
			friction: 0.2,
			touchVerticalScroll: false,
			pauseAutoPlayOnHover: false
		});
		var carouselStatus = container.querySelector('.carousel-status');

		function updateStatus() {
			var slideNumber = flkty.selectedIndex + 1;
			carouselStatus.textContent = slideNumber + '/' + flkty.slides.length;
		}
		updateStatus();

		flkty.on('select', updateStatus);
		reference_flkty = flkty;
	}

	/*
		var $navCarousel = $('.carousel-nav').flickity({
			asNavFor: '.carmain',
			cellSelector: '.carousel-cell',
			contain: true,
			pageDots: false,
			prevNextButtons: false,
			draggable: false,
		});

		$('.prev-button').on('click', function () {
			reference_flkty.previous();
		});
		$('.next-button').on('click', function () {
			reference_flkty.next();
		});

	*/



































	// $('.main-carousel').flickity({
	// 	// options
	// 	cellAlign: 'left',
	// 	contain: true,
	// 	wrapAround: true
	// });


	// //Slider 01
	// var slideOT = $(".slideOT"); //prueba

	// slideOT.flickity({
	// 	imagesLoaded: true,
	// 	wrapAround: true,
	// 	adaptiveHeight: true,
	// 	autoPlay: false,
	// 	prevNextButtons: false,
	// 	pageDots: false,
	// 	draggable: false,
	// 	friction: 0.2,
	// 	touchVerticalScroll: false,
	// 	pauseAutoPlayOnHover: false
	// });

	// // Move through flickity gallery on arrows
	// var $ot = slideOT.flickity({
	// 	prevNextButtons: false,
	// 	pageDots: false
	// });

	// // Flickity instance
	// var flkty1 = $ot.data('flickity');
	// // elements
	// var $cellButtonGroup1 = $('.btn-group-cells');
	// var $cellButtons1 = $cellButtonGroup1.find('.btnOT');

	// // update selected cellButtons
	// $ot.on('select.flickity', function () {
	// 	$cellButtons1.filter('.is-selected')
	// 		.removeClass('is-selected');
	// 	$cellButtons1.eq(flkty1.selectedIndex)
	// 		.addClass('is-selected');
	// });

	// // select cell on button click
	// $cellButtonGroup1.on('click', '.btnOT', function () {
	// 	var index = $(this).index();
	// 	$ot.flickity('select', index);
	// });
	// // previous
	// $('.btn-previous').on('click', function () {
	// 	$ot.flickity('previous');
	// });
	// // next
	// $('.btn-next').on('click', function () {
	// 	$ot.flickity('next');
	// });

	// // detener video cuando cambias slider
	// slideOT.on('change.flickity', function () {
	// 	newTarg = $(".parent-el").not('.is-selected');
	// 	$(newTarg).find('iframe').each(function () {
	// 		var src = $(this).attr('src');
	// 		$(this).attr('src', src);
	// 	});
	// 	console.log('slide cambio');
	// });




	// //Slider 02
	// var slideEV = $(".slideEV"); //prueba

	// slideEV.flickity({
	// 	imagesLoaded: true,
	// 	wrapAround: true,
	// 	adaptiveHeight: true,
	// 	autoPlay: false,
	// 	prevNextButtons: false,
	// 	pageDots: false,
	// 	draggable: false,
	// 	touchVerticalScroll: false,
	// 	pauseAutoPlayOnHover: false
	// });

	// // Move through flickity gallery on arrows
	// var $carousel = slideEV.flickity({
	// 	prevNextButtons: false,
	// 	pageDots: false
	// });

	// // Flickity instance
	// var flkty = $carousel.data('flickity');
	// // elements
	// var $cellButtonGroup = $('.button-group--cells');
	// var $cellButtons = $cellButtonGroup.find('.button');

	// // update selected cellButtons
	// $carousel.on('select.flickity', function () {
	// 	$cellButtons.filter('.is-selected')
	// 		.removeClass('is-selected');
	// 	$cellButtons.eq(flkty.selectedIndex)
	// 		.addClass('is-selected');
	// });

	// // select cell on button click
	// $cellButtonGroup.on('click', '.button', function () {
	// 	var index = $(this).index();
	// 	$carousel.flickity('select', index);
	// });
	// // previous
	// $('.button--previous').on('click', function () {
	// 	$carousel.flickity('previous');
	// });
	// // next
	// $('.button--next').on('click', function () {
	// 	$carousel.flickity('next');
	// });







	/* ------------------------------------------------------ */
	/* truncate
	 * ------------------------------------------------------ */
	$('.truncate-slide-title').truncate();
	$('.truncate-slide-text').truncate();
	$('.truncate-slide-text-ev').truncate();
	$('.truncate-banner-title').truncate();
	$('.truncate-banner-text').truncate();
	$('.card-title').truncate();
	$('.card-text').truncate();


	/* ------------------------------------------------------ */
	/* tooltip
	 * ------------------------------------------------------ */
	$(function () {
		$('[data-toggle="tooltip"]').tooltip({
			animation: true
		});
		/*$('[data-toggle="tooltip"]').on('shown.bs.tooltip', function () {
	        $('.tooltip').addClass('animation transY');
	    });*/
	});

	$('[data-toggle="tooltip"]').each(function () {
		var options = {
			html: true
		};

		if ($(this)[0].hasAttribute('data-type')) {
			options['template'] =
				'<div class="tooltip ' + $(this).attr('data-type') + '" role="tooltip">' +
				'	<div class="arrow"></div>' +
				'	<div class="tooltip-inner"></div>' +
				'</div>';
		}

		$(this).tooltip(options);
	});


	/* ------------------------------------------------------ */
	/* share
	 * ------------------------------------------------------ */
	/*$(".share").on('click', function(e) {
	  $(".fab").removeClass("no");
	  if(e.target != this) return;
	  $('.share, .fab').toggleClass("active");
	});*/

	$("#btn-share").click(function () {
		var shareHtml = "",
			shareUrl = window.location.href,
			el = $(this),
			shareModalTitle = el.data("modal-title"),
			shareModalDescription = el.data("modal-description"),
			shareFacebookLabel = el.data("facebook-label"),
			shareTwitterLabel = el.data("twitter-label"),
			shareTwitterText = el.data("twitter-text"),
			shareEmailLabel = el.data("email-label"),
			shareEmailSubject = el.data("email-subject");

		shareHtml += '<div class="modal fade in text-center" id="modal-share" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">' +
			'<div class="modal-dialog">' +
			'<div class="modal-content">' +
			'<div class="modal-header">' +
			'<div id="close-menu" class="bt-close close" data-dismiss="modal"></div>' +
			'<h3 class="modal-title" id="myModalLabel">' + shareModalTitle + '</h3>';

		if (shareModalDescription != undefined) {
			shareHtml += '<p>' + shareModalDescription + '</p>';
		}

		'</div>' +
		'<div class="modal-body">' +
		'<ul class="list-unstyled">';

		if (shareFacebookLabel != undefined) {
			shareHtml += '<li><a href="https://www.facebook.com/sharer/sharer.php?u=' + shareUrl + '" title="' + shareFacebookLabel + '" target="_blank" class="btn btn-facebook"><i class="icon-facebook"></i> ' + shareFacebookLabel + '</a></li>';
		}
		if (shareTwitterLabel != undefined) {
			shareHtml += '<li><a href="https://twitter.com/intent/tweet?text=' + shareTwitterText + '&url=' + shareUrl + '" title="' + shareTwitterLabel + '" target="_blank" class="btn btn-twitter"><i class="icon-twitter"></i> ' + shareTwitterLabel + '</a></li>';
		}
		if (shareEmailLabel != undefined) {
			shareHtml += '<li><a href="mailto:?subject=' + shareEmailSubject + '" title="' + shareEmailLabel + '" class="btn btn-email"><i class="icon-mail"></i> ' + shareEmailLabel + '</a></li>';
		}

		'</ul>' +
		'</div>' +
		'</div>' +
		'</div>' +
		'</div>';

		$("body").append(shareHtml);

		$('#modal-share').modal()
	});

	/* ------------------------------------------------------ */
	/* Banner 
	 * ------------------------------------------------------ */

	function heroInit(wHeight, wWidth) {
		var winHeight = 600;
		var winWidth = wWidth;
		var heroEl = $('.hero');

		heroEl.height(winHeight); // full height

		var flkty = new Flickity(heroEl[0], {
			cellSelector: '.hero-cell',
			wrapAround: true,
			autoPlay: false,
			prevNextButtons: true
		});

		var backgrounds = $('.hero-cell-bg');

		var docStyle = document.documentElement.style;
		var transformProp = typeof docStyle.transform == 'string' ?
			'transform' : 'WebkitTransform';

		flkty.on('scroll', function () {

			var beginStart = flkty.size.outerWidth * -0.5;
			var beginStop = Math.abs(beginStart);
			var endStart = (flkty.slideableWidth + beginStop) * -1;
			var endStop = (flkty.slideableWidth - beginStop) * -1;
			var parallax = -1 / 3;

			flkty.slides.forEach(function (slide, i) {
				var x = (slide.target + flkty.x) * parallax;

				// Hack for fixing parallax for first and last image
				if (i === backgrounds.length - 1 && flkty.x > beginStart && flkty.x < beginStop) {
					x = (beginStart + flkty.x) * parallax;
				}
				if (i === 0 && flkty.x > endStart && flkty.x < endStop) {
					x = (Math.abs(endStart) + flkty.x) * parallax;
				}

				var img = backgrounds[i];
				img.style[transformProp] = 'translateX(' + x + 'px)';
			});
		});
	}


	var winHeight = $(window).height();
	var winWidth = $(window).width();
	heroInit(winHeight, winWidth);

	/* ------------------------------------------------------ */
	/* Parallax Index
	 * ------------------------------------------------------ */

	// makes the parallax elements
	function parallaxIt() {

		// create variables
		var $fwindow = $(window);
		var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

		// on window scroll event
		$fwindow.on('scroll resize', function () {
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		});

		// for each of content parallax element
		$('[data-type="content"]').each(function (index, e) {
			var $contentObj = $(this);
			var fgOffset = parseInt($contentObj.offset().top);
			var yPos;
			var speed = ($contentObj.data('speed') || 1);

			$fwindow.on('scroll resize', function () {
				yPos = fgOffset - scrollTop / speed;

				$contentObj.css('top', yPos);
			});
		});

		// for each of background parallax element
		$('[data-type="background"]').each(function () {
			var $backgroundObj = $(this);
			var bgOffset = parseInt($backgroundObj.offset().top);
			var yPos;
			var coords;
			var speed = ($backgroundObj.data('speed') || 0);

			$fwindow.on('scroll resize', function () {
				yPos = -((scrollTop - bgOffset) / speed);
				coords = '40% ' + yPos + 'px';

				$backgroundObj.css({
					backgroundPosition: coords
				});
			});
		});

		// triggers winodw scroll for refresh
		$fwindow.trigger('scroll');
	};

	parallaxIt();

	/* ------------------------------------------------------ */
	/* pop up googlemaps
	 * ------------------------------------------------------ */
	var map = null;
	var myMarker;
	var myLatlng;

	function initializeGMap(lat, lng) {
		myLatlng = new google.maps.LatLng(lat, lng);

		var myOptions = {
			zoom: 16,
			zoomControl: true,
			center: myLatlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

		myMarker = new google.maps.Marker({
			position: myLatlng
		});
		myMarker.setMap(map);
	}

	// Re-init map before show modal
	$('#modal-location').on('show.bs.modal', function (event) {
		var button = $(event.relatedTarget);
		initializeGMap(button.data('lat'), button.data('lng'));
		$("#location-map").css("width", "100%");
		$("#map_canvas").css("width", "100%");
	});

	// Trigger map resize event after modal shown
	$('#modal-location').on('shown.bs.modal', function () {
		google.maps.event.trigger(map, "resize");
		map.setCenter(myLatlng);
	});


	/* Back to Top & boton share
	 * ------------------------------------------------------ */
	var clBackToTop = function () {

		var pxShow = 500; // alto en lo que muestro el boton de go-top
		var pxShowShare = 250; // alto en lo que muestro el boton share

		// Show or hide the sticky footer button
		$(window).on('scroll', function () {
			if ($(window).scrollTop() >= pxShowShare) {
				$(".pmd-floating-action").fadeIn(400);
			} else {
				$(".pmd-floating-action").fadeOut(400);
			}
			if ($(window).scrollTop() >= pxShow) {
				$('.pmd-floating-action').css({
					'bottom': '100px'
				});
			} else {
				$('.pmd-floating-action').css({
					'bottom': '30px'
				});
			}

			if ($(window).scrollTop() >= pxShow) {
				$(".go-top").fadeIn(400);
			} else {
				$(".go-top").fadeOut(400);
			}
		});
	};

	$('a[href="#totop"]').click(function () {
		$('html, body').animate({
			scrollTop: 0
		}, 'slow');
		return false;
	});

	/* Animate On Scroll
	 * ------------------------------------------------------ */
	var clAOS = function () {

		AOS.init({
			offset: 200,
			duration: 600,
			easing: 'ease-in-sine',
			delay: 300,
			disable: 'mobile',
			once: true
		});

	};


	/* Initialize
	 * ------------------------------------------------------ */

	clAOS();
	clBackToTop();


	/* Map centros
	 * ------------------------------------------------------ */

	var RRMap = ({
		$listContainer: '',
		mapID: '',
		dataSrc: '',
		infoWindow: '',
		$searchForm: '',
		locationsList: '',
		geocoder: '',
		infowindow: '',
		map: '',
		markers: [],
		customMarker: '',

		/**
		 * Creates a list of markers and plots them to a map.
		 * @param {object} listContainer - The selector for where you want your list to be (ex: $('#listContainer'))
		 * @param {string} dataSrc - The path to your json file
		 * @param {object} searchForm - The selector for your search form (ex: $('#search'))
		 * @param {string} mapAPIKey - The google maps API key
		 * @param {string || object} customMarker - Link to custom marker asset (.png, .jpg, .svg) or a SVG Symbol https://developers.google.com/maps/documentation/javascript/examples/marker-symbol-custom
		 * @param {string} mapID - the ID for your map
		 */
		init: function (listContainer, dataSrc, searchForm, customMarker, mapID) {
			RRMap.customMarker = (customMarker != '') ? customMarker : false;
			if (mapID == '' || typeof mapID === 'undefined') {
				console.error('mapID required');
				return;
			} else {
				RRMap.mapID = mapID;
			}
			if (listContainer == '' || typeof listContainer === 'undefined') {
				console.error('listContainer required');
				return;
			} else {
				RRMap.$listContainer = listContainer;
			}
			if (dataSrc == '' || typeof dataSrc === 'undefined') {
				console.error('dataSrc required');
				return;
			} else {
				RRMap.dataSrc = dataSrc;
			}
			if (searchForm == '' || typeof searchForm === 'undefined') {
				console.error('searchForm required');
				return;
			} else {
				RRMap.$searchForm = searchForm;
			}

			RRMap.geocoder = new google.maps.Geocoder();
			RRMap.infowindow = new google.maps.InfoWindow();
			var latlng = new google.maps.LatLng(4.0000000, -72.0000000);
			var mapOptions = {
				zoom: 13,
				center: latlng
			}
			console.log(RRMap.mapID);
			RRMap.map = new google.maps.Map(document.getElementById(RRMap.mapID), mapOptions);

			RRMap.getData(function (data) {
				var locations = [];
				jQuery.each(data, function (key, value) {
					var location = {};
					location.name = value.name;
					location.address = value.geocode[0].results[0].formatted_address;
					location.hours = value.hours;
					location.phone = value.phone;
					location.link = value.link;
					location.lat = value.geocode[0].results[0].geometry.location.lat;
					location.lng = value.geocode[0].results[0].geometry.location.lng;
					location.guid = RRMap.guid();
					location.latlng = new google.maps.LatLng(location.lat, location.lng);
					locations.push(location);
				});
				google.maps.event.addListener(RRMap.map, 'idle', function (data) {
					jQuery.each(RRMap.markers, function (key, value) {
						if (!RRMap.checkMarkerInView(value)) {
							RRMap.$listContainer.find('li[data-guid=' + value.guid + ']').hide();
						} else {
							RRMap.$listContainer.find('li[data-guid=' + value.guid + ']').show();
						}
					})
				});
				RRMap.locationsList = locations;
				RRMap.filterList('all', locations);
				// console.log('Drop offs initialized');
			})
		},
		/**
		 * Generates a random GUID
		 * @return {string} A random GUID
		 */
		guid: function () {
			var guidString = '';
			for (i = 1; i <= 4; i++) {
				guidString += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
			}
			return guidString;
		},
		/**
		 * Handles search form submission
		 * @param {string} searchTerm - The value coming from the search input
		 */
		onSearchSubmit: function (searchTerm) {
			RRMap.filterList(searchTerm, RRMap.locationsList);

		},
		/**
		 * Filters a given list based on a filter
		 * @param {string} filter - Term to filter list results by. "all" will show all results
		 * @param {array} array - Array to filter 
		 */
		filterList: function (filter, array) {
			RRMap.$listContainer.html('');
			var matchedLocations = [];

			if (filter == 'all') {
				matchedLocations = array;
			} else {
				var rex = new RegExp(filter, 'i');
				matchedLocations = array.filter(function (data) {
					return rex.test(data.name) || rex.test(data.address) || rex.test(data.zip)
				})

			}
			RRMap.createLocation(matchedLocations);

		},
		/**
		 * Checks to see if a given marker is in the viewport
		 * @param {object} marker - A marker object created with google.maps.Marker
		 * @return {bool}
		 */
		checkMarkerInView: function (marker) {
			return RRMap.map.getBounds().contains(marker.getPosition());
		},
		/**
		 * Creates a location in the side container and places a marker on the map
		 * @param {array} data - An array of locations
		 */
		createLocation: function (data) {
			if (RRMap.markers.length > 0) {
				jQuery.each(RRMap.markers, function (key, value) {
					value.setMap(null);
				})
			}
			var bounds = new google.maps.LatLngBounds();
			jQuery.each(data, function (key, value) {
				RRMap.$listContainer.append('<li class="col-12 col-md-6" data-guid="' + value.guid + '"><div class="card"><div class="card-header"><h5>' + value.name + '</h5></div><div class="card-body"><p>' + value.address + '</p><p><b>Telefono:</b> <a href="tel:' + value.phone + '">' + value.phone + '</a></p><p><b>Horario:</b> ' + value.hours + '</p><div class="centered mt-3"><a class="btn button-slider shadow btn-ot" target="_parent" href="' + value.link + '">Ver más Información</a></div></div></div></li>');


				var tmpMarker = new google.maps.Marker({
					map: RRMap.map,
					position: value.latlng,
					guid: value.guid,
					icon: RRMap.customMarker
				})
				google.maps.event.addListener(tmpMarker, 'click', function () {

					var contentString = '<h5>' + value.name + '</h5><br><b>Dirección: </b>' + value.address + '<br><b>Horario: </b>' + value.hours + '<br><div class="centered mt-3"><a class="btn button-slider shadow btn-ot" target="_parent" href="' + value.link + '">Ver más Información</a></div>';

					RRMap.infowindow.setContent(contentString);
					RRMap.infowindow.open(RRMap.map, this);
				});
				bounds.extend(tmpMarker.getPosition());
				RRMap.markers.push(tmpMarker);
			})
			RRMap.map.fitBounds(bounds);
		},
		/**
		 * Clears search / filter (Shows all locations)
		 */
		clearSearch: function () {
			RRMap.$searchForm.find('input[type="text"]').val('');
			RRMap.filterList('all', RRMap.locationsList);
		},
		/**
		 * Gets data from the defined data URL
		 * @param {Requester~requestCallback} callback - Call back to run after data has been fetched
		 */
		getData: function (callback) {
			jQuery.getJSON(RRMap.dataSrc, function (data) {
				callback(data.drops);
			})
		},


	});

	$(function () {
		var bluePin = {
			path: 'M12.212 32v-14.618c2.852 0 5.17-2.318 5.17-5.259s-2.318-5.259-5.17-5.259v-6.864c-6.774 0-12.212 5.526-12.212 12.301 0 2.763 0.891 5.437 2.585 7.577l9.627 12.123z',
			fillColor: '#0051a0',
			fillOpacity: 1,
			scale: 3,
			strokeColor: '#fff',
			strokeWeight: 1
		};
		// 	https://s3-us-west-2.amazonaws.com/s.cdpn.io/169666/custom-rx-pin.svg
		if (typeof RRMap != 'undefined') {
			RRMap.init($('#listContainer'), '../resources/centros.json', $('#mapSearch'), '../resources/custom-AS-pin.svg', 'map');

			$('#searchClear').on('click', function (e) {
				e.preventDefault();
				RRMap.clearSearch();
			})

			$('#mapSearch').on('submit', function (e) {
				e.preventDefault();
				RRMap.onSearchSubmit($('#searchInput').val());
			})
		}

	});



	/* limpiar buscador
	 * ------------------------------------------------------ */

	$('.has-clear input[type="text"]').on('input propertychange', function () {
		var $this = $(this);
		var visible = Boolean($this.val());
		$this.siblings('.form-control-clear').toggleClass('hidden', !visible);
	}).trigger('propertychange');

	$('.form-control-clear').click(function () {
		$(this).siblings('input[type="text"]').val('')
			.trigger('propertychange').focus();
	});




});