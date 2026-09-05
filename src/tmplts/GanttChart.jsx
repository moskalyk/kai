class GanttChart extends EventTarget {
	constructor(){
		super()
		
	}
	
    publicMembers() {
        return []
    }	
    
	async view() {
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
		return <>
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
		</>
	} 
}

module.exports = GanttChart
