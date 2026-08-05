const GantChart = require('./GantChart.jsx')

class Index extends EventTarget {
	constructor(){
		super()
	}
	
    publicMembers() {
        return []
    }	
    
	async view() {
		return <>
			<div>
                <GantChart key={1}/>
			</div>
		</>
	} 
}

module.exports = Index
