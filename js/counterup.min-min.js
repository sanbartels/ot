/*!
 * jquery.counterup.js 2.1.0
 *
 * Copyright 2013, Benjamin Intal http://gambit.ph @bfintal
 * Released under the GPL v2 License
 *
 * Amended by Jeremy Paris, Ciro Mattia Gonano and others
 *
 * Date: Feb 24, 2017
 */
!function(t){"use strict";t.fn.counterUp=function(e){var a=t.extend({time:100,delay:2e3,offset:100,beginAt:0,formatter:!1,context:"window",callback:function(){}},e),n;return this.each((function(){var e=t(this),u={time:t(this).data("counterup-time")||a.time,delay:t(this).data("counterup-delay")||a.delay,offset:t(this).data("counterup-offset")||a.offset,beginAt:t(this).data("counterup-beginat")||a.beginAt,context:t(this).data("counterup-context")||a.context},o=function(){var o=[],r=u.time/u.delay,i=t(this).attr("data-num")?t(this).attr("data-num"):e.text(),c=/[0-9]+,[0-9]+/.test(i),s=((i=i.replace(/,/g,"")).split(".")[1]||[]).length;u.beginAt>i&&(u.beginAt=i);var f=/[0-9]+:[0-9]+:[0-9]+/.test(i);if(f){var l=i.split(":"),d=1;for(n=0;l.length>0;)n+=d*parseInt(l.pop(),10),d*=60}for(var p=r;p>=u.beginAt/i*r;p--){var h=parseFloat(i/r*p).toFixed(s);if(f){h=parseInt(n/r*p);var m=parseInt(h/3600)%24,g=parseInt(h/60)%60,b=parseInt(h%60,10);h=(m<10?"0"+m:m)+":"+(g<10?"0"+g:g)+":"+(b<10?"0"+b:b)}if(c)for(;/(\d+)(\d{3})/.test(h.toString());)h=h.toString().replace(/(\d+)(\d{3})/,"$1,$2");a.formatter&&(h=a.formatter.call(this,h)),o.unshift(h)}e.data("counterup-nums",o),e.text(u.beginAt);var x=function(){e.data("counterup-nums")?(e.html(e.data("counterup-nums").shift()),e.data("counterup-nums").length?setTimeout(e.data("counterup-func"),u.delay):(e.data("counterup-nums",null),e.data("counterup-func",null),a.callback.call(this))):a.callback.call(this)};e.data("counterup-func",x),setTimeout(e.data("counterup-func"),u.delay)};e.waypoint((function(t){o(),this.destroy()}),{offset:u.offset+"%",context:u.context})}))}}(jQuery);