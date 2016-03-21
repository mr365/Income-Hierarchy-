var behaviour_data = d3.csv("behaviour_survey.csv", function(err, data){
  if (err) throw err;
});

d3.csv("Country_income.csv", function(err, data){
  if (err) throw err;

  var fill = d3.scale.category10();

  var width = 960,
    height = 600;


  var high_income_nonOECD = 0;
  var high_income_OECD = 0;
  var upper_middle_income = 0;
  var lower_middle_income = 0;
  var low_income = 0;
  var no_level = 0;
  var nonOECD_list = [];
  var OECD_list = [];
  var umi_list = [];
  var lmi_list = [];
  var li_list = [];
  var nc_list = [];

  var svg = d3.select('body').append('svg')
  	.attr('width', width)
  	.attr('height', height);

  function draw_rect (x_value, y_value, color_value, id_name) {
  	return svg
  	.append('g')
  	.attr ('id', id_name)
  	.append('rect')
  	.attr ('x', x_value)
  	.attr ('y', y_value)
  	.attr ('fill', color_value)
  	.attr ('width', width/3) 
  	.attr ('height', height/2) 
  	.attr ('opacity', '0.5');
  }

  _.filter(data, function(d) {
  	if (d.IncomeGroup == "High income: nonOECD") {
  		high_income_nonOECD++;
  		nonOECD_list.push(d.CountryName);
  	}
  	if (d.IncomeGroup == "High income: OECD") {
  		high_income_OECD++;
  		OECD_list.push(d.CountryName);
  	}
  	if (d.IncomeGroup == "Upper middle income") {
  		upper_middle_income++;
  		umi_list.push(d.CountryName);
  	}
  	if (d.IncomeGroup == "Lower middle income") {
  		lower_middle_income++;
  		lmi_list.push(d.CountryName);
  	}
  	if (d.IncomeGroup == "Low income") {
  		low_income++;
  		li_list.push(d.CountryName);
  	}
  	if (d.IncomeGroup == "") {
  	 	no_level++;
  	 	nc_list.push(d.CountryName);
  	}
  });
  
 draw_rect( 0, 0, "#6b91a4", "nonOECD");
 draw_rect( 0, height/2,"#7a9dae", "OECD");
 draw_rect( width/3 , 0, "#9ab4c1", "umi");
 draw_rect(width/3, height/2,"#e2f8fe", "lmi");
 draw_rect( width/3*2, 0, "#e2f8fe", "li");
 draw_rect( width/3*2, height/2,"#f5fdff", "nc" );

function xValue (list_id, x) {
	var rect_width = d3.select(list_id).select('rect').attr('width');
	var max_x = parseInt(x)+ parseInt(rect_width)- 50;
	var min_x = parseInt(x)+50;
  // console.log(Math.floor(Math.random() * (max_x - min_x)+ min_x));
	return Math.floor(Math.random() * (max_x - min_x)+ min_x);
} 

function yValue (list_id, y){
	var rect_height = d3.select(list_id).select('rect').attr('height');
	var max_y = parseInt(y)+ parseInt(rect_height) - 50;
	var min_y = parseInt(y)+50;
  console.log(Math.floor(Math.random() * (max_y - min_y) + min_y));
	return Math.floor(Math.random() * (max_y - min_y) + min_y);
}
 
 function drawNodes(list, list_id, x, y) {

 	_.each(list, function (num, i) {

 		var X = xValue (list_id, x);
 		var Y = xValue (list_id, y);

  	svg
  	 .select(list_id)
  	 .append('circle')
  	 .attr('r', '3')
  	 .attr('cx', X)
  	 .attr('fill','black')
  	 .attr('cy', Y);
  	});
 }

  drawNodes(nonOECD_list, 'g#nonOECD', 0, 0);
  drawNodes(OECD_list, 'g#OECD', 0, 300);
  drawNodes(umi_list, 'g#umi', 320, 0);	
  drawNodes(lmi_list, 'g#lmi', 320, 300);
  drawNodes(li_list, 'g#li', 640, 0);	
  drawNodes(nc_list, 'g#nc', 640, 300);

  d3.selectAll('g').on("click", function(){
    var that = d3.select(this);
    var active_rect = d3.select(this).select('rect');
    var id = d3.select(this).attr('id');
    
    var list_active = id+"_list";
    // var list_id_active = "g#"+id;
    console.log(active_rect + " active_rect");
    // console.log(list_id_active);

    d3.selectAll('g').remove();
    draw_rect( 0, 0, "green", id);
    d3.select('g#'+id).select('rect').attr('width','960').attr('height','600');
    drawNodes(id+"_list", "g#"+id, 0, 0 );

  });
});


