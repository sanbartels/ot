$(document).ready(function() {
    /************** Menu ********************/
    $(document).on('click', '.bt-menu', function(open) {
        open.preventDefault();
        $('body').toggleClass('nav-sidebar-open');
    });

    $(document).on('click', '#close-menu', function(close) {
        close.preventDefault();
        $('body').removeClass('nav-sidebar-open');
    });

    $('.bt-acces, .overlay').click(function() {
        $('body').toggleClass('acces-scroll');
        $('.menu-accesibilidad, .nav-accesibilidad').toggleClass('show');
    });

    $(document).on('click', '#close-menu-acces', function(close) {
        close.preventDefault();
        $('body').removeClass('acces-scroll');
        $('.menu-accesibilidad, .nav-accesibilidad').removeClass('show');
    });

    //detecta la sombra que se genera y si le dan click se cierra
    //esta funcion controla todos los clicks cuando el menu esta deplegado
    $(document).on('click', '.collapse-container', function(close) {
        if ($('body').hasClass('nav-sidebar-open')) {
            var content = window
                .getComputedStyle(document.querySelector('.collapse-container'), ':before')
                .getPropertyValue('opacity');
            if (content == '1') {
                $('body').removeClass('nav-sidebar-open');
            }
        }
    });

    //detecta cambio de ancho de ventana del navegador web
    window.addEventListener('resize', function(event) {
        //console.log(document.body.clientWidth + ' wide by ' + document.body.clientHeight+' high');
        $('body').removeClass('nav-sidebar-open');
        //Scroll logo principal movil
        establecer_scroll();
    });

    //funcionan para estableser el scroll su es mayor a 767px
    function establecer_scroll() {
        if (document.body.clientWidth <= 767) {
            $('.nav-two, .nav-inner-two').attr('data-scroll', 'si');
        } else {
            $('.nav-two, .nav-inner-two').attr('data-scroll', 'no');
        }
    }

    //Menu on Scrolldown y que modifique el logo solo en moviles
    establecer_scroll();
    var lastScrollTop = 0;
    var bandera_logo_inicio = 0;

    $(window).scroll(function() {
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
            if ($('.nav-two, .nav-inner-two').attr('data-scroll') == 'si') {
                var st = window.pageYOffset || document.documentElement.scrollTop;
                if (st > lastScrollTop) {
                    $('.logo-corporativo').addClass('mini_logo');
                } else {
                    $('.logo-corporativo').removeClass('mini_logo');
                }
                lastScrollTop = st;
            }
        } else {
            bandera_logo_inicio++;
        }
    });
    /************** Menu ********************/

    /************** Truncate ********************/
    function fixTextTruncate() {
        console.log('truncate');

        $('.truncate-slide-title').truncate();
        $('.truncate-slide-text').truncate();
        $('.truncate-slide-text-ev').truncate();
        $('.truncate-banner-title').truncate();
        $('.truncate-banner-text').truncate();
        $('.card-title').truncate();
        $('.card-text').truncate();
    }
    fixTextTruncate();
    /************** Truncate ********************/

    /************** Tool tip ********************/
    $(function() {
        $('[data-toggle="tooltip"]').tooltip({
            animation: true,
        });
        /*$('[data-toggle="tooltip"]').on('shown.bs.tooltip', function () {
        $('.tooltip').addClass('animation transY');
    });*/
    });

    $('[data-toggle="tooltip"]').each(function() {
        var options = {
            html: true,
        };

        if ($(this)[0].hasAttribute('data-type')) {
            options['template'] =
                '<div class="tooltip ' +
                $(this).attr('data-type') +
                '" role="tooltip">' +
                '	<div class="arrow"></div>' +
                '	<div class="tooltip-inner"></div>' +
                '</div>';
        }

        $(this).tooltip(options);
    });
    /************** Tool tip ********************/

    /************** Modal Share ********************/
    $(document).on('click', '.btn-share', function() {
        var el = $(this),
            shareUrl = el.data('url'),
            shareModalTitle = el.data('titulo'),
            shareTwitterText = el.data('twitter-text'),
            shareEmailSubject = el.data('email-subject');
        var title_share = '';

        if (shareModalTitle != undefined) {
            $('#modal-share #myModalLabel').html(shareModalTitle);
            title_share = shareModalTitle;
        }

        if (shareUrl != undefined) {
            var link = 'https://www.facebook.com/sharer/sharer.php?u=' + shareUrl;
            $('#modal-share #modal_face').attr('href', link);
        }
        if (shareUrl != undefined) {
            var link = 'https://twitter.com/intent/tweet?text=' + title_share + '&url=' + shareUrl + '&via=AGROSAVIA';
            $('#modal-share #modal_twitter').attr('href', link);
        }
        if (shareUrl != undefined) {
            var link =
                'mailto:?body=Hola, estoy seguro que esto te interesa ' +
                shareUrl +
                '&subject=Te comparto algo interesante de AGROSAVIA';
            $('#modal-share #modal_mail').attr('href', link);
        }
        if (shareUrl != undefined) {
            var link = 'https://api.whatsapp.com/send?text=' + title_share + ' ' + shareUrl;
            $('#modal-share #modal_what').attr('href', link);
        }
        if (shareUrl != undefined) {
            $('#modal-share #modal_copy').attr('href', shareUrl);
        }

        $('#modal-share').modal();
    });

    //Funcion para el boton de copiar
    $(document).on('click', '#modal_copy', function(event) {
        event.preventDefault();
        copy($(this).attr('href'));
    });

    function copy(text_to_copy) {
        var $temp = $('<div>');
        $('body').append($temp);
        $temp
            .attr('contenteditable', true)
            .html(text_to_copy)
            .select()
            .on('focus', function() {
                document.execCommand('selectAll', false, null);
            })
            .focus();
        document.execCommand('copy');
        $temp.remove();
    }
    /************** Share ********************/

    /************** Pop up Mapa dirección Home ********************/
    var map = null;
    var myMarker;
    var myLatlng;

    function initializeGMap(lat, lng) {
        myLatlng = new google.maps.LatLng(lat, lng);

        var myOptions = {
            zoom: 16,
            zoomControl: true,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        };

        map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);

        myMarker = new google.maps.Marker({
            position: myLatlng,
        });
        myMarker.setMap(map);
    }

    // Re-init map before show modal
    $('#modal-info').on('show.bs.modal', function(event) {
        var button = $(event.relatedTarget);
        initializeGMap(button.data('lat'), button.data('lng'));
        $('#location-map').css('width', '100%');
        $('#map_canvas').css('width', '100%');
    });

    // Trigger map resize event after modal shown
    $('#modal-info').on('shown.bs.modal', function() {
        google.maps.event.trigger(map, 'resize');
        map.setCenter(myLatlng);
    });
    /************** Pop up Mapa direcci�n Home ********************/

    /************** Back to Top & boton share ********************/
    var showHideToTopAndShare = function() {
        // alto en lo que muestro el boton
        var pxShow = 500; // alto en lo que muestro el boton de go-top
        var pxShowShare = 250; // alto en lo que muestro el boton share
        // Show or hide the sticky footer button
        $(window).on('scroll', function() {
            if ($(window).scrollTop() >= pxShowShare) {
                $('.pmd-floating-action').fadeIn(400);
            } else {
                $('.pmd-floating-action').fadeOut(400);
            }
            if ($(window).scrollTop() >= pxShow) {
                $('.pmd-floating-action').css({
                    bottom: '100px',
                });
            } else {
                $('.pmd-floating-action').css({
                    bottom: '30px',
                });
            }

            if ($(window).scrollTop() >= pxShow) {
                $('.go-top').fadeIn(400);
            } else {
                $('.go-top').fadeOut(400);
            }
        });
    };
    //Call to Top
    $('a[href="#totop"]').click(function() {
        $('html, body').animate(
            {
                scrollTop: 0,
            },
            'slow',
        );
        return false;
    });

    showHideToTopAndShare();
    /************** Back to Top & boton share ********************/

    /**************  Animate On Scroll ********************/
    var clAOS = function() {
        AOS.init({
            offset: 200,
            duration: 600,
            easing: 'ease-in-sine',
            delay: 300,
            disable: 'mobile',
            once: true,
        });
    };
    clAOS();
    /**************  Animate On Scroll ********************/

    /************** Flickity ********************/
    // external js: flickity.pkgd.js

    var carouselContainers = document.querySelectorAll('.carousel-container');
    var reference_flkty = null;

    if (carouselContainers.length > 0) {
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
                contain: true,
                pageDots: false,
                draggable: false,
                friction: 0.2,
                touchVerticalScroll: false,
                pauseAutoPlayOnHover: true,
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
    }

    /******************** Flickity ********************/

    /******************** Banner ********************/
    function heroInit(wHeight, wWidth) {
        var winHeight = 600;
        var winWidth = wWidth;
        var heroEl = $('.hero');

        if (heroEl.length > 0) {
            // full height
            // heroEl.height(winHeight);

            var flkty = new Flickity(heroEl[0], {
                cellSelector: '.hero-cell',
                wrapAround: true,
                autoPlay: false,
                prevNextButtons: true,
                autoPlay: 4000,
            });

            var backgrounds = $('.hero-cell-bg');

            var docStyle = document.documentElement.style;
            var transformProp = typeof docStyle.transform == 'string' ? 'transform' : 'WebkitTransform';

            flkty.on('scroll', function() {
                var beginStart = flkty.size.outerWidth * -0.5;
                var beginStop = Math.abs(beginStart);
                var endStart = (flkty.slideableWidth + beginStop) * -1;
                var endStop = (flkty.slideableWidth - beginStop) * -1;
                var parallax = -1 / 3;

                flkty.slides.forEach(function(slide, i) {
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
    }

    var winHeight = $(window).height();
    var winWidth = $(window).width();
    heroInit(winHeight, winWidth);
    /******************** Banner ********************/

    /******************** SUBMENU with flickity ********************/
    $('.sub-nav').flickity({
        cellAlign: 'left',
        contain: true,
        prevNextButtons: false,
        freeScroll: true,
        pageDots: false,
    });
    /******************** fin SUBMENU with flickity ********************/

    /******************** Parallax ********************/
    //index
    function parallaxIt() {
        // create variables
        var $fwindow = $(window);
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // on window scroll event
        $fwindow.on('scroll resize', function() {
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        });

        // for each of content parallax element
        $('[data-type="content"]').each(function(index, e) {
            var $contentObj = $(this);
            var fgOffset = parseInt($contentObj.offset().top);
            var yPos;
            var speed = $contentObj.data('speed') || 1;

            $fwindow.on('scroll resize', function() {
                yPos = fgOffset - scrollTop / speed;

                $contentObj.css('top', yPos);
            });
        });

        // for each of background parallax element
        $('[data-type="background"]').each(function() {
            var $backgroundObj = $(this);
            var bgOffset = parseInt($backgroundObj.offset().top);
            var yPos;
            var coords;
            var speed = $backgroundObj.data('speed') || 0;

            $fwindow.on('scroll resize', function() {
                yPos = -((scrollTop - bgOffset) / speed);
                coords = '40% ' + yPos + 'px';

                $backgroundObj.css({
                    backgroundPosition: coords,
                });
            });
        });

        // triggers winodw scroll for refresh
        $fwindow.trigger('scroll');
    }

    parallaxIt();

    // interno
    $(window).scroll(function() {
        var barra = $(window).scrollTop();
        //var key = barra * $(".page-header-bg").attr("data-speed");
        var key0 = barra * 0.001;
        var key1 = barra * 0;
        var key2 = barra * -0.12;
        var key3 = barra * -0.5;
        var key4 = barra * -0.6;
        var key5 = barra * -0.7;
        var key6 = barra * 0.1;

        if (barra <= 370) {
            /*$('.page-header-bg').css({
				'background-position-y': +key2 + 'px'
			});
			$('.page-header-title').css({
				'transform': 'translateY(' + key6 + '%)'
			});*/
            var alphaBg = 1 - barra / 350;
            $('.page-header-title').css('opacity', alphaBg);
        }

        /************** Nav Interno *****************/
        if (barra > 750) {
            $('.toc-wrapper').addClass('pinned');
            $('.toc-wrapper').removeClass('pin-top');
        } else {
            $('.toc-wrapper').addClass('pin-top');
            $('.toc-wrapper').removeClass('pinned');
        }
    });

    /******************** Parallax ********************/

    /******************** Mapa centros ********************/
    var RRMap = {
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
        init: function(listContainer, dataSrc, searchForm, customMarker, mapID) {
            RRMap.customMarker = customMarker != '' ? customMarker : false;
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
            var latlng = new google.maps.LatLng(4.0, -72.0);
            var mapOptions = {
                zoom: 13,
                center: latlng,
            };
            console.log(RRMap.mapID);
            RRMap.map = new google.maps.Map(document.getElementById(RRMap.mapID), mapOptions);

            RRMap.getData(function(data) {
                var locations = [];
                jQuery.each(data, function(key, value) {
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
                google.maps.event.addListener(RRMap.map, 'idle', function(data) {
                    jQuery.each(RRMap.markers, function(key, value) {
                        if (!RRMap.checkMarkerInView(value)) {
                            RRMap.$listContainer.find('li[data-guid=' + value.guid + ']').hide();
                        } else {
                            RRMap.$listContainer.find('li[data-guid=' + value.guid + ']').show();
                        }
                    });
                });
                RRMap.locationsList = locations;
                RRMap.filterList('all', locations);
                // console.log('Drop offs initialized');
            });
        },
        /**
         * Generates a random GUID
         * @return {string} A random GUID
         */
        guid: function() {
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
        onSearchSubmit: function(searchTerm) {
            RRMap.filterList(searchTerm, RRMap.locationsList);
        },
        /**
         * Filters a given list based on a filter
         * @param {string} filter - Term to filter list results by. "all" will show all results
         * @param {array} array - Array to filter
         */
        filterList: function(filter, array) {
            RRMap.$listContainer.html('');
            var matchedLocations = [];

            if (filter == 'all') {
                matchedLocations = array;
            } else {
                var rex = new RegExp(filter, 'i');
                matchedLocations = array.filter(function(data) {
                    return rex.test(data.name) || rex.test(data.address) || rex.test(data.zip);
                });
            }
            RRMap.createLocation(matchedLocations);
        },
        /**
         * Checks to see if a given marker is in the viewport
         * @param {object} marker - A marker object created with google.maps.Marker
         * @return {bool}
         */
        checkMarkerInView: function(marker) {
            return RRMap.map.getBounds().contains(marker.getPosition());
        },
        /**
         * Creates a location in the side container and places a marker on the map
         * @param {array} data - An array of locations
         */
        createLocation: function(data) {
            if (RRMap.markers.length > 0) {
                jQuery.each(RRMap.markers, function(key, value) {
                    value.setMap(null);
                });
            }
            var bounds = new google.maps.LatLngBounds();
            jQuery.each(data, function(key, value) {
                RRMap.$listContainer.append(
                    '<li class="col-12 col-md-6" data-guid="' +
                        value.guid +
                        '"><div class="card"><div class="card-header"><h5>' +
                        value.name +
                        '</h5></div><div class="card-body"><p>' +
                        value.address +
                        '</p><p><b>Telefono:</b> <a href="tel:' +
                        value.phone +
                        '">' +
                        value.phone +
                        '</a></p><p><b>Horario:</b> ' +
                        value.hours +
                        '</p><div class="centered mt-3"><a class="btn button-slider shadow btn-ot" target="_parent" href="' +
                        value.link +
                        '">Ver más Información</a></div></div></div></li>',
                );

                var tmpMarker = new google.maps.Marker({
                    map: RRMap.map,
                    position: value.latlng,
                    guid: value.guid,
                    icon: RRMap.customMarker,
                });
                google.maps.event.addListener(tmpMarker, 'click', function() {
                    var contentString =
                        '<h5>' +
                        value.name +
                        '</h5><br><b>Dirección: </b>' +
                        value.address +
                        '<br><b>Horario: </b>' +
                        value.hours +
                        '<br><div class="centered mt-3"><a class="btn button-slider shadow btn-ot" target="_parent" href="' +
                        value.link +
                        '">Ver más Información</a></div>';

                    RRMap.infowindow.setContent(contentString);
                    RRMap.infowindow.open(RRMap.map, this);
                });
                bounds.extend(tmpMarker.getPosition());
                RRMap.markers.push(tmpMarker);
            });
            RRMap.map.fitBounds(bounds);
        },
        /**
         * Clears search / filter (Shows all locations)
         */
        clearSearch: function() {
            RRMap.$searchForm.find('input[type="text"]').val('');
            RRMap.filterList('all', RRMap.locationsList);
        },
        /**
         * Gets data from the defined data URL
         * @param {Requester~requestCallback} callback - Call back to run after data has been fetched
         */
        getData: function(callback) {
            jQuery.getJSON(RRMap.dataSrc, function(data) {
                callback(data.drops);
            });
        },
    };

    $(function() {
        var bluePin = {
            path:
                'M12.212 32v-14.618c2.852 0 5.17-2.318 5.17-5.259s-2.318-5.259-5.17-5.259v-6.864c-6.774 0-12.212 5.526-12.212 12.301 0 2.763 0.891 5.437 2.585 7.577l9.627 12.123z',
            fillColor: '#0051a0',
            fillOpacity: 1,
            scale: 3,
            strokeColor: '#fff',
            strokeWeight: 1,
        };

        if (typeof RRMap != 'undefined') {
            RRMap.init(
                $('#listContainer'),
                '../resources/centros.json',
                $('#mapSearch'),
                '../resources/custom-AS-pin.svg',
                'map',
            );

            $('#searchClear').on('click', function(e) {
                e.preventDefault();
                RRMap.clearSearch();
            });

            $('#mapSearch').on('submit', function(e) {
                e.preventDefault();
                RRMap.onSearchSubmit($('#searchInput').val());
            });
        }
    });

    // reiniciar buscador

    $('.has-clear input[type="text"]')
        .on('input propertychange', function() {
            var $this = $(this);
            var visible = Boolean($this.val());
            $this.siblings('.form-control-clear').toggleClass('hidden', !visible);
        })
        .trigger('propertychange');

    $('.form-control-clear').click(function() {
        $(this)
            .siblings('input[type="text"]')
            .val('')
            .trigger('propertychange')
            .focus();
    });
    /******************** Mapa centros ********************/

    /******************** Scroll lateral ********************/
    // duración de la animacion del scroll
    var scrollDuration = 300;
    // paddles
    var leftPaddle = document.getElementsByClassName('left-paddle');
    var rightPaddle = document.getElementsByClassName('right-paddle');
    // get items dimensions
    var itemsLength = $('.group').length;
    var itemSize = $('.group').outerWidth(true);
    // get some relevant size for the paddle triggering point
    var paddleMargin = 75;
    // get wrapper width
    var getMenuWrapperSize = function() {
        return $('.nav-filter').outerWidth();
    };
    var menuWrapperSize = getMenuWrapperSize();
    // the wrapper is responsive
    $(window).on('resize', function() {
        menuWrapperSize = getMenuWrapperSize();
    });
    // size of the visible part of the menu is equal as the wrapper size
    var menuVisibleSize = menuWrapperSize;

    // get total width of all menu items
    var getMenuSize = function() {
        return itemsLength * itemSize;
    };
    var menuSize = getMenuSize();
    // get how much of menu is invisible
    var menuInvisibleSize = menuSize - menuWrapperSize;
    //console.log("tamaño menu", menuSize);
    // get how much have we scrolled to the left
    var getMenuPosition = function() {
        return $('.navbar-nav-scroll').scrollLeft();
    };

    // finally, what happens when we are actually scrolling the menu
    $('.navbar-nav-scroll').on('scroll', function() {
        // get how much of menu is invisible
        menuInvisibleSize = menuSize - menuWrapperSize;
        // get how much have we scrolled so far
        var menuPosition = getMenuPosition();

        var menuEndOffset = menuInvisibleSize - paddleMargin;

        // show & hide the paddles
        // depending on scroll position
        if (menuPosition <= paddleMargin) {
            $(leftPaddle).addClass('hidden');
            $(rightPaddle).removeClass('hidden');
        } else if (menuPosition < menuEndOffset) {
            // show both paddles in the middle
            $(leftPaddle).removeClass('hidden');
            $(rightPaddle).removeClass('hidden');
        } else if (menuPosition >= menuEndOffset) {
            $(leftPaddle).removeClass('hidden');
            $(rightPaddle).addClass('hidden');
        }
    });

    // scroll to left
    $(rightPaddle).on('click', function() {
        $('.navbar-nav-scroll').animate(
            {
                scrollLeft: menuInvisibleSize + 55,
            },
            scrollDuration,
        );
    });

    // scroll to right
    $(leftPaddle).on('click', function() {
        $('.navbar-nav-scroll').animate(
            {
                scrollLeft: '0',
            },
            scrollDuration,
        );
    });
    /******************** Scroll lateral ********************/

    /******************** Atencion al usuario ********************/
    $('.option-tasks').change(function() {
        val = $('input:radio[name=opciones]:checked').val();
        //alert(val)
        $('.custom-control-input').each(function(i) {
            i++;
            if (i == val) $('.op' + i).slideDown(500);
            else $('.op' + i).hide('slow');
        });
    });
    $(document).on('click', '#check-solicitud-anonima', function() {
        if ($('#check-solicitud-anonima').is(':checked')) {
            var el = $(this),
                optionModalTitle = el.data('titulo'),
                optionModalText = el.data('texto');
            var title_option = '';
            var text_option = '';

            if (optionModalTitle != undefined) {
                $('#modal-info #op-title').html(optionModalTitle);
                title_option = optionModalTitle;
            }

            if (optionModalText != undefined) {
                $('#modal-info #op-text').html(optionModalText);
                text_option = optionModalText;
            }

            $('#modal-info').modal();
        }
    });

    $(document).on('click', 'input:radio[name=opciones]:checked', function() {
        var el = $(this),
            optionModalTitle = el.data('option-titulo'),
            optionModalText = el.data('option-text');
        var title_option = '';
        var text_option = '';

        if (optionModalTitle != undefined) {
            $('#modal-info #op-title').html(optionModalTitle);
            title_option = optionModalTitle;
        }

        if (optionModalText != undefined) {
            $('#modal-info #op-text').html(optionModalText);
            text_option = optionModalText;
        }

        $('#modal-info').modal();
    });

    // opciones grupo poblacional minoritario
    $(document).on('change', '.target', function() {
        //atencion al usuario
        if ($(this).val() == 'minorias') {
            $('#minorias').slideDown(500);
        } else {
            $('#minorias').slideUp(500);
        }
        //bac-servicios
        if ($(this).val() == 'dsi') {
            $('#dsi').slideDown(500);
        } else {
            $('#dsi').slideUp(500);
        }
        //bancosGermoplasma-solicitudes
        if ($(this).val() == 'interno') {
            $('#invInterno').slideDown(500);
        } else {
            $('#invInterno').slideUp(500);
        }
        if ($(this).val() == 'colaborativo') {
            $('#invColaborativo').slideDown(500);
        } else {
            $('#invColaborativo').slideUp(500);
        }
        if ($(this).val() == 'externo') {
            $('#invExterno').slideDown(500);
        } else {
            $('#invExterno').slideUp(500);
        }
        //formulario - eventos pre inscripción
        if ($(this).val() == 'at') {
            $('#asistecnico').slideDown(500);
        } else {
            $('#asistecnico').slideUp(500);
        }
        if ($(this).val() == 'In') {
            $('#investigador').slideDown(500);
        } else {
            $('#investigador').slideUp(500);
        }
        if ($(this).val() == 'GoGr') {
            $('#goGre').slideDown(500);
        } else {
            $('#goGre').slideUp(500);
        }
        if ($(this).val() == 'Est') {
            $('#estudiante').slideDown(500);
        } else {
            $('#estudiante').slideUp(500);
        }
        if ($(this).val() == 'otro-inst') {
            $('#otraInst').slideDown(500);
        } else {
            $('#otraInst').slideUp(500);
        }
        if ($(this).val() == 'otr') {
            $('#otrasOcupaciones').slideDown(500);
        } else {
            $('#otrasOcupaciones').slideUp(500);
        }
    });

    $(document).on('change', '.target-int', function() {
        //formulario - eventos pre inscripción -interna
        if ($(this).val() == 'otro-inst') {
            $('#otraInst')
                .slideDown(500)
                .removeClass('hidden');
        } else {
            $('#otraInst').slideUp(500);
        }
    });

    /******************** accordion FAQ atencion al usuario *******************/

    $('.collapse.in')
        .prev('.card-header')
        .addClass('active');
    $('#accordion')
        .on('show.bs.collapse', function(a) {
            $(a.target)
                .prev('.card-header')
                .addClass('active');
        })
        .on('hide.bs.collapse', function(a) {
            $(a.target)
                .prev('.card-header')
                .removeClass('active');
        });

    /******************** fin accordion FAQ atencion al usuario ********************/

    /******************** fin Atencion al usuario ********************/

    /******************** bar chart redes/mec ********************/

    $('.bars li .bar').each(function(key, bar) {
        var percentage = $(this).data('percentage');

        $(this).animate(
            {
                height: percentage + '%',
            },
            1000,
        );
    });

    $('.bars li .bar-mec').each(function(key, bar) {
        var percentage = $(this).data('percentage') / 200;

        $(this).animate(
            {
                height: percentage + '%',
            },
            1000,
        );
    });

    /******************** fin bar chart redes ********************/

    /******************** animacion card nuestros grupos ********************/
    $('.post-module').hover(function() {
        $(this)
            .find('.description')
            .stop()
            .animate(
                {
                    height: 'toggle',
                    opacity: 'toggle',
                },
                300,
            );
    });
    /******************** fin animacion card nuestros grupos ********************/

    /******************** smooth scrollspy ********************/
    $(".clasificacion ul li a[href^='#'], .entry-text .btn").on('click', function(e) {
        // prevent default anchor click behavior
        e.preventDefault();

        // store hash
        var hash = this.hash;

        // animate
        $('html, body').animate(
            {
                scrollTop: $(hash).offset().top - 105,
            },
            1000,
            function() {
                // when done, add hash to url
                // (default click behaviour)
                window.location.hash = hash;
            },
        );
    });

    /********* smooth scroll target accordion ********/
    $('#accordion').on('shown.bs.collapse', function(e) {
        $('html, body').animate(
            {
                scrollTop:
                    $(e.target)
                        .prev()
                        .offset().top - 105,
            },
            400,
        );
    });
    /******************** fin smooth scrollspy ********************/

    /******************** Modal Video ********************/
    // Gets the video src from the data-src on each button
    var $videoSrc;
    $(document).on('click', '.video-btn', function(event) {
        event.preventDefault();
        console.log('holis');
        $videoSrc = $(this).data('src');
        //console.log("url video", $videoSrc);

        if ($videoSrc != undefined) {
            //$("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
            $(this)
                .parent()
                .find('.embed-responsive-item')
                .attr('src', $videoSrc + '?autoplay=1&amp;modestbranding=1&amp;showinfo=0');
        }
    });

    $('[id^="videoModal-"],[id *= "videoModal-"]').on('hide.bs.modal', function(e) {
        $(this)
            .parent()
            .find('.embed-responsive-item')
            .attr('src', $videoSrc);
        //console.log("url video hide", $videoSrc);
    });
    /******************** fin Modal Video ********************/

    /******************** cambio BG cards Data-bg ********************/
    $('.bg-change').each(function() {
        var color = $(this).data('bg');
        $(this).css('background', color);
    });

    /*** cambio BG cards Data-bg y BG pestaña -> estilo al before  ***/
    var UID = {
        _current: 0,
        getNew: function() {
            this._current++;
            return this._current;
        },
    };

    $('.bg-ch-bef').each(function() {
        var color = $(this).data('bg');
        $(this).css('background', color);

        // darken color
        var lightenDarkenColor = function(col, amt) {
            var usePound = false;
            if (col[0] == '#') {
                col = col.slice(1);
                usePound = true;
            }
            var num = parseInt(col, 16);
            var r = (num >> 16) + amt;
            if (r > 255) {
                r = 255;
            } else if (r < 0) {
                r = 0;
            }
            var b = ((num >> 8) & 0x00ff) + amt;
            if (b > 255) {
                b = 255;
            } else if (b < 0) {
                b = 0;
            }
            var g = (num & 0x0000ff) + amt;
            if (g > 255) {
                g = 255;
            } else if (g < 0) {
                g = 0;
            }
            return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
        };
        // fin darken color

        HTMLElement.prototype.pseudoStyle = function(element, prop, value) {
            var _this = this;
            var _sheetId = 'pseudoStyles';
            var _head = document.head || document.getElementsByTagName('head')[0];
            var _sheet = document.getElementById(_sheetId) || document.createElement('style');
            _sheet.id = _sheetId;
            var className = 'pseudoStyle' + UID.getNew();

            _this.className += ' ' + className;

            _sheet.innerHTML += '\n.' + className + ':' + element + '{' + prop + ':' + value + '}';
            _head.appendChild(_sheet);
            return this;
        };
        var div = $(this);

        div[0].pseudoStyle('before', 'color', lightenDarkenColor(color, -20));
    });
    /**** fin cambio BG cards Data-bg y BG pestaña -> estilo al before  ***/
    /******************** fin cambio BG cards Data-bg ********************/

    /******************** buscador general ********************/

    (function() {
        'use strict';

        var $searchView = $('.menu-search-container');
        var $menu = $('.bt-buscador, .accesibilidad > .btn-nav-sup');
        var $fadeScreen = $('.fade-screen');

        $('.buscador, .fade-screen, .menu-search-close').on('click', function(e) {
            $searchView.toggleClass('active');

            setTimeout(function() {
                $searchView
                    .children()
                    .find('input')
                    .focus();
            }, 1100);

            $fadeScreen.toggleClass('visible');
            $menu.removeClass('is-closed');
            $menu.toggleClass('hidden');

            e.preventDefault();
        });

        $('.fade-screen,.menu-search-close').on('click', function(e) {
            $menu.toggleClass('is-closed');
            e.preventDefault();
        });
    })();

    /******************** fin buscador general ********************/

    /******************** botones accesibilidad ********************/
    var sizeText = localStorage.getItem('sizeText');
    var fontSize = parseInt(sizeText != null ? sizeText : 16);
    var colorPage = localStorage.getItem('colorPage');

    $('body, .btn-nav-sup').css('font-size', fontSize + 'px');

    /* incrementa texto */
    $('#increase-text').click(function() {
        if (fontSize >= 20) {
            return false;
        } else {
            fontSize = fontSize + 2;
            localStorage.setItem('sizeText', fontSize);
            $('body, .btn-nav-sup').css('font-size', fontSize + 'px');
            //console.log("la fuenta incrementada es ", fontSize);
        }
        fixTextTruncate();
    });

    /* disminuye texto */
    $('#decrease-text').click(function() {
        if (fontSize <= 14) {
            return false;
        } else {
            fontSize = fontSize - 2;
            localStorage.setItem('sizeText', fontSize);
            $('body, .btn-nav-sup').css('font-size', fontSize + 'px');
            //console.log('- ' + fontSize);
        }
        fixTextTruncate();
    });

    function setColorPage(colorPage) {
        if (colorPage != null) {
            if (colorPage == 'Normal') {
                $('body').removeClass('contrast-white');
                $('body').removeClass('contrast-black');
            } else {
                $('body').removeClass('contrast-white');
                $('body').removeClass('contrast-black');
                $('body').addClass(colorPage);
            }
        } else {
            $('body').removeClass('contrast-white');
            $('body').removeClass('contrast-black');
        }
    }
    setColorPage(colorPage);

    /* Default */
    $('#normal-text').click(function() {
        localStorage.setItem('colorPage', 'Normal');
        setColorPage('Normal');
    });

    /* Contrast Black */
    $('#contrast-b').click(function() {
        localStorage.setItem('colorPage', 'contrast-black');
        setColorPage(localStorage.getItem('colorPage'));
    });

    /* Contrast White */
    $('#contrast-w').click(function() {
        localStorage.setItem('colorPage', 'contrast-white');
        setColorPage(localStorage.getItem('colorPage'));
    });

    /******************** fin botones accesibilidad ********************/

    /******************** Preloader ********************/
    $('.preloading-logo').fadeOut();
    $('#preloder')
        .delay(400)
        .fadeOut('slow');
    /******************** fin Preloader ********************/

    /******************** Colección taxonómica ********************/
    /*$(".showInfo").click(function () {
		$(this).siblings('div').toggleClass('d-none');
	});*/

    // Ejemplo 3 https://leafletjs.com
    var planes = [
        ['7C6B07', -40.99497, 174.50808],
        ['7C6B38', -41.30269, 173.63696],
        ['7C6CA1', -41.49413, 173.5421],
        ['7C6CA2', -40.98585, 174.50659],
        ['C81D9D', -40.93163, 173.81726],
        ['C82009', -41.5183, 174.78081],
        ['C82081', -41.42079, 173.5783],
        ['C820AB', -42.08414, 173.96632],
        ['C820B6', -41.51285, 173.53274],
    ];

    var map = L.map('mapaBichos').setView([-41.3058, 174.82082], 8);
    mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; ' + mapLink + ' Contributors',
        maxZoom: 18,
    }).addTo(map);

    for (var i = 0; i < planes.length; i++) {
        marker = new L.marker([planes[i][1], planes[i][2]]).bindPopup(planes[i][0]).addTo(map);
    }

    /******************** Colección taxonómica ********************/
});
