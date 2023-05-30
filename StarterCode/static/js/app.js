const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Initializes the page with a default plot
function init() {
    let dropdown = d3.select("#selDataset")
    d3.json(url).then(function (data) {
        let samplenames = data.names
        for (let i = 0; i < samplenames.length; i++) {
            dropdown.append("option").text(samplenames[i]).property("value", samplenames[i])
        }
        console.log(data);
        let firstsample = samplenames[0]
        showbarchart(firstsample)
        showbubblechart(firstsample)
        showmetadata(firstsample)
    });
};

init();

function showmetadata(sampleid) {
    d3.json(url).then(function (data) {
        let metadata = data.metadata;
        let metadataarray = metadata.filter(sample => sample.id == sampleid);
        let result = metadataarray[0];
        console.log(result);
        let some_var = d3.select("#sample-metadata");
        some_var.html("");
        for (category in result){
            some_var.append("h5").text(`${category}: ${result[category]}`);
        };
    })
    
}



function optionChanged(newsample) {
    showbarchart(newsample)
    showbubblechart(newsample)
    showmetadata(newsample)
}

function showbarchart(sampleid) {
    d3.json(url).then(function (data) {
        let samples = data.samples
        let samplearray = samples.filter(sample => sample.id == sampleid)
        let sample = samplearray[0]
        let values = sample.sample_values
        let ids = sample.otu_ids
        let labels = sample.otu_labels
        
        // console.log(sample)
        // console.log(ids)
        // console.log(labels)
        // console.log(values)

// bar chart
        let trace = {
        x: values.slice(0,10).reverse(),
        y: ids.slice(0,10).map(id => `OTU ${id}`).reverse(),
        text: labels.slice(0,10).reverse(),
        type: "bar",
        orientation: "h"
        };


// Apply a title to the layout
        let layout = {
        //  title: "Top 10 OTUs",
         margin: {
         l: 100,
         r: 100,
         t: 100,
         b: 100
         }
};

// Data trace array
let dataPlot = [trace];

//Plot
Plotly.newPlot("bar", dataPlot, layout);
    })

}

//bubble chart
function showbubblechart(sampleid) {
    d3.json(url).then(function (data) {
        let samples = data.samples
        let samplearray = samples.filter(sample => sample.id == sampleid)
        let sample = samplearray[0]
        let values = sample.sample_values
        let ids = sample.otu_ids
        let labels = sample.otu_labels
 

let trace1 = {
    x: ids,
    y: values,
    text: labels,
    mode: "markers",
  marker: {
    color: ids,
    size: values
  }
};
    
let dataPlot1 = [trace1];

// Apply a title to the layout
let layout = {
    showlegend: false,
  height: 500,
  width: 900
}

Plotly.newPlot("bubble", dataPlot1, layout);
});

};


