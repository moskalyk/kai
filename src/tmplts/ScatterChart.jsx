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
