jQuery.noConflict();
// GoogleMapsの選択
var googlemap = 
{
	selectaddr:
	function($addrdiv, $dt, $mapiframe) {
		if ($addrdiv.data('$lastselecteddt')) {
			$addrdiv.data('$lastselecteddt').removeClass('selected');
		}
		$dt.addClass('selected');
		// <iframe>コンテナーの移動先を算出
		tmp_entry_h = jQuery('#mapcontainer').height();
		tmp_iframe_h = jQuery('#mapiframe').height() + $dt.height();
		tmp_iframe_p = $dt.position().top + tmp_iframe_h;
		if (tmp_iframe_p > tmp_entry_h) {
			tmp_pos_top = tmp_entry_h - tmp_iframe_h;
		} else {
			tmp_pos_top = $dt.position().top;
		}
		// <iframe>コンテナーを移動
		jQuery('#mapiframe').stop().animate({'top' : tmp_pos_top , 'opacity' : '1'}, 'middle');
		// <iframe>に住所を入れる
		window.frames[$mapiframe.attr('name')].location.replace($dt.data('addr'));
		// リンク先を埋め込む
		$mapiframe.data('$largemaplink').attr('href', $dt.data('addr').replace('&output=embed', ''));
		$addrdiv.data('$lastselecteddt', $dt);
		// タイトルを設定
		jQuery('#maptitle').text($dt.text()+'のマップ');
	},

	init:
	function(addrwrapper, mapwrapper, persist) {
		jQuery(function($) {
			var $mapdiv = $('#'+mapwrapper);
			var $mapiframe = $mapdiv.find('iframe:eq(0)');
			var $addrdiv = $('#'+addrwrapper);
			var $dts = $addrdiv.find('dl.location:eq(0)').find('dt');
			var mapiframetarget = $mapiframe.attr('name');
			// <a class="largermap">を探す
			var $largemaplink = $mapdiv.find('a.largermap');
			// リンク先をdata()に格納
			$mapiframe.data('$largemaplink', $largemaplink);
			// dt内のGoogleMapsリンクを探す
			$dts.each(function() {
				var $dt = $(this);
				var $address = $dt.find('a[href^="http://maps.google.com"]');
				// 属性追加
				$address.each(function() {
					var $addr = $(this);
					$addr.attr({ href:this.getAttribute('href')+'&output=embed', target:mapiframetarget });
					// GoogleMapsをロード
					// ... 切り替え時のリクエストでページのロード時間を抑える
					$addr.click(function(e) {
						googlemap.selectaddr($addrdiv, $dt, $mapiframe);
						e.preventDefault();
					});
				});
				// 属性追加
				$dt.data('addr', $address.eq(0).attr('href'));
				if ($dt.hasClass('selected')) {
					googlemap.selectaddr($addrdiv, $dt, $mapiframe);
					$addrdiv.data('$lastselecteddt', $dt);
					return;
				}
			});
		});
	}
}
googlemap.init('addrcolumn', 'mapcolumn');
