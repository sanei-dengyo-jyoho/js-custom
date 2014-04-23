google.load('visualization', '1', {packages:['orgchart']});
// 組織図
google.setOnLoadCallback(drawChart);
function drawChart() {
	var i = 0;
	var data = new google.visualization.DataTable();
	// 列を追加
	data.addColumn('string', 'Name');
	data.addColumn('string', 'Parent');
	// 行を追加
	data.addRows([
		[{v:'最高経営層', f:'最高経営層'}, ''],
			[{v:'環境管理責任者', f:'環境管理責任者'}, '最高経営層'],
				[{v:'環境マネジメントシステム事務局', f:'環境マネジメントシステム事務局<div style="font-size:.9em; font-style:italic;">事務局長：野口　政春<br />事務局：辻　博志、笠井　君夫、松本　悠衣</div>'}, '環境管理責任者'],
					[{v:'環境内部監査組織', f:'環境内部監査組織<div>内部監査統括責任者<br />主任内部監査員<br />内部監査員</div>'}, '環境マネジメントシステム事務局'],
			[{v:'部署環境管理責任者', f:'部署環境管理責任者'}, '最高経営層'],
				[{v:'部署環境管理推進委員', f:'部署環境管理推進委員'}, '部署環境管理責任者'],
					[{v:'部署環境管理推進員', f:'部署環境管理推進員'}, '部署環境管理推進委員'],
					[{v:'グループ環境推進員', f:'グループ環境推進員'}, '部署環境管理推進員'],
						[{v:'全社員', f:'全社員'}, 'グループ環境推進員']
	]);
	// 行数分の属性を設定
	for (i = 0; i < data.getNumberOfRows(); i++) {
		data.setRowProperty(i, 'selectedStyle', 'background-color: #D6E9F8; border: 2px solid #B5D9EA;');
		data.setRowProperty(i, 'style', 'background-color: #EDF7FF; border: 2px solid #B5D9EA;');
	}
	// チャートを描画
	var chart = new google.visualization.OrgChart(document.getElementById('gchart_org'));
	chart.draw(data, {allowHtml:true, size:'small'});
	// 変数を破棄
	delete data;
	delete chart;
	delete i;
}