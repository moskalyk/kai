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
    
	async view() {
		return <>
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
		</>
	} 
}

module.exports = DailyChart

