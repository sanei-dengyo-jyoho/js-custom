jQuery.noConflict();var googlemap={selectaddr:function(a,b,c){if(a.data("$lastselecteddt")){a.data("$lastselecteddt").removeClass("selected")}b.addClass("selected");tmp_entry_h=jQuery("#mapcontainer").height();tmp_iframe_h=jQuery("#mapiframe").height()+b.height();tmp_iframe_p=b.position().top+tmp_iframe_h;if(tmp_iframe_p>tmp_entry_h){tmp_pos_top=tmp_entry_h-tmp_iframe_h}else{tmp_pos_top=b.position().top}jQuery("#mapiframe").stop().animate({top:tmp_pos_top,opacity:"1"},"middle");window.frames[c.attr("name")].location.replace(b.data("addr"));c.data("$largemaplink").attr("href",b.data("addr").replace("&output=embed",""));a.data("$lastselecteddt",b);jQuery("#maptitle").text(b.text()+"のマップ")},init:function(b,a,c){jQuery(function(h){var j=h("#"+a);var i=j.find("iframe:eq(0)");var d=h("#"+b);var g=d.find("dl.location:eq(0)").find("dt");var f=i.attr("name");var e=j.find("a.largermap");i.data("$largemaplink",e);g.each(function(){var k=h(this);var l=k.find('a[href^="http://maps.google.com"]');l.each(function(){var m=h(this);m.attr({href:this.getAttribute("href")+"&output=embed",target:f});m.click(function(n){googlemap.selectaddr(d,k,i);n.preventDefault()})});k.data("addr",l.eq(0).attr("href"));if(k.hasClass("selected")){googlemap.selectaddr(d,k,i);d.data("$lastselecteddt",k);return}})})}};googlemap.init("addrcolumn","mapcolumn");