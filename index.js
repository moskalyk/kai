let ganttchart0;

function runner() {
	eval(`
	 class GanttChart extends EventTarget {
	constructor(){
		super()
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
	}
	
    publicMembers() {
        return []
    }	
    
	async view (onload, registration) {
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
					    ganttchart0.dispatchEvent(new Event('dynamics'));
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
								ganttchart0.registration = true;
								ganttchart0.dispatchEvent(new Event('dynamics'));
							}, 10)
							if('v' in datum.msg){
								res(datum.msg.v[key])

							} else {
									res(datum.msg.v[key])
							}
						}
						
						const onloadUpdate = (datum) => { 
				 			ganttchart0.registration = true;
							ganttchart0.dispatchEvent(new Event('dynamics'));
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
		let ganttchart0 = await (new GanttChart());

		const contents = await index.view();
		const element = document.getElementById('anchor');
		let main = contents;
		main = main.replaceAll("<GanttChart key={1}/>", await ganttchart0.view((await ganttchart0.publicMembers())[0]))
		element.setHTMLUnsafe(main);
		
        ganttchart0.addEventListener('dynamics', async (e) => {
		    const secondContents = await ganttchart0.view(false, ganttchart0.registration)

		    const main = document.getElementById('anchor').replaceAll('<GanttChart key={1}/>', secondContents)
		    element.setHTMLUnsafe(main)
	    });
            
         index.addEventListener('dynamics', async (e) => {
         
            main = await index.view(false, index.registration)
            index.dispatchEvent(new Event('^dynamics'))

            main = main.replaceAll("<GanttChart key={1}/>", await ganttchart0.view((await ganttchart0.publicMembers())[0]));

            element.setHTMLUnsafe(main)
        });   
    
	})();
`)
};

(async () => {
	await runner();
})()
