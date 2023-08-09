// Fetch the JSON data
let samplesData; // define it outside so it's accessible to other functions



d3.json("StarterCode/samples.json").then(data => {
    samplesData = data; // assign fetched data to samplesData
    var sampleNames = data.names;
    populateDropdown(sampleNames);
    buildBarChart(sampleNames[0]);
});


function populateDropdown(sampleNames) {
    // Populate the dropdown
    var dropdown = d3.select("#sampleSelect");
    sampleNames.forEach(name => {
        dropdown.append("option").text(name).property("value", name);
    });

    // Update chart when a new sample is selected
    dropdown.on("change", function() {
        var newSample = dropdown.property("value");
        buildBarChart(newSample);
    });
}
function buildBarChart(sample) {
    var samples = samplesData.samples;
    var selectedSample = samples.find(s => s.id === sample);
  
    // Get top 10 OTUs
    var otu_ids = selectedSample.otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`);
    var sample_values = selectedSample.sample_values.slice(0, 10);
    var otu_labels = selectedSample.otu_labels.slice(0, 10);
  
    // Plotly bar chart
    var trace = {
        type: "bar",
        x: sample_values,
        y: otu_ids,
        orientation: 'h',
        text: otu_labels,
        marker: {
            color: 'blue'
        }
    };
  
    var layout = {
        title: "Top 10 OTUs for Selected Individual",
        xaxis: { title: "Sample Values" },
        yaxis: { title: "OTU ID" }
    };
  
    Plotly.newPlot("barChart", [trace], layout);
}

d3.json("StarterCode/samples.json").then(data => {
    const samples = data.samples;
    const selectedSample = samples[0]; // Use the first sample for initial rendering, adjust as needed

    buildBubbleChart(selectedSample);
});

function buildBubbleChart(sample) {
    // Extract the data
    const otu_ids = sample.otu_ids;
    const sample_values = sample.sample_values;
    const otu_labels = sample.otu_labels;

    // Create the trace for the bubble chart
    const trace = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
            size: sample_values,
            color: otu_ids, 
            colorscale: 'Earth'
        }
    };

    const data = [trace];

    const layout = {
        title: 'Bubble Chart for Each Sample',
        showlegend: false,
        xaxis: { title: "OTU ID" },
        yaxis: { title: "Sample Values" },
        hovermode: 'closest'
    };

    Plotly.newPlot('bubbleChart', data, layout);
}

