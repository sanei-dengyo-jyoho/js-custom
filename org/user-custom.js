jQuery.noConflict();
jQuery(document).ready(function() {
	// 固定ナビゲーション
	var fixed = 'nav-fixed';
	var nav = jQuery('#nav');
	var offset = nav.offset().top + 200;
	var top;
	var duration = 1000;
	// 固定クラスを追加
	jQuery(window).scroll(function() {
		top = jQuery(this).scrollTop();
		if ((typeof top !== 'undefined') && (top !== '')) {
			if (top >= offset) {
				jQuery(nav).addClass(fixed, duration)
			} else {
				if (top <= offset) {
					jQuery(nav).removeClass(fixed, duration)
				}
			}
		}
	});
	// サブメニューを有効化
	jQuery(nav).find('li').hover(function() {
		jQuery(this).find('ul').slideDown()
	}, function() {
		jQuery(this).find('ul').slideUp()
	});
});
