var margin = {top: 30, right: 30, bottom: 30, left: 50},
    width = 500 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var data1 = [
    {ser1: 0.3, ser2: 4},
    {ser1: 2, ser2: 16},
    {ser1: 3, ser2: 8},
    {ser1: 5, ser2: 10}
    ];


    var data2 = [
        {ser1: 0.3, ser2: 4},
        {ser1: 2, ser2: 3},
        {ser1: 3, ser2: 8},
        {ser1: 5, ser2: 10},
        {ser1: 6, ser2: 11}

        ];

var duration = 1000;

let svg = d3.select(".chart-value")
    .append("svg")
    .attr("width", width + margin.left +margin.right)
    .attr("height", height +margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate("+margin.left+","+margin.top+")");

let x = d3.scaleLinear()
    .range([0, width]);

let y = d3.scaleLinear()
    .range([height, 0]);

    let xAxis = d3.axisBottom(x);
    let yAxis = d3.axisLeft(y);

function update(data, updated = false){
    x.domain([0, d3.max(data, (d)=>{return d.ser1})])

    if(!updated)
        svg.append("g")
            .attr("class", "x-Axis")
            .attr("transform", "translate(0,"+height+")").transition().duration(900)
            .call(xAxis);
    else
        svg.select(".x-Axis")
            .attr("transform", "translate(0,"+height+")").transition().duration(900)
            .call(xAxis);

    y.domain([0, d3.max(data, (d)=>{return d.ser2;})])

    if(!updated)
        svg.append("g").transition().duration(900)
            .attr("class", "y-Axis")
            .call(yAxis)
    else
        svg.select(".y-Axis")
            .call(yAxis)

    let u = svg.selectAll(".lineTest")
        .data([data], function(d){return d.ser1});
    
    
    let path;
    
    if(!updated)
    path = u.enter()
    .append("path")
    .merge(u)
    // .transition().duration(900)
    .attr("class", "pathChart")
    .attr("d", d3.line()
      .x(function(d) { return x(d.ser1); })
      .y(function(d) { return y(d.ser2); }))
      .attr("fill", "none")
      .attr("stroke", "orangered")
      .attr("stroke-width", 2.5);
    else
    path = u
    .enter()
    .select(".pathChart")
    .merge(u)
    .transition().duration(900)
    .attr("d", d3.line()
      .x(function(d) { return x(d.ser1); })
      .y(function(d) { return y(d.ser2); }))
      .attr("fill", "none")
      .attr("stroke", "orangered")
      .attr("stroke-width", 2.5);

    if(!updated){
        let totalLength = path.node().getTotalLength();
        console.log(totalLength)

        path
            .attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition()
            .duration(900)
            .attr("stroke-dashoffset", 0);
    }
}



update(data1)

const table = document.querySelector("#table-value");

function createTable() {
    let tableStyled = document.createElement("table");
    tableStyled.classList.add("styled-table");
    table.appendChild(tableStyled);

    //create header
    let thead = document.createElement("thead");
    let tr = document.createElement("tr");
    for (let index = 0; index < 3; index++) {
        let th = document.createElement("th");
        if(index == 0){
            th.innerHTML="No"
        }
        else if(index == 1){
            th.style.paddingRight = th.style.paddingLeft = "120px";
            th.innerHTML="Date"
        }
        else if(index == 2){
            th.style.paddingRight = th.style.paddingLeft = "80px";
            th.innerHTML="Value"
        }
        th.style.color = "white";
        th.style.backgroundColor = "orangered";
        th.classList.add("row-table");
        tr.appendChild(th);
    }
    thead.appendChild(tr)
    tableStyled.appendChild(thead)

    //create body
    let tbody = document.createElement("tbody");
    for (let index = 0; index < 16; index++) {
        tr = document.createElement("tr");
        for (let i = 0; i < 3; i++) {
            let td = document.createElement("td");
            if(i == 0){
                let num = index +1;
                td.innerHTML = num.toString();
            }
            else if(i == 1){
                td.innerHTML = "11-11-2021 09:20";
            }
            else{
                td.innerHTML = "100"
            }
            td.classList.add("row-table");
            tr.appendChild(td);
        }
        if(index%2 != 0){
            tr.style.color = "white"
            tr.style.backgroundColor = "orangered"}
        tbody.appendChild(tr);
    }
    tableStyled.appendChild(tbody)
}

createTable();