let ganttchart0;let dailychart1;

const barChartConfig = () => {
    return {
                labels:  ["sun","mon","tue","wed","thu","fri","sat"],
                dataset: [ 
                    [50,30,20,60,23,50,90],
                    [40,52,33,26,30,25,99],
                    [40,52,33,26,30,25,99].map(x=>x-5)
                ],
                colors: ["blue","lime",'orange'],
                legend: ["This Week", "Last Week"],
                dims: ["50%","300px"],
                title: "Example Barchart",
                axisTitles: { 
                    y: "Earnings ($)",  
                    x: ""
                }

            }
}


const dailyChartConfig = () => {
    return {
                labels:  ["sun","mon","tue","wed","thu","fri","sat"],
                dataset: [ 
                    [[0,1200],[800,1100],[800,900],[700,1700],[500,900],[1200,2400],[0,2400]],
                ],
                colors: ["blue"],
                legend: ["This Week", "Last Week"],
                dims: ["50%","300px"],
                title: "Example Daily Chart",
                axisTitles: { 
                    y: "Occupied"
                }

            }
}
function runner() {
	eval(`
	 function buildDailyXAxisChartLabels(labels,cols){
    const xContainer = document.createElement("div")
    xContainer.className="xlabels";
    xContainer.style.display = "grid";
    xContainer.style.width = "100%";
    xContainer.style.gridTemplateColumns = "repeat(" + cols + ",1fr)";
    xContainer.style.placeItems = "center";
    //generate labels
    let xAxisMarkup = ""
    for(let i = 0; i < labels.length; i++){
        xAxisMarkup += '<span style=" height:20px; width:100%; text-align: center;">'+labels[i]+'</span>' 
    }
    xContainer.innerHTML = xAxisMarkup;
    xContainer.style.height = "40px";
    return xContainer;

}

function buildDailyChart(dataset, colors){
    const container = document.createElement("div");
    container.style.display = "grid";
    container.style.gridTemplateColumns = "repeat(" + dataset[0].length + ",1fr)";
    container.style.position = "relative";
    container.style.placeItems = "end";


    //compute max         
    const max = Math.max(...dataset.map(data=>Math.max(...data)))
    const barsize = val => (val / Math.ceil(max * 1.1)) * 100
    let n = 0; 
    for(let v = 0; v < dataset[0].length;v++){
        const wrapper = document.createElement('div')
        wrapper.style.height = "100%"
        wrapper.style.gridTemplateColumns = "repeat("+ dataset.length+",1fr)"
        wrapper.style.display = "grid"
        wrapper.style.width = "100%"
        wrapper.style.placeItems = "end"
        if(v%2 == 0 ){
            wrapper.style.borderLeft =  "1px dashed #333"
            wrapper.style.borderRight =  "1px dashed #333"

        }
        for(let d = 0; d < dataset.length; d++){
            const datapoint = document.createElement('div')
            // const percent = (dataset[d][v] / max)*100
            datapoint.style.display = "flex"
            datapoint.style.backgroundColor = colors[d]
            datapoint.style.alignItems = "center";
                        datapoint.style.position = "inherit" 

            datapoint.style.justifyContent = "center"
            datapoint.style.width = "10%" 
            datapoint.style.height = "0"
                        datapoint.innerHTML = "<p>"+d+","+v+"</p>"
 
            // datapoint.innerHTML = "<p>"+dataset[d][v]+"</p>"
            datapoint.style.transition = "all 300ms linear"
                    datapoint.style.margin =  Math.round(dataset[d][v][1]/2400)*191+'px' + ' auto auto auto';   
 
            setTimeout(()=>{
                console.log((dataset[d][v][1]-dataset[d][v][0])/2400*100)
                console.log('starting', Math.round(dataset[d][v][1]/2400)*191+'px !important') 
                console.log('height', 2.1*(dataset[d][v][1]-dataset[d][v][0])/2400*100+"%") 
                console.log(Math.round(dataset[d][v][1]/2400)*191+'px' + ' auto auto auto') 
                datapoint.style.height = (dataset[d][v][1]-dataset[d][v][0])/2400*100+"%";
                // datapoint.style.marginBottom =  '30px !important';   
          
                console.log('n ',d+v) 
            },n*20)

            const label = datapoint.querySelector("p")
            label.style.opacity = 0
            label.style.color = colors[d]
            label.style.transition = "all 300ms ease"
            
            

            datapoint.addEventListener("mouseenter", ()=>{
                label.style.color = "#fff";
                label.style.opacity = 1;
                document.querySelector(".xlabels").children[v].style.backgroundColor = "aliceblue"

                
            })
            datapoint.addEventListener("mouseleave", () => {
                label.style.color = colors[d];
                document.querySelector(".xlabels").children[v].style.backgroundColor = "transparent"

            })
            wrapper.append(datapoint)
            n++
            
            const datapoint2 = document.createElement('div')
            // const percent = (dataset[d][v] / max)*100
            // datapoint2.style.display = "flex"  
            datapoint2.style.backgroundColor = 'lightgrey'
            datapoint2.style.alignItems = "center";
            datapoint2.style.justifyContent = "center"
            datapoint2.style.width = "10%" 
            datapoint2.style.height = "0"
  
            datapoint2.style.zIndex = "-1" 
            // datapoint2.style.margin = "auto";
            
            datapoint2.innerHTML = "<p>"+d+","+v+"</p>"
            // datapoint2.innerHTML = "<p>"+dataset[d][v]+"</p>"
            console.log(dataset[d][v])
            datapoint2.style.transition = "all 300ms linear"
            setTimeout(()=>{
                datapoint2.style.height = "200%"  
                console.log('marginnn',(dataset[d][v][1]-dataset[d][v][0])/2400*10+ 'px auto 30px auto')
                // datapoint2.style.marginBottom = (d % 3 == 0) ? '-110px' : '30px';   
                // datapoint2.style.margin = (dataset[d][v][1]-dataset[d][v][0])/2400*10+ 'px auto 30px auto';
                    datapoint2.style.margin = '-200px auto auto auto';
            },n*20)

            const label2 = datapoint2.querySelector("p")
            label2.style.opacity = 0
            label2.style.color = colors[d]
            label2.style.transition = "all 300ms ease"
            
            

            datapoint2.addEventListener("mouseenter", ()=>{
                label2.style.color = "#fff";
                label2.style.opacity = 1;
                document.querySelector(".xlabels").children[v].style.backgroundColor = "aliceblue"

                
            })
            datapoint2.addEventListener("mouseleave", () => {
                label2.style.color = colors[d];
                document.querySelector(".xlabels").children[v].style.backgroundColor = "transparent"

            })
            wrapper.append(datapoint2)
            // n++
        }
        container.appendChild(wrapper)
    }
    return container
}
 

//chart classes
class MinimalDailyChart { 
    constructor(root, props){
        if(!props.dims) props.dims = ["700px","2000px"]
        //init  
        
        console.log(props.dataset)
        const xChartLabels = buildDailyXAxisChartLabels(props.labels,props.dataset[0].length)
        const dataContainer = buildDailyChart(props.dataset,props.colors);
        const chart = document.createElement("section");
        const title = document.createElement("span")
        chart.style.position = "relative"
        chart.style.marginTop= "4rem"
        title.style.position = "absolute"
        title.style.top = "-130px"
        title.style.left = "0"
        title.style.width = "100%"
        title.style.textAlign = "center"

        //add axis titles if necessary
        if(props.axisTitles?.x){
            const xAxisTitle = document.createElement('span')
            xAxisTitle.style.position = "absolute"
            xAxisTitle.style.left = "50%"
            xAxisTitle.style.bottom = "-50px"
            xAxisTitle.textContent = props.axisTitles.x
            dataContainer.appendChild(xAxisTitle)
        }
        if(props.axisTitles?.y){
            const yAxisTitle = document.createElement('span')
            yAxisTitle.style.position = "absolute"
            yAxisTitle.style.left = "-36px"
            yAxisTitle.style.top = "50%"
            yAxisTitle.style.transform="rotate(-90deg)"
            yAxisTitle.textContent = props.axisTitles.y
            dataContainer.style.paddingLeft = "35px"
            dataContainer.appendChild(yAxisTitle)
            xChartLabels.style.paddingLeft = "25px"
        }


        title.textContent = props.title || ""
        props.title && chart.appendChild(title)


        //style
        chart.style.display = "grid"
        chart.style.width = props.dims[0]
        chart.style.height = props.dims[1] 
        
        //"combine" components
        chart.appendChild(dataContainer)
        chart.appendChild(xChartLabels)
        this.element = chart; 
        root.appendChild(chart)
    }
}

class DailyChart extends EventTarget {
    days
    axis
	constructor(){
		super()
		this.days=''
		this.axis=''
		let hours = [[0,1200],[800,1100],[800,900],[700,1700],[500,900],[1200,2400],[0,2400]]
		setTimeout(() => {
            let days = 7
            let daySpacing = 100
            let daysOfWeek= ["sun", 'mon', 'tues', 'wed', 'thurs', 'fri', 'sat']
            for(let i = 0; i < 7; i++){
                this.days += '<line x1="'+(40+daySpacing*i)+'" y1="0" x2="'+(40+daySpacing*i)+'" y2="200" style="stroke:lightgrey;stroke-width:7" /><line x1="'+(40+daySpacing*i)+'" y1="'+hours[i][0]/12+'" x2="'+(40+daySpacing*i)+'" y2="'+hours[i][1]/12+'" style="stroke:blue;stroke-width:10" />'
                this.axis+='<text x="'+(25+daySpacing*i)+'" y="250" fill="black">'+daysOfWeek[i]+'</text>'
            }
            
            this.axis+='<text x="300" y="300" fill="black">days</text>'
		    this.dispatchEvent(new Event('dynamics')) 
		}, 0)
	}
	
    publicMembers() {
        return [this.days, this.axis]
    }	
    
	async view (onload, registration) {
		return \`
			<div>
                <p>daily chart</p>
                <br/>
                <br/>
			    </div>
			    <svg height="350" width="800" xmlns="http://www.w3.org/2000/svg">
                    \$\{this.publicMembers()[0]\}
                    \$\{this.publicMembers()[1]\}
                </svg>
			    <br/>
			    <br/>
			    <br/>
			    <br/>
			</div>
		\`
	} 
}



  function buildXAxisChartLabels(labels,cols){
    const xContainer = document.createElement("div")
    xContainer.className="xlabels";
    xContainer.style.display = "grid";
    xContainer.style.width = "100%";
    xContainer.style.gridTemplateColumns = "repeat(" + cols + ",1fr)";
    xContainer.style.placeItems = "center";
    //generate labels
    let xAxisMarkup = ""
    for(let i = 0; i < labels.length; i++){
        xAxisMarkup += '<span style=" height:20px; width:100%; text-align: center;">'+labels[i]+'</span>' 
    }
    xContainer.innerHTML = xAxisMarkup;
    xContainer.style.height = "40px";
    return xContainer;

}


function buildBarChart(dataset, colors){
    const container = document.createElement("div");
    container.style.display = "grid";
    container.style.gridTemplateColumns = "repeat(" + dataset[0].length + ",1fr)";
    container.style.position = "relative";
    container.style.placeItems = "end";


    //compute max         
    const max = Math.max(...dataset.map(data=>Math.max(...data)))
    const barsize = val => (val / Math.ceil(max * 1.1)) * 100
    let n = 0; 
    for(let v = 0; v < dataset[0].length;v++){
        const wrapper = document.createElement('div')
        wrapper.style.height = "100%"
        wrapper.style.gridTemplateColumns = "repeat("+ dataset.length+",1fr)"
        wrapper.style.display = "grid"
        wrapper.style.width = "100%"
        wrapper.style.placeItems = "end"
        if(v%2 == 0 ){
            wrapper.style.borderLeft =  "1px dashed #333"
            wrapper.style.borderRight =  "1px dashed #333"

        }
        for(let d = 0; d < dataset.length; d++){
            const datapoint = document.createElement('div')
            // const percent = (dataset[d][v] / max)*100
            datapoint.style.display = "flex"
            datapoint.style.backgroundColor = colors[d]
            datapoint.style.alignItems = "center";
            datapoint.style.justifyContent = "center"
            datapoint.style.width = "100%"
            datapoint.style.height = "0"
            datapoint.innerHTML = "<p>"+dataset[d][v]+"</p>"
            console.log(dataset[d][v])
            datapoint.style.transition = "all 300ms linear"
            setTimeout(()=>{
                datapoint.style.height = barsize(dataset[d][v])+"%";
            
            },n*20)

            const label = datapoint.querySelector("p")
            label.style.opacity = 0
            label.style.color = colors[d]
            label.style.transition = "all 300ms ease"
            
            

            datapoint.addEventListener("mouseenter", ()=>{
                label.style.color = "#fff";
                label.style.opacity = 1;
                document.querySelector(".xlabels").children[v].style.backgroundColor = "aliceblue"

                
            })
            datapoint.addEventListener("mouseleave", () => {
                label.style.color = colors[d];
                document.querySelector(".xlabels").children[v].style.backgroundColor = "transparent"

            })
            wrapper.append(datapoint)
            n++
        }
        container.appendChild(wrapper)
    }
    return container
}



//chart classes
class MinimalBarChart { 
    constructor(root, props){
        if(!props.dims) props.dims = ["300px","200px"]
        //init
        console.log(props.dataset)
        const xChartLabels = buildXAxisChartLabels(props.labels,props.dataset[0].length)
        const dataContainer = buildBarChart(props.dataset,props.colors);
        const chart = document.createElement("section");
        const title = document.createElement("span")
        chart.style.position = "relative"
        chart.style.marginTop= "4rem"
        title.style.position = "absolute"
        title.style.top = "-30px"
        title.style.left = "0"
        title.style.width = "100%"
        title.style.textAlign = "center"

        //add axis titles if necessary
        if(props.axisTitles?.x){
            const xAxisTitle = document.createElement('span')
            xAxisTitle.style.position = "absolute"
            xAxisTitle.style.left = "50%"
            xAxisTitle.style.bottom = "-50px"
            xAxisTitle.textContent = props.axisTitles.x
            dataContainer.appendChild(xAxisTitle)
        }
        if(props.axisTitles?.y){
            const yAxisTitle = document.createElement('span')
            yAxisTitle.style.position = "absolute"
            yAxisTitle.style.left = "-36px"
            yAxisTitle.style.top = "50%"
            yAxisTitle.style.transform="rotate(-90deg)"
            yAxisTitle.textContent = props.axisTitles.y
            dataContainer.style.paddingLeft = "25px"
            dataContainer.appendChild(yAxisTitle)
            xChartLabels.style.paddingLeft = "25px"
        }


        title.textContent = props.title || ""
        props.title && chart.appendChild(title)


        //style
        chart.style.display = "grid"
        chart.style.width = props.dims[0]
        chart.style.height = props.dims[1] 
        
        //"combine" components
        chart.appendChild(dataContainer)
        chart.appendChild(xChartLabels)
        this.element = chart; 
        root.appendChild(chart)
    }
}

class MinimalScatterPlot { 
    constructor(root,props){

        //attach chart container
        const chart = document.createElement("section")
        chart.style.position = "relative"
        chart.style.marginTop = "4rem"
        chart.style.width = props.dims[0] || "300px"
        chart.style.height = props.dims[1] || "200px"
        chart.style.borderBottom = "1px solid black"
        chart.style.borderLeft= "1px solid black"
        root.appendChild(chart)
        this.element = chart;

        //determine max/min x & y
        let minX = Infinity, minY = Infinity
        let maxX = -Infinity, maxY = -Infinity; 
        for(let sampleName in props.dataset){
            for(let s = 0; s < props.dataset[sampleName].length; s++){
                const [x,y] = props.dataset[sampleName][s];
                minX = Math.min(minX,x);
                maxX = Math.max(maxX,x);
                minY = Math.min(minY,y);
                maxY = Math.max(maxY,y);


            }
        }


        maxY*= 1.2

        //use max and mins to determine transform
        const transformToChartPosition = ([x,y])=>{
            // Calculate the percentage position of x and y in the chart
            const xPerc= ((x - minX) / (maxX - minX)) 
            const yPerc = ((y - minY) / (maxY - minY)) 
            return [xPerc, yPerc];

        }
        //create points and add to container
        for(let sampleName in props.dataset){
            for(let s = 0; s < props.dataset[sampleName].length; s++){
                const sample = props.dataset[sampleName][s]
                const point = document.createElement("div")
                point.style.zIndex = "0"
                point.style.position = "absolute"
                point.style.height = "10px"
                point.style.width = "10px" 
                point.style.border = "2px solid black"
                const tooltip = document.createElement("div")
                tooltip.innerHTML = "<span><strong>"+sampleName+"</strong> ("+sample[0]+","+sample[1]+"</span>" 
                chart.appendChild(tooltip)
                point.style.overflow = "visible"

                //apply tooltip styles
                tooltip.style.display = "none"
                tooltip.style.background = props.colors[sampleName]
                tooltip.style.alignItems = "center"
                tooltip.style.justifyContent = "center"
                tooltip.style.width = "fit-content";
                tooltip.style.padding = "2px"
                tooltip.style.borderRadius = "4px"
                tooltip.style.color = "white"
                tooltip.style.zIndex = 50
                tooltip.style.position = "absolute"

                //show tooltip on point hover
                point.addEventListener("mouseenter",e=>{
                    tooltip.style.display = "flex"
                })
                point.addEventListener("mouseleave",e=>{
                    tooltip.style.display = "none"
                })


                point.style.backgroundColor = props.colors[sampleName]
                const [transformX,transformY] = transformToChartPosition(sample)
                const xPx = transformX*chart.clientWidth
                const yPx = transformY*chart.clientHeight
                point.style.left = 0
                point.style.bottom = 0
                point.style.transition = "all 0.3s ease"
                //animate points to their position
                setTimeout(()=>{
                    point.style.left = xPx + "px"
                    point.style.bottom = yPx + "px"
                },s*100)
                tooltip.style.left = (xPx + 10)+'px'
                tooltip.style.bottom = yPx + 'px'
                
                chart.appendChild(point)

            }

        }

        //add axis titles if necessary
        if(props.axisTitles?.x){
            const xAxisTitle = document.createElement('span')
            xAxisTitle.style.position = "absolute"
            xAxisTitle.style.left = "50%"
            xAxisTitle.style.bottom = "-25px"
            xAxisTitle.textContent = props.axisTitles.x
            xAxisTitle.style.width = "100%"
            chart.appendChild(xAxisTitle)
        }
        if(props.axisTitles?.y){
            const yAxisTitle = document.createElement('span')
            yAxisTitle.style.position = "absolute"
            yAxisTitle.style.left = "-36px"
            yAxisTitle.style.top = "50%"
            yAxisTitle.style.transform="rotate(-90deg)"
            yAxisTitle.textContent = props.axisTitles.y
            chart.style.paddingLeft = "25px"
            chart.appendChild(yAxisTitle)
            chart.style.paddingLeft = "25px"
            chart.style.marginLeft = "25px"
        }
        //create chart title (if specified)
        if(props.title){
            const title = document.createElement("span")
            title.style.position = "absolute"
            title.style.top = "-30px"
            title.style.left = "0"
            title.style.width = "100%"
            title.style.textAlign = "center"
            title.textContent = props.title
            chart.appendChild(title)
        }
        chart.style.overflow = "visible"

    }
}

class BarChart extends EventTarget {
	constructor(){
		super()
		setTimeout(() => {
            const barchart = new MinimalBarChart(document.getElementById('bar-chart'), barChartConfig())
            
		}, 0)
	}
	
    publicMembers() {
        return []
    }	
    
	async view (onload, registration) {
		return \`
			<div>
                <p>bar chart</p>
                <div id='bar-chart'>
			    </div>
			</div>
		\`
	} 
}



 class GanttChart extends EventTarget {
	constructor(){
		super()
		
	}
	
    publicMembers() {
        return []
    }	
    
	async view (onload, registration) {
	    setTimeout(() => {
		    var c=document.getElementById("chart-2");
            var ctx2=c.getContext("2d");
            const shift = 150

            ctx2.beginPath();
            ctx2.setLineDash([5,4,5]);

            ctx2.font = "13px Courier";
            ctx2.fillText("August, '26", 10, 50);

            // Set a start-point
            ctx2.moveTo(0, 0);

            // Set an end-point
            ctx2.lineTo(0, 100);

            ctx2.stroke();

            ctx2.fillStyle = 'orange';

            ctx2.fillRect(20,20+shift,150,100);
            ctx2.fillStyle = '#9c9';

            ctx2.fillRect(20+shift,20,150,100);

		}, 0)
		return \`
			<div>
                <p>timeline</p>
                <div class='row'>
                    <canvas class="fixed" id="chart" width="200" height="200"></canvas>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <canvas class="fixed" id="chart-2" width="400" height="300" style="width: 400px; height: 300px;"></canvas>
                    <br/>
                    <br/>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <table>
                      <tr>
                        <td style="background-color: #9c9; width: 200px;">Company</td>
                        <td >Contact</td>
                      </tr>
                      <tr>
                        <td style="background-color: orange; width: 200px;">Alfreds Futterkiste</td>
                        <td>Maria Anders</td>
                      </tr>
                      <tr>
                        <td style="background-color: red; width: 200px;">Centro comercial Moctezuma</td>
                        <td>Francisco Chang</td>
                      </tr>
                    </table> 
                    </body>
			    </div>
		\`
	} 
}


 



class Index extends EventTarget {
	constructor(){
		super()
	}
	
    publicMembers() {
        return []
    }	
    
	async view (onload, registration) {
		return \`
			<div>
                <GanttChart key={1}/>
                <DailyChart key={3}/>
			</div>
		\`
	} 
} 



	
	
	const vf = new VFAASNet({protocol: 'ws', host: '127.0.0.1', port: 8081})

	db = {
		get: async (key, onload, registration) => {

			const promise = (onload) => {
				return new Promise((res, rej) => {
					let update = (datum) => {
					    // TODO: dispatch per component
					    ganttchart0.dispatchEvent(new Event('dynamics'));dailychart1.dispatchEvent(new Event('dynamics'));
						res(datum.msg.value)	
									
						onload && vf.webSocket.send('update', JSON.stringify({status: 170, msg: {key: key, value: value}}))

					}			
					vf.aPath(update)
				})
			}
			
			if(onload && registration) {
				const pr = () => {
					return new Promise((res) => {
						const loadDatabase = (datum) => {
							setTimeout(() => {
								ganttchart0.registration = true;dailychart1.registration = true;
								ganttchart0.dispatchEvent(new Event('dynamics'));dailychart1.dispatchEvent(new Event('dynamics'));
							}, 10)
							if('v' in datum.msg){
								res(datum.msg.v[key])

							} else {
									res(datum.msg.v[key])
							}
						}
						
						const onloadUpdate = (datum) => { 
				 			ganttchart0.registration = true;dailychart1.registration = true;
							ganttchart0.dispatchEvent(new Event('dynamics'));dailychart1.dispatchEvent(new Event('dynamics'));
						}
						
						vf.aPath(onloadUpdate)
						vf.aPath(loadDatabase)
						
						setTimeout(() => {
							vf.webSocket.send('loadDatabase', JSON.stringify({ status: 139, msg: {key : key} }))
						}, 10)
					})
				}

				return await pr()
			}
			else if(!onload && registration) {
				return await promise(false)
			}
		},
		put: async (key, value) => {
			vf.webSocket.send('update', JSON.stringify({status: 170, msg: {key: key, value: value}}))
		}
	};
	
	
	vf.aBoot(({boot}) => {
	   vf.webSocket.send('client', JSON.stringify({status: 204, msg: 'msg send'}))
	});
	
	
	(async () => {
		let index = new Index();
		let ganttchart0 = await (new GanttChart(1,1));
let dailychart1 = await (new DailyChart(3,3));

		const contents = await index.view();
		const element = document.getElementById('anchor');
		let main = contents;
		main = main.replaceAll("<DailyChart key={3}/>", await dailychart1.view((await dailychart1.publicMembers())[0]))
		main = main.replaceAll("<GanttChart key={1}/>", await ganttchart0.view((await ganttchart0.publicMembers())[0]))
		element.setHTMLUnsafe(main);
		
        ganttchart0.addEventListener('dynamics', async (e) => {
		    const secondContents = await ganttchart0.view(false, ganttchart0.registration)
            index.dispatchEvent(new Event('dynamics'))
		    // const main = document.getElementById('anchor').replaceAll('<GanttChart key={1}/>', secondContents)
		    element.setHTMLUnsafe(main)
	    });
            
        dailychart1.addEventListener('dynamics', async (e) => {
		    const secondContents = await dailychart1.view(false, dailychart1.registration)
            index.dispatchEvent(new Event('dynamics'))
		    // const main = document.getElementById('anchor').replaceAll('<DailyChart key={3}/>', secondContents)
		    element.setHTMLUnsafe(main)
	    });
            
         index.addEventListener('dynamics', async (e) => {
         
            main = await index.view(false, index.registration)
            index.dispatchEvent(new Event('^dynamics'))

            main = main.replaceAll("<GanttChart key={1}/>", await ganttchart0.view((await ganttchart0.publicMembers())[0]));main = main.replaceAll("<DailyChart key={3}/>", await dailychart1.view((await dailychart1.publicMembers())[0]));

            element.setHTMLUnsafe(main)
        });   
    
	})();
`)
};

(async () => {
	await runner();
})()
