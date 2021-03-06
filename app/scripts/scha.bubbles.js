function bubblesNoData (element) {

	var el = element.select('#sch_A');

	el.append('h3').html("No Data Available")
	// body...
}


function  bubbles(element, data) {


				//mouseover box
				var deetbox = detailBox();

				var entities = ['IND', 'OTH', 'COM', 'SCC', 'PTY'];
				var clrScale = d3.scale.ordinal()
				                .domain(entities)
				                .range(['#12b3d6', '#0e6aa4', '#FF0B9B', '#fc5d2c', '#0CD102']);
				var candidateData = data;

				var padding = 1.5; // separation between nodes
				var scha = element.select('#sch_A');
				var width = $('#sch_A').width() -40;
				var height = $('#sch_A').height() -20;
				var center = {x: width/2, y:height/2};

				var svg = scha.append('svg')
				      .attr('width', width)
				      .attr('height', height);


				//var maxRadius = 200;

				var force = d3.layout.force()
				                     .nodes(candidateData)
				                     .friction(0.9)
				                     //.gravity(.2)
				                     //.charge(0)
				                     //.charge(-100)
				                     //.charge(function(d){return -d.tran_amt*.015})
				                     .charge(function(d){return - r(d.tran_amt1)*.8})
				                     //.chargeDistance(10000)
				                    .size([width, height]);

				var lgd = d3.select('#sch_A-ctr .notes');

				

				var ldgOb = [{name : 'Individual', clr: '#12b3d6' }, 
							{name : 'Other/Business Entity', clr: '#0e6aa4' },
							{name : 'Recipient Committee', clr: '#FF0B9B' },
							{name : 'Small Contributor Committee ', clr: '#fc5d2c' },
							{name : 'Political Party', clr: '#0CD102' },]

					for (l in ldgOb){
						

						lgd.append('small')
						.html(ldgOb[l].name)

						lgd.append('span')
						.attr('class', 'ldgclr')
						.style('background', ldgOb[l].clr)
					}

				var schaCtr = d3.select('#sch_A-ctr');
				var schaCtrQ1 = d3.select('#sch_A-ctr .q1');
				var schaCtrQ2 = d3.select('#sch_A-ctr .q2');
				//var schaCtrQ3 = d3.select('#sch_A-ctr .q3');

				//schaCtrQ3.style('height', '150px')

				schaCtrQ1
				      .on('click', function(){

				        var ob = this;
				        slideboxToggle(schaCtr, ob);
				        bySize();
				      })

				schaCtrQ2
				      .on('click', function(){    
				        var ob = this;
				        slideboxToggle(schaCtr, ob);    
				        byType(); 

				      })
/*
				schaCtrQ3
				      .on('click', function(){
				        var ob = this;
				        slideboxToggle(schaCtr, ob);
				            
				      })  

*/
				var mapCtr = d3.select('#map-ctr');
				var mapCtrQ1 = d3.select('#map-ctr .q1');
				var mapCtrQ2 = d3.select('#map-ctr .q2');
				var mapCtrQ3 = d3.select('#map-ctr .q3');
				var mapCtrQ4 = d3.select('#map-ctr .q4');

				mapCtrQ4.style('height', '230px')

				mapCtrQ1
				      .on('click', function(){

				        var ob = this;
				        slideboxToggle(mapCtr, ob);
				                 

				      })

				mapCtrQ2
				      .on('click', function(){    
				        var ob = this;
				        slideboxToggle(mapCtr, ob);    
				      

				      })

				mapCtrQ3
				      .on('click', function(){
				        var ob = this;
				        slideboxToggle(mapCtr, ob);
				            
				      }) 


				mapCtrQ4
				      .on('click', function(){
				        var ob = this;
				        slideboxToggle(mapCtr, ob);
				            
				      }) 


				 var node = svg
				                 .selectAll(".datanode")
				                 .data(candidateData)  
				                 .enter()
				                 .append('circle')
				                 .attr('class', 'datanode')
				                 .attr('r', function (d){

				                    return r(d.tran_amt1);
				                 })
				                 
				                 .style('stroke', '#888')
				                 .style('stroke', .9)
				                 .style('opacity', 0.8)
				                .style('fill', function(d){

				                      var des = d.entity_cd;
				                      var clr;
				                      return clrScale(des);

				                 })
				                .on('mouseover', function (d) {
				                	var top = d3.event.pageY -25;
				                	var left = d3.event.pageX +25;
				                	var htm;

				                	if(d.entity_cd == "IND"){
				                		htm = "<p> Name : " + d.tran_namf + " " + d.tran_naml + "<br> Amount : " + dollar(d.tran_amt1) +"<br> Occupation: "+ d.tran_occ + "<br> Employer: "+ d.tran_emp +"</p>"
				                	}
				                	else{
				                		htm = "<p> Name : " + d.tran_naml + "<br> Amount : " + dollar(d.tran_amt1) + "</p>"
				                	}



				                	deetbox
				                		.style('top', top + 'px')
				                		.style('left', left + 'px' )
				                		.style('opacity', .9)
				                		.html(htm);
				                })
				                .on('mouseout', function (argument) {
				                	deetbox.style('opacity', 0);
				                })
				                 .call(force.drag);


				       force.on('tick', function(e){

				         d3.selectAll('.datanode')
				        .attr("cx", function(d) { return d.x; })
				        .attr("cy", function(d) { return d.y; });               

				                    }).start();  


				function updateCircle(e, loc, filter){
				  
				      var al = .03 *e.alpha;
				        d3.selectAll('.datanode')
				        .filter(filter)
				        .each(function(o, i){

				            o.y += (loc.y - o.y) *al;
				            o.x += (loc.x - o.x) *al;

				            d3.select(this)
				               .attr('cx', o.x)
				              .attr('cy', o.y)
				         
				          });         

				      }



function byType(){
        var filter1 = function(d){if (d.entity_cd=="COM"){ return true}};
        var loc1 = {x: 100, y:100}
        var filter2 = function(d){if (d.entity_cd=="OTH"){ return true}};
        var loc2 = {x:450, y:250}
        var filter3 = function(d){if (d.entity_cd=="IND"){ return true}};
        var loc3 = {x:350, y:450}
        var filter4 = function(d){if (d.entity_cd=="PTY"){ return true}};
        var loc3 = {x:200, y:150}
        var filter5 = function(d){if (d.entity_cd=="SCC"){ return true}};
        var loc3 = {x:350, y:50}
       

       force.on('tick', function(e){
        updateCircle(e, loc1, filter1);
        updateCircle(e, loc2, filter2);
        updateCircle(e, loc3, filter3);

       }).start();


}



function bySize(){
      var filter1 = function(d){if (parseInt(d.tran_amt1)<500){ return true}};
      var loc1 = {x: 250, y:100}
      //var filter2 = function(d){if (parseInt(d.tran_amt1)>200 && parseInt(d.tran_amt1)<500){ return true}};
      //var loc2 = {x:250, y:350}
      var filter3 = function(d){if (parseInt(d.tran_amt1)<=500){ return true}};
      var loc3 = {x:250, y:550}
     // var filter1 = function(d){if (d.entity_cd=="IND"){ return true}};

     force.on('tick', function(e){
      updateCircle(e, loc1, filter1);
      //updateCircle(e, loc2, filter2);
      updateCircle(e, loc3, filter3);

     }).start();


}
}