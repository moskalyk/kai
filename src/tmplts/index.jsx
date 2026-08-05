const GanttChart = require('./GanttChart.jsx')

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
                <GanttChart key={1}/>
			</div>
		</>
	} 
}

module.exports = Index
