const GanttChart = require('./GanttChart.jsx')
const BarChart = require('./BarChart.jsx')
const DailyChart = require('./DailyChart.jsx')

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
                <DailyChart key={3}/>
			</div>
		</>
	} 
} 

module.exports = Index
