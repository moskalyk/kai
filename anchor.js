// %!

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

function runner() {
	eval(`
	#
	
	^&
	
	(async () => {
		let index = new Index();
		const contents = await index.view();
		const element = document.getElementById('anchor');
		let main = contents;
		element.setHTMLUnsafe(main);
		&)
	})();
`)
};

(async () => {
	await runner();
})()
