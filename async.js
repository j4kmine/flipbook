(function(){

	var width =1300;
	var height = 800;
	var svg = d3.select("div#chart")
	.append("svg")
	.attr("height",height)
	.attr("width",width)
	.append("g")
	.attr("transform","translate(0,0)")

	var radiusSclae =  d3.scaleSqrt().domain([276769882 ,9733380000000]).range([10,80])
	var forceX = d3.forceX(function(d){
		if(d.Tipe == "MIGAS"){
			return 300
		}else{
			return 900
		}
	}).strength(0.05)
	var forcColide  = d3.forceCollide(function(d){
							return radiusSclae(d.Nilai) +4;
						})
	var simulation = d3.forceSimulation()
					 .force("x",forceX)
					 .force("y",d3.forceY(height/2).strength(0.05))
					 .force("collide", forcColide)
	d3.queue()
		.defer(d3.csv,"agus.csv")
		.await(ready)

	function ready(error , datapoints){
		var circle = svg.selectAll(".artist")
						.data(datapoints)
						.enter().append("circle")
						.attr('class',"artist")
						.attr("r" ,function(d){
							return radiusSclae(d.Nilai)
						})
						.attr("fill" ,function(d){
							return d.warna
						})
						.on('click',function(d){
							console.log(d)
						})

		simulation.nodes(datapoints).on('tick',ticked);

		function ticked (){
			circle.attr("cx",function(d){
				return d.x;
			})
			circle.attr("cy",function(d){
				return d.y;
			})
		}
					

	}

})();