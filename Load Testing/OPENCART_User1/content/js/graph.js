/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 1.0, "series": [{"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-43", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-42", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-41", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-40", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-36", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-22", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-35", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-21", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-34", "isController": false}, {"data": [[900.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-24", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-33", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-23", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-39", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-38", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-20", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-37", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-29", "isController": false}, {"data": [[900.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-26", "isController": false}, {"data": [[900.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-25", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-28", "isController": false}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-27", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-1", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-2", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-3", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-4", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-5", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-6", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-7", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-8", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-32", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-31", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-30", "isController": false}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-0", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-25", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-33", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-24", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-32", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-23", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-35", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-22", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-34", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-29", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-28", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-27", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-31", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-26", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-30", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-9", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-37", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-36", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-39", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-38", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-21", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-20", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-14", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-13", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-12", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-11", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-18", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-17", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-16", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-15", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-19", "isController": false}, {"data": [[900.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-10", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-11", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-10", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-13", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-12", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-19", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-18", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-9", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-15", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-14", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-17", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-16", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-4", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-3", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-2", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-1", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-8", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-7", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-6", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-5", "isController": false}, {"data": [[1200.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-0", "isController": false}, {"data": [[1700.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-0", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-1", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-2", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-3", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-4", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-5", "isController": false}, {"data": [[19200.0, 1.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-6", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-7", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-8", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-9", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-18", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-19", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-20", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-21", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-22", "isController": false}, {"data": [[1700.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-0", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-1", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-2", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-3", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-4", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-20", "isController": false}, {"data": [[1400.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-10", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-11", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-12", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-13", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-14", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-15", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-16", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-17", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-10", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-11", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-12", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-13", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-14", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-15", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-16", "isController": false}, {"data": [[3700.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-17", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-18", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-19", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-52", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-50", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-51", "isController": false}, {"data": [[6100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-45", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-46", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-43", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-44", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-41", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-42", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-40", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-8", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-7", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-6", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-5", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-49", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-47", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-9", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-48", "isController": false}, {"data": [[2200.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-0", "isController": false}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-4", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-3", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-2", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-1", "isController": false}, {"data": [[2100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-34", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-5", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-35", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-6", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-32", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-7", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-33", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-8", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-30", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-9", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-31", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-38", "isController": false}, {"data": [[1000.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-39", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-36", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-37", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-23", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-24", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-21", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-22", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-20", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-29", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-27", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-28", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-25", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-26", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-12", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-13", "isController": false}, {"data": [[2600.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-10", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-11", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-18", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-19", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-16", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-17", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-14", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-15", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-61", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-60", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-58", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-44", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-57", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-43", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-56", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-46", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-55", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-45", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-40", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-42", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-59", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-41", "isController": false}, {"data": [[4500.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-47", "isController": false}, {"data": [[2700.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-50", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-54", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-53", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-52", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-51", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-47", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-46", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-45", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-44", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-49", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-48", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 19200.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 9.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 173.0, "series": [{"data": [[0.0, 173.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 30.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 9.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 1.0, "minX": 1.66271268E12, "maxY": 1.0, "series": [{"data": [[1.66271268E12, 1.0]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66271268E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 76.0, "minX": 1.0, "maxY": 19281.0, "series": [{"data": [[1.0, 166.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-43", "isController": false}, {"data": [[1.0, 166.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-43-Aggregated", "isController": false}, {"data": [[1.0, 155.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-42", "isController": false}, {"data": [[1.0, 155.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-42-Aggregated", "isController": false}, {"data": [[1.0, 161.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-41", "isController": false}, {"data": [[1.0, 161.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-41-Aggregated", "isController": false}, {"data": [[1.0, 680.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-40", "isController": false}, {"data": [[1.0, 680.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-40-Aggregated", "isController": false}, {"data": [[1.0, 155.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-36", "isController": false}, {"data": [[1.0, 155.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-36-Aggregated", "isController": false}, {"data": [[1.0, 84.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-22", "isController": false}, {"data": [[1.0, 84.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-22-Aggregated", "isController": false}, {"data": [[1.0, 831.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-35", "isController": false}, {"data": [[1.0, 831.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-35-Aggregated", "isController": false}, {"data": [[1.0, 84.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-21", "isController": false}, {"data": [[1.0, 84.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-21-Aggregated", "isController": false}, {"data": [[1.0, 329.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-34", "isController": false}, {"data": [[1.0, 329.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-34-Aggregated", "isController": false}, {"data": [[1.0, 934.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-24", "isController": false}, {"data": [[1.0, 934.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-24-Aggregated", "isController": false}, {"data": [[1.0, 323.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-33", "isController": false}, {"data": [[1.0, 323.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-33-Aggregated", "isController": false}, {"data": [[1.0, 83.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-23", "isController": false}, {"data": [[1.0, 83.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-23-Aggregated", "isController": false}, {"data": [[1.0, 334.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-39", "isController": false}, {"data": [[1.0, 334.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-39-Aggregated", "isController": false}, {"data": [[1.0, 329.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-38", "isController": false}, {"data": [[1.0, 329.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-38-Aggregated", "isController": false}, {"data": [[1.0, 90.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-20", "isController": false}, {"data": [[1.0, 90.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-20-Aggregated", "isController": false}, {"data": [[1.0, 645.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-37", "isController": false}, {"data": [[1.0, 645.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-37-Aggregated", "isController": false}, {"data": [[1.0, 88.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-29", "isController": false}, {"data": [[1.0, 88.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-29-Aggregated", "isController": false}, {"data": [[1.0, 997.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-26", "isController": false}, {"data": [[1.0, 997.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-26-Aggregated", "isController": false}, {"data": [[1.0, 946.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-25", "isController": false}, {"data": [[1.0, 946.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-25-Aggregated", "isController": false}, {"data": [[1.0, 86.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-28", "isController": false}, {"data": [[1.0, 86.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-28-Aggregated", "isController": false}, {"data": [[1.0, 1107.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-27", "isController": false}, {"data": [[1.0, 1107.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-27-Aggregated", "isController": false}, {"data": [[1.0, 134.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-1", "isController": false}, {"data": [[1.0, 134.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-1-Aggregated", "isController": false}, {"data": [[1.0, 138.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-2", "isController": false}, {"data": [[1.0, 138.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-2-Aggregated", "isController": false}, {"data": [[1.0, 487.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-3", "isController": false}, {"data": [[1.0, 487.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-3-Aggregated", "isController": false}, {"data": [[1.0, 138.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-4", "isController": false}, {"data": [[1.0, 138.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-4-Aggregated", "isController": false}, {"data": [[1.0, 160.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-5", "isController": false}, {"data": [[1.0, 160.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-5-Aggregated", "isController": false}, {"data": [[1.0, 138.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-6", "isController": false}, {"data": [[1.0, 138.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-6-Aggregated", "isController": false}, {"data": [[1.0, 148.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-7", "isController": false}, {"data": [[1.0, 148.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-7-Aggregated", "isController": false}, {"data": [[1.0, 135.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-8", "isController": false}, {"data": [[1.0, 135.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-8-Aggregated", "isController": false}, {"data": [[1.0, 326.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-32", "isController": false}, {"data": [[1.0, 326.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-32-Aggregated", "isController": false}, {"data": [[1.0, 327.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-31", "isController": false}, {"data": [[1.0, 327.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-31-Aggregated", "isController": false}, {"data": [[1.0, 461.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-30", "isController": false}, {"data": [[1.0, 461.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-30-Aggregated", "isController": false}, {"data": [[1.0, 1175.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-0", "isController": false}, {"data": [[1.0, 1175.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-0-Aggregated", "isController": false}, {"data": [[1.0, 168.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-25", "isController": false}, {"data": [[1.0, 168.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-25-Aggregated", "isController": false}, {"data": [[1.0, 88.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-33", "isController": false}, {"data": [[1.0, 88.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-33-Aggregated", "isController": false}, {"data": [[1.0, 157.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-24", "isController": false}, {"data": [[1.0, 157.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-24-Aggregated", "isController": false}, {"data": [[1.0, 84.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-32", "isController": false}, {"data": [[1.0, 84.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-32-Aggregated", "isController": false}, {"data": [[1.0, 210.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-23", "isController": false}, {"data": [[1.0, 210.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-23-Aggregated", "isController": false}, {"data": [[1.0, 88.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-35", "isController": false}, {"data": [[1.0, 88.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-35-Aggregated", "isController": false}, {"data": [[1.0, 327.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-22", "isController": false}, {"data": [[1.0, 327.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-22-Aggregated", "isController": false}, {"data": [[1.0, 91.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-34", "isController": false}, {"data": [[1.0, 91.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-34-Aggregated", "isController": false}, {"data": [[1.0, 160.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-29", "isController": false}, {"data": [[1.0, 160.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-29-Aggregated", "isController": false}, {"data": [[1.0, 152.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-28", "isController": false}, {"data": [[1.0, 152.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-28-Aggregated", "isController": false}, {"data": [[1.0, 148.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-27", "isController": false}, {"data": [[1.0, 148.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-27-Aggregated", "isController": false}, {"data": [[1.0, 96.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-31", "isController": false}, {"data": [[1.0, 96.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-31-Aggregated", "isController": false}, {"data": [[1.0, 427.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-26", "isController": false}, {"data": [[1.0, 427.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-26-Aggregated", "isController": false}, {"data": [[1.0, 86.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-30", "isController": false}, {"data": [[1.0, 86.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-30-Aggregated", "isController": false}, {"data": [[1.0, 129.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-9", "isController": false}, {"data": [[1.0, 129.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-9-Aggregated", "isController": false}, {"data": [[1.0, 85.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-37", "isController": false}, {"data": [[1.0, 85.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-37-Aggregated", "isController": false}, {"data": [[1.0, 89.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-36", "isController": false}, {"data": [[1.0, 89.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-36-Aggregated", "isController": false}, {"data": [[1.0, 85.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-39", "isController": false}, {"data": [[1.0, 85.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-39-Aggregated", "isController": false}, {"data": [[1.0, 91.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-38", "isController": false}, {"data": [[1.0, 91.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-38-Aggregated", "isController": false}, {"data": [[1.0, 161.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-21", "isController": false}, {"data": [[1.0, 161.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-21-Aggregated", "isController": false}, {"data": [[1.0, 410.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-20", "isController": false}, {"data": [[1.0, 410.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-20-Aggregated", "isController": false}, {"data": [[1.0, 320.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-14", "isController": false}, {"data": [[1.0, 320.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-14-Aggregated", "isController": false}, {"data": [[1.0, 364.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-13", "isController": false}, {"data": [[1.0, 364.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-13-Aggregated", "isController": false}, {"data": [[1.0, 156.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-12", "isController": false}, {"data": [[1.0, 156.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-12-Aggregated", "isController": false}, {"data": [[1.0, 91.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-11", "isController": false}, {"data": [[1.0, 91.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-11-Aggregated", "isController": false}, {"data": [[1.0, 165.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-18", "isController": false}, {"data": [[1.0, 165.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-18-Aggregated", "isController": false}, {"data": [[1.0, 323.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-17", "isController": false}, {"data": [[1.0, 323.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-17-Aggregated", "isController": false}, {"data": [[1.0, 335.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-16", "isController": false}, {"data": [[1.0, 335.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-16-Aggregated", "isController": false}, {"data": [[1.0, 155.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-15", "isController": false}, {"data": [[1.0, 155.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-15-Aggregated", "isController": false}, {"data": [[1.0, 155.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-19", "isController": false}, {"data": [[1.0, 155.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-19-Aggregated", "isController": false}, {"data": [[1.0, 921.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-10", "isController": false}, {"data": [[1.0, 921.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-10-Aggregated", "isController": false}, {"data": [[1.0, 86.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-11", "isController": false}, {"data": [[1.0, 86.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-11-Aggregated", "isController": false}, {"data": [[1.0, 622.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-10", "isController": false}, {"data": [[1.0, 622.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-10-Aggregated", "isController": false}, {"data": [[1.0, 359.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-13", "isController": false}, {"data": [[1.0, 359.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-13-Aggregated", "isController": false}, {"data": [[1.0, 161.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-12", "isController": false}, {"data": [[1.0, 161.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-12-Aggregated", "isController": false}, {"data": [[1.0, 91.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-19", "isController": false}, {"data": [[1.0, 91.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-19-Aggregated", "isController": false}, {"data": [[1.0, 82.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-18", "isController": false}, {"data": [[1.0, 82.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-18-Aggregated", "isController": false}, {"data": [[1.0, 149.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-9", "isController": false}, {"data": [[1.0, 149.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-9-Aggregated", "isController": false}, {"data": [[1.0, 336.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-15", "isController": false}, {"data": [[1.0, 336.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-15-Aggregated", "isController": false}, {"data": [[1.0, 336.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-14", "isController": false}, {"data": [[1.0, 336.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-14-Aggregated", "isController": false}, {"data": [[1.0, 264.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-17", "isController": false}, {"data": [[1.0, 264.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-17-Aggregated", "isController": false}, {"data": [[1.0, 242.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-16", "isController": false}, {"data": [[1.0, 242.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-16-Aggregated", "isController": false}, {"data": [[1.0, 171.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-4", "isController": false}, {"data": [[1.0, 171.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-4-Aggregated", "isController": false}, {"data": [[1.0, 156.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-3", "isController": false}, {"data": [[1.0, 156.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-3-Aggregated", "isController": false}, {"data": [[1.0, 157.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-2", "isController": false}, {"data": [[1.0, 157.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-2-Aggregated", "isController": false}, {"data": [[1.0, 143.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-1", "isController": false}, {"data": [[1.0, 143.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-1-Aggregated", "isController": false}, {"data": [[1.0, 142.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-8", "isController": false}, {"data": [[1.0, 142.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-8-Aggregated", "isController": false}, {"data": [[1.0, 168.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-7", "isController": false}, {"data": [[1.0, 168.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-7-Aggregated", "isController": false}, {"data": [[1.0, 151.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-6", "isController": false}, {"data": [[1.0, 151.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-6-Aggregated", "isController": false}, {"data": [[1.0, 154.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-5", "isController": false}, {"data": [[1.0, 154.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-5-Aggregated", "isController": false}, {"data": [[1.0, 1232.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-0", "isController": false}, {"data": [[1.0, 1232.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-0-Aggregated", "isController": false}, {"data": [[1.0, 1712.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-0", "isController": false}, {"data": [[1.0, 1712.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-0-Aggregated", "isController": false}, {"data": [[1.0, 505.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-1", "isController": false}, {"data": [[1.0, 505.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-1-Aggregated", "isController": false}, {"data": [[1.0, 146.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-2", "isController": false}, {"data": [[1.0, 146.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-2-Aggregated", "isController": false}, {"data": [[1.0, 146.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-3", "isController": false}, {"data": [[1.0, 146.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-3-Aggregated", "isController": false}, {"data": [[1.0, 158.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-4", "isController": false}, {"data": [[1.0, 158.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-4-Aggregated", "isController": false}, {"data": [[1.0, 153.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-5", "isController": false}, {"data": [[1.0, 153.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-5-Aggregated", "isController": false}, {"data": [[1.0, 19281.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.0, 19281.0]], "isOverall": false, "label": "Test-Aggregated", "isController": true}, {"data": [[1.0, 146.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-6", "isController": false}, {"data": [[1.0, 146.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-6-Aggregated", "isController": false}, {"data": [[1.0, 170.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-7", "isController": false}, {"data": [[1.0, 170.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-7-Aggregated", "isController": false}, {"data": [[1.0, 148.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-8", "isController": false}, {"data": [[1.0, 148.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-8-Aggregated", "isController": false}, {"data": [[1.0, 154.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-9", "isController": false}, {"data": [[1.0, 154.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-9-Aggregated", "isController": false}, {"data": [[1.0, 77.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-18", "isController": false}, {"data": [[1.0, 77.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-18-Aggregated", "isController": false}, {"data": [[1.0, 76.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-19", "isController": false}, {"data": [[1.0, 76.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-19-Aggregated", "isController": false}, {"data": [[1.0, 80.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-20", "isController": false}, {"data": [[1.0, 80.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-20-Aggregated", "isController": false}, {"data": [[1.0, 84.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-21", "isController": false}, {"data": [[1.0, 84.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-21-Aggregated", "isController": false}, {"data": [[1.0, 91.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-22", "isController": false}, {"data": [[1.0, 91.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-22-Aggregated", "isController": false}, {"data": [[1.0, 1765.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-0", "isController": false}, {"data": [[1.0, 1765.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-0-Aggregated", "isController": false}, {"data": [[1.0, 156.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-1", "isController": false}, {"data": [[1.0, 156.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-1-Aggregated", "isController": false}, {"data": [[1.0, 144.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-2", "isController": false}, {"data": [[1.0, 144.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-2-Aggregated", "isController": false}, {"data": [[1.0, 488.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-3", "isController": false}, {"data": [[1.0, 488.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-3-Aggregated", "isController": false}, {"data": [[1.0, 136.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-4", "isController": false}, {"data": [[1.0, 136.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-4-Aggregated", "isController": false}, {"data": [[1.0, 85.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-20", "isController": false}, {"data": [[1.0, 85.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-20-Aggregated", "isController": false}, {"data": [[1.0, 1432.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-10", "isController": false}, {"data": [[1.0, 1432.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-10-Aggregated", "isController": false}, {"data": [[1.0, 89.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-11", "isController": false}, {"data": [[1.0, 89.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-11-Aggregated", "isController": false}, {"data": [[1.0, 135.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-12", "isController": false}, {"data": [[1.0, 135.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-12-Aggregated", "isController": false}, {"data": [[1.0, 149.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-13", "isController": false}, {"data": [[1.0, 149.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-13-Aggregated", "isController": false}, {"data": [[1.0, 130.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-14", "isController": false}, {"data": [[1.0, 130.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-14-Aggregated", "isController": false}, {"data": [[1.0, 178.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-15", "isController": false}, {"data": [[1.0, 178.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-15-Aggregated", "isController": false}, {"data": [[1.0, 77.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-16", "isController": false}, {"data": [[1.0, 77.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-16-Aggregated", "isController": false}, {"data": [[1.0, 83.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-17", "isController": false}, {"data": [[1.0, 83.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-17-Aggregated", "isController": false}, {"data": [[1.0, 381.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-10", "isController": false}, {"data": [[1.0, 381.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-10-Aggregated", "isController": false}, {"data": [[1.0, 297.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-11", "isController": false}, {"data": [[1.0, 297.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-11-Aggregated", "isController": false}, {"data": [[1.0, 154.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-12", "isController": false}, {"data": [[1.0, 154.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-12-Aggregated", "isController": false}, {"data": [[1.0, 181.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-13", "isController": false}, {"data": [[1.0, 181.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-13-Aggregated", "isController": false}, {"data": [[1.0, 209.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-14", "isController": false}, {"data": [[1.0, 209.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-14-Aggregated", "isController": false}, {"data": [[1.0, 223.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-15", "isController": false}, {"data": [[1.0, 223.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-15-Aggregated", "isController": false}, {"data": [[1.0, 148.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-16", "isController": false}, {"data": [[1.0, 148.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-16-Aggregated", "isController": false}, {"data": [[1.0, 3736.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension", "isController": false}, {"data": [[1.0, 3736.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-Aggregated", "isController": false}, {"data": [[1.0, 499.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-17", "isController": false}, {"data": [[1.0, 499.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-17-Aggregated", "isController": false}, {"data": [[1.0, 77.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-18", "isController": false}, {"data": [[1.0, 77.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-18-Aggregated", "isController": false}, {"data": [[1.0, 78.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-19", "isController": false}, {"data": [[1.0, 78.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-19-Aggregated", "isController": false}, {"data": [[1.0, 367.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-52", "isController": false}, {"data": [[1.0, 367.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-52-Aggregated", "isController": false}, {"data": [[1.0, 394.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-50", "isController": false}, {"data": [[1.0, 394.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-50-Aggregated", "isController": false}, {"data": [[1.0, 277.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-51", "isController": false}, {"data": [[1.0, 277.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-51-Aggregated", "isController": false}, {"data": [[1.0, 6103.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home", "isController": false}, {"data": [[1.0, 6103.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-Aggregated", "isController": false}, {"data": [[1.0, 148.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-45", "isController": false}, {"data": [[1.0, 148.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-45-Aggregated", "isController": false}, {"data": [[1.0, 152.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-46", "isController": false}, {"data": [[1.0, 152.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-46-Aggregated", "isController": false}, {"data": [[1.0, 142.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-43", "isController": false}, {"data": [[1.0, 142.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-43-Aggregated", "isController": false}, {"data": [[1.0, 148.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-44", "isController": false}, {"data": [[1.0, 148.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-44-Aggregated", "isController": false}, {"data": [[1.0, 142.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-41", "isController": false}, {"data": [[1.0, 142.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-41-Aggregated", "isController": false}, {"data": [[1.0, 144.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-42", "isController": false}, {"data": [[1.0, 144.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-42-Aggregated", "isController": false}, {"data": [[1.0, 294.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-40", "isController": false}, {"data": [[1.0, 294.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-40-Aggregated", "isController": false}, {"data": [[1.0, 675.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-8", "isController": false}, {"data": [[1.0, 675.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-8-Aggregated", "isController": false}, {"data": [[1.0, 163.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-7", "isController": false}, {"data": [[1.0, 163.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-7-Aggregated", "isController": false}, {"data": [[1.0, 708.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-6", "isController": false}, {"data": [[1.0, 708.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-6-Aggregated", "isController": false}, {"data": [[1.0, 718.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-5", "isController": false}, {"data": [[1.0, 718.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-5-Aggregated", "isController": false}, {"data": [[1.0, 476.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-49", "isController": false}, {"data": [[1.0, 476.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-49-Aggregated", "isController": false}, {"data": [[1.0, 163.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-47", "isController": false}, {"data": [[1.0, 163.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-47-Aggregated", "isController": false}, {"data": [[1.0, 659.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-9", "isController": false}, {"data": [[1.0, 659.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-9-Aggregated", "isController": false}, {"data": [[1.0, 483.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-48", "isController": false}, {"data": [[1.0, 483.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-48-Aggregated", "isController": false}, {"data": [[1.0, 2200.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-0", "isController": false}, {"data": [[1.0, 2200.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-0-Aggregated", "isController": false}, {"data": [[1.0, 1132.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-4", "isController": false}, {"data": [[1.0, 1132.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-4-Aggregated", "isController": false}, {"data": [[1.0, 323.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-3", "isController": false}, {"data": [[1.0, 323.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-3-Aggregated", "isController": false}, {"data": [[1.0, 719.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-2", "isController": false}, {"data": [[1.0, 719.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-2-Aggregated", "isController": false}, {"data": [[1.0, 836.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-1", "isController": false}, {"data": [[1.0, 836.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-1-Aggregated", "isController": false}, {"data": [[1.0, 2187.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company", "isController": false}, {"data": [[1.0, 2187.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-Aggregated", "isController": false}, {"data": [[1.0, 158.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-34", "isController": false}, {"data": [[1.0, 158.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-34-Aggregated", "isController": false}, {"data": [[1.0, 141.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-5", "isController": false}, {"data": [[1.0, 141.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-5-Aggregated", "isController": false}, {"data": [[1.0, 668.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-35", "isController": false}, {"data": [[1.0, 668.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-35-Aggregated", "isController": false}, {"data": [[1.0, 139.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-6", "isController": false}, {"data": [[1.0, 139.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-6-Aggregated", "isController": false}, {"data": [[1.0, 335.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-32", "isController": false}, {"data": [[1.0, 335.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-32-Aggregated", "isController": false}, {"data": [[1.0, 151.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-7", "isController": false}, {"data": [[1.0, 151.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-7-Aggregated", "isController": false}, {"data": [[1.0, 157.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-33", "isController": false}, {"data": [[1.0, 157.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-33-Aggregated", "isController": false}, {"data": [[1.0, 138.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-8", "isController": false}, {"data": [[1.0, 138.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-8-Aggregated", "isController": false}, {"data": [[1.0, 693.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-30", "isController": false}, {"data": [[1.0, 693.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-30-Aggregated", "isController": false}, {"data": [[1.0, 144.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-9", "isController": false}, {"data": [[1.0, 144.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-9-Aggregated", "isController": false}, {"data": [[1.0, 163.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-31", "isController": false}, {"data": [[1.0, 163.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-31-Aggregated", "isController": false}, {"data": [[1.0, 613.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-38", "isController": false}, {"data": [[1.0, 613.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-38-Aggregated", "isController": false}, {"data": [[1.0, 1083.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-39", "isController": false}, {"data": [[1.0, 1083.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-39-Aggregated", "isController": false}, {"data": [[1.0, 700.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-36", "isController": false}, {"data": [[1.0, 700.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-36-Aggregated", "isController": false}, {"data": [[1.0, 479.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-37", "isController": false}, {"data": [[1.0, 479.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-37-Aggregated", "isController": false}, {"data": [[1.0, 161.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-23", "isController": false}, {"data": [[1.0, 161.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-23-Aggregated", "isController": false}, {"data": [[1.0, 182.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-24", "isController": false}, {"data": [[1.0, 182.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-24-Aggregated", "isController": false}, {"data": [[1.0, 156.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-21", "isController": false}, {"data": [[1.0, 156.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-21-Aggregated", "isController": false}, {"data": [[1.0, 179.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-22", "isController": false}, {"data": [[1.0, 179.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-22-Aggregated", "isController": false}, {"data": [[1.0, 168.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-20", "isController": false}, {"data": [[1.0, 168.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-20-Aggregated", "isController": false}, {"data": [[1.0, 152.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-29", "isController": false}, {"data": [[1.0, 152.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-29-Aggregated", "isController": false}, {"data": [[1.0, 158.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-27", "isController": false}, {"data": [[1.0, 158.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-27-Aggregated", "isController": false}, {"data": [[1.0, 155.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-28", "isController": false}, {"data": [[1.0, 155.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-28-Aggregated", "isController": false}, {"data": [[1.0, 156.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-25", "isController": false}, {"data": [[1.0, 156.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-25-Aggregated", "isController": false}, {"data": [[1.0, 334.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-26", "isController": false}, {"data": [[1.0, 334.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-26-Aggregated", "isController": false}, {"data": [[1.0, 146.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-12", "isController": false}, {"data": [[1.0, 146.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-12-Aggregated", "isController": false}, {"data": [[1.0, 466.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-13", "isController": false}, {"data": [[1.0, 466.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-13-Aggregated", "isController": false}, {"data": [[1.0, 2611.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-10", "isController": false}, {"data": [[1.0, 2611.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-10-Aggregated", "isController": false}, {"data": [[1.0, 619.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-11", "isController": false}, {"data": [[1.0, 619.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-11-Aggregated", "isController": false}, {"data": [[1.0, 158.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-18", "isController": false}, {"data": [[1.0, 158.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-18-Aggregated", "isController": false}, {"data": [[1.0, 665.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-19", "isController": false}, {"data": [[1.0, 665.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-19-Aggregated", "isController": false}, {"data": [[1.0, 158.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-16", "isController": false}, {"data": [[1.0, 158.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-16-Aggregated", "isController": false}, {"data": [[1.0, 164.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-17", "isController": false}, {"data": [[1.0, 164.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-17-Aggregated", "isController": false}, {"data": [[1.0, 722.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-14", "isController": false}, {"data": [[1.0, 722.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-14-Aggregated", "isController": false}, {"data": [[1.0, 160.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-15", "isController": false}, {"data": [[1.0, 160.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-15-Aggregated", "isController": false}, {"data": [[1.0, 79.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-61", "isController": false}, {"data": [[1.0, 79.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-61-Aggregated", "isController": false}, {"data": [[1.0, 78.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-60", "isController": false}, {"data": [[1.0, 78.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-60-Aggregated", "isController": false}, {"data": [[1.0, 79.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-58", "isController": false}, {"data": [[1.0, 79.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-58-Aggregated", "isController": false}, {"data": [[1.0, 82.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-44", "isController": false}, {"data": [[1.0, 82.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-44-Aggregated", "isController": false}, {"data": [[1.0, 77.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-57", "isController": false}, {"data": [[1.0, 77.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-57-Aggregated", "isController": false}, {"data": [[1.0, 76.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-43", "isController": false}, {"data": [[1.0, 76.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-43-Aggregated", "isController": false}, {"data": [[1.0, 154.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-56", "isController": false}, {"data": [[1.0, 154.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-56-Aggregated", "isController": false}, {"data": [[1.0, 76.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-46", "isController": false}, {"data": [[1.0, 76.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-46-Aggregated", "isController": false}, {"data": [[1.0, 154.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-55", "isController": false}, {"data": [[1.0, 154.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-55-Aggregated", "isController": false}, {"data": [[1.0, 78.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-45", "isController": false}, {"data": [[1.0, 78.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-45-Aggregated", "isController": false}, {"data": [[1.0, 86.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-40", "isController": false}, {"data": [[1.0, 86.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-40-Aggregated", "isController": false}, {"data": [[1.0, 157.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-42", "isController": false}, {"data": [[1.0, 157.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-42-Aggregated", "isController": false}, {"data": [[1.0, 76.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-59", "isController": false}, {"data": [[1.0, 76.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-59-Aggregated", "isController": false}, {"data": [[1.0, 150.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-41", "isController": false}, {"data": [[1.0, 150.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-41-Aggregated", "isController": false}, {"data": [[1.0, 4507.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature", "isController": false}, {"data": [[1.0, 4507.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-Aggregated", "isController": false}, {"data": [[1.0, 76.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-47", "isController": false}, {"data": [[1.0, 76.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-47-Aggregated", "isController": false}, {"data": [[1.0, 2748.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login", "isController": false}, {"data": [[1.0, 2748.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-Aggregated", "isController": false}, {"data": [[1.0, 165.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-50", "isController": false}, {"data": [[1.0, 165.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-50-Aggregated", "isController": false}, {"data": [[1.0, 150.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-54", "isController": false}, {"data": [[1.0, 150.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-54-Aggregated", "isController": false}, {"data": [[1.0, 214.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-53", "isController": false}, {"data": [[1.0, 214.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-53-Aggregated", "isController": false}, {"data": [[1.0, 341.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-52", "isController": false}, {"data": [[1.0, 341.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-52-Aggregated", "isController": false}, {"data": [[1.0, 504.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-51", "isController": false}, {"data": [[1.0, 504.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-51-Aggregated", "isController": false}, {"data": [[1.0, 251.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-47", "isController": false}, {"data": [[1.0, 251.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-47-Aggregated", "isController": false}, {"data": [[1.0, 775.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-46", "isController": false}, {"data": [[1.0, 775.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-46-Aggregated", "isController": false}, {"data": [[1.0, 343.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-45", "isController": false}, {"data": [[1.0, 343.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-45-Aggregated", "isController": false}, {"data": [[1.0, 208.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-44", "isController": false}, {"data": [[1.0, 208.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-44-Aggregated", "isController": false}, {"data": [[1.0, 206.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-49", "isController": false}, {"data": [[1.0, 206.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-49-Aggregated", "isController": false}, {"data": [[1.0, 201.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-48", "isController": false}, {"data": [[1.0, 201.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-48-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 1.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 4210.0, "minX": 1.66271268E12, "maxY": 198271.0, "series": [{"data": [[1.66271268E12, 198271.0]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.66271268E12, 4210.0]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66271268E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 76.0, "minX": 1.66271268E12, "maxY": 19281.0, "series": [{"data": [[1.66271268E12, 166.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-43", "isController": false}, {"data": [[1.66271268E12, 155.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-42", "isController": false}, {"data": [[1.66271268E12, 161.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-41", "isController": false}, {"data": [[1.66271268E12, 680.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-40", "isController": false}, {"data": [[1.66271268E12, 155.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-36", "isController": false}, {"data": [[1.66271268E12, 84.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-22", "isController": false}, {"data": [[1.66271268E12, 831.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-35", "isController": false}, {"data": [[1.66271268E12, 84.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-21", "isController": false}, {"data": [[1.66271268E12, 329.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-34", "isController": false}, {"data": [[1.66271268E12, 934.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-24", "isController": false}, {"data": [[1.66271268E12, 323.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-33", "isController": false}, {"data": [[1.66271268E12, 83.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-23", "isController": false}, {"data": [[1.66271268E12, 334.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-39", "isController": false}, {"data": [[1.66271268E12, 329.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-38", "isController": false}, {"data": [[1.66271268E12, 90.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-20", "isController": false}, {"data": [[1.66271268E12, 645.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-37", "isController": false}, {"data": [[1.66271268E12, 88.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-29", "isController": false}, {"data": [[1.66271268E12, 997.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-26", "isController": false}, {"data": [[1.66271268E12, 946.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-25", "isController": false}, {"data": [[1.66271268E12, 86.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-28", "isController": false}, {"data": [[1.66271268E12, 1107.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-27", "isController": false}, {"data": [[1.66271268E12, 134.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-1", "isController": false}, {"data": [[1.66271268E12, 138.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-2", "isController": false}, {"data": [[1.66271268E12, 487.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-3", "isController": false}, {"data": [[1.66271268E12, 138.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-4", "isController": false}, {"data": [[1.66271268E12, 160.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-5", "isController": false}, {"data": [[1.66271268E12, 138.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-6", "isController": false}, {"data": [[1.66271268E12, 148.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-7", "isController": false}, {"data": [[1.66271268E12, 135.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-8", "isController": false}, {"data": [[1.66271268E12, 326.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-32", "isController": false}, {"data": [[1.66271268E12, 327.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-31", "isController": false}, {"data": [[1.66271268E12, 461.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-30", "isController": false}, {"data": [[1.66271268E12, 1175.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-0", "isController": false}, {"data": [[1.66271268E12, 168.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-25", "isController": false}, {"data": [[1.66271268E12, 88.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-33", "isController": false}, {"data": [[1.66271268E12, 157.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-24", "isController": false}, {"data": [[1.66271268E12, 84.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-32", "isController": false}, {"data": [[1.66271268E12, 210.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-23", "isController": false}, {"data": [[1.66271268E12, 88.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-35", "isController": false}, {"data": [[1.66271268E12, 327.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-22", "isController": false}, {"data": [[1.66271268E12, 91.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-34", "isController": false}, {"data": [[1.66271268E12, 160.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-29", "isController": false}, {"data": [[1.66271268E12, 152.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-28", "isController": false}, {"data": [[1.66271268E12, 148.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-27", "isController": false}, {"data": [[1.66271268E12, 96.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-31", "isController": false}, {"data": [[1.66271268E12, 427.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-26", "isController": false}, {"data": [[1.66271268E12, 86.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-30", "isController": false}, {"data": [[1.66271268E12, 129.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-9", "isController": false}, {"data": [[1.66271268E12, 85.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-37", "isController": false}, {"data": [[1.66271268E12, 89.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-36", "isController": false}, {"data": [[1.66271268E12, 85.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-39", "isController": false}, {"data": [[1.66271268E12, 91.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-38", "isController": false}, {"data": [[1.66271268E12, 161.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-21", "isController": false}, {"data": [[1.66271268E12, 410.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-20", "isController": false}, {"data": [[1.66271268E12, 320.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-14", "isController": false}, {"data": [[1.66271268E12, 364.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-13", "isController": false}, {"data": [[1.66271268E12, 156.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-12", "isController": false}, {"data": [[1.66271268E12, 91.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-11", "isController": false}, {"data": [[1.66271268E12, 165.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-18", "isController": false}, {"data": [[1.66271268E12, 323.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-17", "isController": false}, {"data": [[1.66271268E12, 335.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-16", "isController": false}, {"data": [[1.66271268E12, 155.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-15", "isController": false}, {"data": [[1.66271268E12, 155.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-19", "isController": false}, {"data": [[1.66271268E12, 921.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-10", "isController": false}, {"data": [[1.66271268E12, 86.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-11", "isController": false}, {"data": [[1.66271268E12, 622.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-10", "isController": false}, {"data": [[1.66271268E12, 359.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-13", "isController": false}, {"data": [[1.66271268E12, 161.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-12", "isController": false}, {"data": [[1.66271268E12, 91.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-19", "isController": false}, {"data": [[1.66271268E12, 82.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-18", "isController": false}, {"data": [[1.66271268E12, 149.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-9", "isController": false}, {"data": [[1.66271268E12, 336.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-15", "isController": false}, {"data": [[1.66271268E12, 336.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-14", "isController": false}, {"data": [[1.66271268E12, 264.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-17", "isController": false}, {"data": [[1.66271268E12, 242.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-16", "isController": false}, {"data": [[1.66271268E12, 171.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-4", "isController": false}, {"data": [[1.66271268E12, 156.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-3", "isController": false}, {"data": [[1.66271268E12, 157.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-2", "isController": false}, {"data": [[1.66271268E12, 143.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-1", "isController": false}, {"data": [[1.66271268E12, 142.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-8", "isController": false}, {"data": [[1.66271268E12, 168.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-7", "isController": false}, {"data": [[1.66271268E12, 151.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-6", "isController": false}, {"data": [[1.66271268E12, 154.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-5", "isController": false}, {"data": [[1.66271268E12, 1232.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-0", "isController": false}, {"data": [[1.66271268E12, 1712.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-0", "isController": false}, {"data": [[1.66271268E12, 505.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-1", "isController": false}, {"data": [[1.66271268E12, 146.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-2", "isController": false}, {"data": [[1.66271268E12, 146.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-3", "isController": false}, {"data": [[1.66271268E12, 158.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-4", "isController": false}, {"data": [[1.66271268E12, 153.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-5", "isController": false}, {"data": [[1.66271268E12, 19281.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.66271268E12, 146.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-6", "isController": false}, {"data": [[1.66271268E12, 170.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-7", "isController": false}, {"data": [[1.66271268E12, 148.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-8", "isController": false}, {"data": [[1.66271268E12, 154.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-9", "isController": false}, {"data": [[1.66271268E12, 77.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-18", "isController": false}, {"data": [[1.66271268E12, 76.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-19", "isController": false}, {"data": [[1.66271268E12, 80.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-20", "isController": false}, {"data": [[1.66271268E12, 84.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-21", "isController": false}, {"data": [[1.66271268E12, 91.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-22", "isController": false}, {"data": [[1.66271268E12, 1765.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-0", "isController": false}, {"data": [[1.66271268E12, 156.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-1", "isController": false}, {"data": [[1.66271268E12, 144.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-2", "isController": false}, {"data": [[1.66271268E12, 488.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-3", "isController": false}, {"data": [[1.66271268E12, 136.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-4", "isController": false}, {"data": [[1.66271268E12, 85.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-20", "isController": false}, {"data": [[1.66271268E12, 1432.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-10", "isController": false}, {"data": [[1.66271268E12, 89.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-11", "isController": false}, {"data": [[1.66271268E12, 135.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-12", "isController": false}, {"data": [[1.66271268E12, 149.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-13", "isController": false}, {"data": [[1.66271268E12, 130.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-14", "isController": false}, {"data": [[1.66271268E12, 178.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-15", "isController": false}, {"data": [[1.66271268E12, 77.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-16", "isController": false}, {"data": [[1.66271268E12, 83.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-17", "isController": false}, {"data": [[1.66271268E12, 381.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-10", "isController": false}, {"data": [[1.66271268E12, 297.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-11", "isController": false}, {"data": [[1.66271268E12, 154.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-12", "isController": false}, {"data": [[1.66271268E12, 181.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-13", "isController": false}, {"data": [[1.66271268E12, 209.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-14", "isController": false}, {"data": [[1.66271268E12, 223.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-15", "isController": false}, {"data": [[1.66271268E12, 148.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-16", "isController": false}, {"data": [[1.66271268E12, 3736.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension", "isController": false}, {"data": [[1.66271268E12, 499.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-17", "isController": false}, {"data": [[1.66271268E12, 77.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-18", "isController": false}, {"data": [[1.66271268E12, 78.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-19", "isController": false}, {"data": [[1.66271268E12, 367.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-52", "isController": false}, {"data": [[1.66271268E12, 394.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-50", "isController": false}, {"data": [[1.66271268E12, 277.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-51", "isController": false}, {"data": [[1.66271268E12, 6103.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home", "isController": false}, {"data": [[1.66271268E12, 148.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-45", "isController": false}, {"data": [[1.66271268E12, 152.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-46", "isController": false}, {"data": [[1.66271268E12, 142.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-43", "isController": false}, {"data": [[1.66271268E12, 148.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-44", "isController": false}, {"data": [[1.66271268E12, 142.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-41", "isController": false}, {"data": [[1.66271268E12, 144.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-42", "isController": false}, {"data": [[1.66271268E12, 294.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-40", "isController": false}, {"data": [[1.66271268E12, 675.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-8", "isController": false}, {"data": [[1.66271268E12, 163.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-7", "isController": false}, {"data": [[1.66271268E12, 708.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-6", "isController": false}, {"data": [[1.66271268E12, 718.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-5", "isController": false}, {"data": [[1.66271268E12, 476.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-49", "isController": false}, {"data": [[1.66271268E12, 163.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-47", "isController": false}, {"data": [[1.66271268E12, 659.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-9", "isController": false}, {"data": [[1.66271268E12, 483.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-48", "isController": false}, {"data": [[1.66271268E12, 2200.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-0", "isController": false}, {"data": [[1.66271268E12, 1132.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-4", "isController": false}, {"data": [[1.66271268E12, 323.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-3", "isController": false}, {"data": [[1.66271268E12, 719.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-2", "isController": false}, {"data": [[1.66271268E12, 836.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-1", "isController": false}, {"data": [[1.66271268E12, 2187.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company", "isController": false}, {"data": [[1.66271268E12, 158.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-34", "isController": false}, {"data": [[1.66271268E12, 141.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-5", "isController": false}, {"data": [[1.66271268E12, 668.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-35", "isController": false}, {"data": [[1.66271268E12, 139.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-6", "isController": false}, {"data": [[1.66271268E12, 335.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-32", "isController": false}, {"data": [[1.66271268E12, 151.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-7", "isController": false}, {"data": [[1.66271268E12, 157.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-33", "isController": false}, {"data": [[1.66271268E12, 138.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-8", "isController": false}, {"data": [[1.66271268E12, 693.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-30", "isController": false}, {"data": [[1.66271268E12, 144.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-9", "isController": false}, {"data": [[1.66271268E12, 163.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-31", "isController": false}, {"data": [[1.66271268E12, 613.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-38", "isController": false}, {"data": [[1.66271268E12, 1083.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-39", "isController": false}, {"data": [[1.66271268E12, 700.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-36", "isController": false}, {"data": [[1.66271268E12, 479.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-37", "isController": false}, {"data": [[1.66271268E12, 161.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-23", "isController": false}, {"data": [[1.66271268E12, 182.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-24", "isController": false}, {"data": [[1.66271268E12, 156.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-21", "isController": false}, {"data": [[1.66271268E12, 179.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-22", "isController": false}, {"data": [[1.66271268E12, 168.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-20", "isController": false}, {"data": [[1.66271268E12, 152.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-29", "isController": false}, {"data": [[1.66271268E12, 158.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-27", "isController": false}, {"data": [[1.66271268E12, 155.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-28", "isController": false}, {"data": [[1.66271268E12, 156.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-25", "isController": false}, {"data": [[1.66271268E12, 334.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-26", "isController": false}, {"data": [[1.66271268E12, 146.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-12", "isController": false}, {"data": [[1.66271268E12, 466.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-13", "isController": false}, {"data": [[1.66271268E12, 2611.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-10", "isController": false}, {"data": [[1.66271268E12, 619.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-11", "isController": false}, {"data": [[1.66271268E12, 158.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-18", "isController": false}, {"data": [[1.66271268E12, 665.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-19", "isController": false}, {"data": [[1.66271268E12, 158.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-16", "isController": false}, {"data": [[1.66271268E12, 164.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-17", "isController": false}, {"data": [[1.66271268E12, 722.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-14", "isController": false}, {"data": [[1.66271268E12, 160.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-15", "isController": false}, {"data": [[1.66271268E12, 79.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-61", "isController": false}, {"data": [[1.66271268E12, 78.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-60", "isController": false}, {"data": [[1.66271268E12, 79.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-58", "isController": false}, {"data": [[1.66271268E12, 82.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-44", "isController": false}, {"data": [[1.66271268E12, 77.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-57", "isController": false}, {"data": [[1.66271268E12, 76.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-43", "isController": false}, {"data": [[1.66271268E12, 154.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-56", "isController": false}, {"data": [[1.66271268E12, 76.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-46", "isController": false}, {"data": [[1.66271268E12, 154.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-55", "isController": false}, {"data": [[1.66271268E12, 78.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-45", "isController": false}, {"data": [[1.66271268E12, 86.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-40", "isController": false}, {"data": [[1.66271268E12, 157.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-42", "isController": false}, {"data": [[1.66271268E12, 76.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-59", "isController": false}, {"data": [[1.66271268E12, 150.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-41", "isController": false}, {"data": [[1.66271268E12, 4507.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature", "isController": false}, {"data": [[1.66271268E12, 76.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-47", "isController": false}, {"data": [[1.66271268E12, 2748.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login", "isController": false}, {"data": [[1.66271268E12, 165.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-50", "isController": false}, {"data": [[1.66271268E12, 150.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-54", "isController": false}, {"data": [[1.66271268E12, 214.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-53", "isController": false}, {"data": [[1.66271268E12, 341.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-52", "isController": false}, {"data": [[1.66271268E12, 504.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-51", "isController": false}, {"data": [[1.66271268E12, 251.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-47", "isController": false}, {"data": [[1.66271268E12, 775.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-46", "isController": false}, {"data": [[1.66271268E12, 343.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-45", "isController": false}, {"data": [[1.66271268E12, 208.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-44", "isController": false}, {"data": [[1.66271268E12, 206.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-49", "isController": false}, {"data": [[1.66271268E12, 201.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-48", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66271268E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.66271268E12, "maxY": 6314.0, "series": [{"data": [[1.66271268E12, 166.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-43", "isController": false}, {"data": [[1.66271268E12, 155.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-42", "isController": false}, {"data": [[1.66271268E12, 161.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-41", "isController": false}, {"data": [[1.66271268E12, 680.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-40", "isController": false}, {"data": [[1.66271268E12, 155.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-36", "isController": false}, {"data": [[1.66271268E12, 78.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-22", "isController": false}, {"data": [[1.66271268E12, 830.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-35", "isController": false}, {"data": [[1.66271268E12, 84.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-21", "isController": false}, {"data": [[1.66271268E12, 329.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-34", "isController": false}, {"data": [[1.66271268E12, 929.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-24", "isController": false}, {"data": [[1.66271268E12, 149.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-33", "isController": false}, {"data": [[1.66271268E12, 83.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-23", "isController": false}, {"data": [[1.66271268E12, 334.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-39", "isController": false}, {"data": [[1.66271268E12, 328.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-38", "isController": false}, {"data": [[1.66271268E12, 82.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-20", "isController": false}, {"data": [[1.66271268E12, 645.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-37", "isController": false}, {"data": [[1.66271268E12, 88.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-29", "isController": false}, {"data": [[1.66271268E12, 990.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-26", "isController": false}, {"data": [[1.66271268E12, 936.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-25", "isController": false}, {"data": [[1.66271268E12, 78.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-28", "isController": false}, {"data": [[1.66271268E12, 1099.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-27", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-1", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-2", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-3", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-4", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-5", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-6", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-7", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-8", "isController": false}, {"data": [[1.66271268E12, 323.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-32", "isController": false}, {"data": [[1.66271268E12, 154.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-31", "isController": false}, {"data": [[1.66271268E12, 367.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-30", "isController": false}, {"data": [[1.66271268E12, 1174.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-0", "isController": false}, {"data": [[1.66271268E12, 165.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-25", "isController": false}, {"data": [[1.66271268E12, 79.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-33", "isController": false}, {"data": [[1.66271268E12, 157.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-24", "isController": false}, {"data": [[1.66271268E12, 82.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-32", "isController": false}, {"data": [[1.66271268E12, 210.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-23", "isController": false}, {"data": [[1.66271268E12, 88.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-35", "isController": false}, {"data": [[1.66271268E12, 323.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-22", "isController": false}, {"data": [[1.66271268E12, 90.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-34", "isController": false}, {"data": [[1.66271268E12, 160.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-29", "isController": false}, {"data": [[1.66271268E12, 152.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-28", "isController": false}, {"data": [[1.66271268E12, 148.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-27", "isController": false}, {"data": [[1.66271268E12, 96.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-31", "isController": false}, {"data": [[1.66271268E12, 346.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-26", "isController": false}, {"data": [[1.66271268E12, 86.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-30", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-9", "isController": false}, {"data": [[1.66271268E12, 85.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-37", "isController": false}, {"data": [[1.66271268E12, 78.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-36", "isController": false}, {"data": [[1.66271268E12, 78.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-39", "isController": false}, {"data": [[1.66271268E12, 81.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-38", "isController": false}, {"data": [[1.66271268E12, 158.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-21", "isController": false}, {"data": [[1.66271268E12, 337.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-20", "isController": false}, {"data": [[1.66271268E12, 320.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-14", "isController": false}, {"data": [[1.66271268E12, 156.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-13", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-12", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-11", "isController": false}, {"data": [[1.66271268E12, 165.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-18", "isController": false}, {"data": [[1.66271268E12, 323.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-17", "isController": false}, {"data": [[1.66271268E12, 159.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-16", "isController": false}, {"data": [[1.66271268E12, 155.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-15", "isController": false}, {"data": [[1.66271268E12, 155.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-19", "isController": false}, {"data": [[1.66271268E12, 162.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-10", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-11", "isController": false}, {"data": [[1.66271268E12, 146.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-10", "isController": false}, {"data": [[1.66271268E12, 334.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-13", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-12", "isController": false}, {"data": [[1.66271268E12, 81.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-19", "isController": false}, {"data": [[1.66271268E12, 80.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-18", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-9", "isController": false}, {"data": [[1.66271268E12, 332.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-15", "isController": false}, {"data": [[1.66271268E12, 336.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-14", "isController": false}, {"data": [[1.66271268E12, 264.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-17", "isController": false}, {"data": [[1.66271268E12, 242.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-16", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-4", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-3", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-2", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-1", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-8", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-7", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-6", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-5", "isController": false}, {"data": [[1.66271268E12, 1160.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-0", "isController": false}, {"data": [[1.66271268E12, 988.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-0", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-1", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-2", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-3", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-4", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-5", "isController": false}, {"data": [[1.66271268E12, 6314.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-6", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-7", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-8", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-9", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-18", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-19", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-20", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-21", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-22", "isController": false}, {"data": [[1.66271268E12, 997.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-0", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-1", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-2", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-3", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-4", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-20", "isController": false}, {"data": [[1.66271268E12, 678.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-10", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-11", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-12", "isController": false}, {"data": [[1.66271268E12, 148.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-13", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-14", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-15", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-16", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-17", "isController": false}, {"data": [[1.66271268E12, 144.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-10", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-11", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-12", "isController": false}, {"data": [[1.66271268E12, 90.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-13", "isController": false}, {"data": [[1.66271268E12, 101.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-14", "isController": false}, {"data": [[1.66271268E12, 85.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-15", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-16", "isController": false}, {"data": [[1.66271268E12, 997.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-17", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-18", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-19", "isController": false}, {"data": [[1.66271268E12, 288.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-52", "isController": false}, {"data": [[1.66271268E12, 300.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-50", "isController": false}, {"data": [[1.66271268E12, 261.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-51", "isController": false}, {"data": [[1.66271268E12, 1995.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home", "isController": false}, {"data": [[1.66271268E12, 148.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-45", "isController": false}, {"data": [[1.66271268E12, 152.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-46", "isController": false}, {"data": [[1.66271268E12, 142.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-43", "isController": false}, {"data": [[1.66271268E12, 148.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-44", "isController": false}, {"data": [[1.66271268E12, 141.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-41", "isController": false}, {"data": [[1.66271268E12, 144.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-42", "isController": false}, {"data": [[1.66271268E12, 294.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-40", "isController": false}, {"data": [[1.66271268E12, 148.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-8", "isController": false}, {"data": [[1.66271268E12, 155.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-7", "isController": false}, {"data": [[1.66271268E12, 518.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-6", "isController": false}, {"data": [[1.66271268E12, 699.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-5", "isController": false}, {"data": [[1.66271268E12, 386.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-49", "isController": false}, {"data": [[1.66271268E12, 163.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-47", "isController": false}, {"data": [[1.66271268E12, 152.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-9", "isController": false}, {"data": [[1.66271268E12, 408.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-48", "isController": false}, {"data": [[1.66271268E12, 1995.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-0", "isController": false}, {"data": [[1.66271268E12, 966.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-4", "isController": false}, {"data": [[1.66271268E12, 169.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-3", "isController": false}, {"data": [[1.66271268E12, 523.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-2", "isController": false}, {"data": [[1.66271268E12, 501.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-1", "isController": false}, {"data": [[1.66271268E12, 1160.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company", "isController": false}, {"data": [[1.66271268E12, 158.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-34", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-5", "isController": false}, {"data": [[1.66271268E12, 668.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-35", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-6", "isController": false}, {"data": [[1.66271268E12, 335.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-32", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-7", "isController": false}, {"data": [[1.66271268E12, 157.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-33", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-8", "isController": false}, {"data": [[1.66271268E12, 693.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-30", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-9", "isController": false}, {"data": [[1.66271268E12, 163.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-31", "isController": false}, {"data": [[1.66271268E12, 152.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-38", "isController": false}, {"data": [[1.66271268E12, 156.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-39", "isController": false}, {"data": [[1.66271268E12, 332.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-36", "isController": false}, {"data": [[1.66271268E12, 343.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-37", "isController": false}, {"data": [[1.66271268E12, 161.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-23", "isController": false}, {"data": [[1.66271268E12, 182.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-24", "isController": false}, {"data": [[1.66271268E12, 156.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-21", "isController": false}, {"data": [[1.66271268E12, 179.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-22", "isController": false}, {"data": [[1.66271268E12, 168.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-20", "isController": false}, {"data": [[1.66271268E12, 152.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-29", "isController": false}, {"data": [[1.66271268E12, 157.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-27", "isController": false}, {"data": [[1.66271268E12, 155.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-28", "isController": false}, {"data": [[1.66271268E12, 156.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-25", "isController": false}, {"data": [[1.66271268E12, 334.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-26", "isController": false}, {"data": [[1.66271268E12, 146.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-12", "isController": false}, {"data": [[1.66271268E12, 149.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-13", "isController": false}, {"data": [[1.66271268E12, 1627.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-10", "isController": false}, {"data": [[1.66271268E12, 383.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-11", "isController": false}, {"data": [[1.66271268E12, 158.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-18", "isController": false}, {"data": [[1.66271268E12, 162.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-19", "isController": false}, {"data": [[1.66271268E12, 158.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-16", "isController": false}, {"data": [[1.66271268E12, 164.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-17", "isController": false}, {"data": [[1.66271268E12, 721.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-14", "isController": false}, {"data": [[1.66271268E12, 160.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-15", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-61", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-60", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-58", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-44", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-57", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-43", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-56", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-46", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-55", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-45", "isController": false}, {"data": [[1.66271268E12, 80.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-40", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-42", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-59", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-41", "isController": false}, {"data": [[1.66271268E12, 988.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-47", "isController": false}, {"data": [[1.66271268E12, 1174.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login", "isController": false}, {"data": [[1.66271268E12, 161.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-50", "isController": false}, {"data": [[1.66271268E12, 149.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-54", "isController": false}, {"data": [[1.66271268E12, 189.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-53", "isController": false}, {"data": [[1.66271268E12, 230.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-52", "isController": false}, {"data": [[1.66271268E12, 182.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-51", "isController": false}, {"data": [[1.66271268E12, 225.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-47", "isController": false}, {"data": [[1.66271268E12, 351.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-46", "isController": false}, {"data": [[1.66271268E12, 160.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-45", "isController": false}, {"data": [[1.66271268E12, 189.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-44", "isController": false}, {"data": [[1.66271268E12, 206.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-49", "isController": false}, {"data": [[1.66271268E12, 200.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-48", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66271268E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.66271268E12, "maxY": 853.0, "series": [{"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-43", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-42", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-41", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-40", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-36", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-22", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-35", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-21", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-34", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-24", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-33", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-23", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-39", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-38", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-20", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-37", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-29", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-26", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-25", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-28", "isController": false}, {"data": [[1.66271268E12, 172.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-27", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-1", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-2", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-3", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-4", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-5", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-6", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-7", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-8", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-32", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-31", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-30", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-0", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-25", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-33", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-24", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-32", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-23", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-35", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-22", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-34", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-29", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-28", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-27", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-31", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-26", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-30", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-9", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-37", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-36", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-39", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-38", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-21", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-20", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-14", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-13", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-12", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-11", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-18", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-17", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-16", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-15", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-19", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-10", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-11", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-10", "isController": false}, {"data": [[1.66271268E12, 256.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-13", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-12", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-19", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-18", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-9", "isController": false}, {"data": [[1.66271268E12, 250.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-15", "isController": false}, {"data": [[1.66271268E12, 250.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-14", "isController": false}, {"data": [[1.66271268E12, 178.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-17", "isController": false}, {"data": [[1.66271268E12, 162.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-16", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-4", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-3", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-2", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-1", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-8", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-7", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-6", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-5", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-0", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-0", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-1", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-2", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-3", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-4", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-5", "isController": false}, {"data": [[1.66271268E12, 853.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-6", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-7", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-8", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-9", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-18", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-19", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-20", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-21", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-22", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-0", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-1", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-2", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-3", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-4", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-20", "isController": false}, {"data": [[1.66271268E12, 366.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-10", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-11", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-12", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-13", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-14", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-15", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-16", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-17", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-10", "isController": false}, {"data": [[1.66271268E12, 212.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-11", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-12", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-13", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-14", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-15", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-16", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-17", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-18", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-19", "isController": false}, {"data": [[1.66271268E12, 172.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-52", "isController": false}, {"data": [[1.66271268E12, 174.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-50", "isController": false}, {"data": [[1.66271268E12, 164.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-51", "isController": false}, {"data": [[1.66271268E12, 853.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-45", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-46", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-43", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-44", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-41", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-42", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-40", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-8", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-7", "isController": false}, {"data": [[1.66271268E12, 362.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-6", "isController": false}, {"data": [[1.66271268E12, 363.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-5", "isController": false}, {"data": [[1.66271268E12, 237.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-49", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-47", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-9", "isController": false}, {"data": [[1.66271268E12, 274.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-48", "isController": false}, {"data": [[1.66271268E12, 853.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-0", "isController": false}, {"data": [[1.66271268E12, 817.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-4", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-3", "isController": false}, {"data": [[1.66271268E12, 361.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-2", "isController": false}, {"data": [[1.66271268E12, 345.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-1", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-34", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-5", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-35", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-6", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-32", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-7", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-33", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-8", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-30", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-9", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-31", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-38", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-39", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-36", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-37", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-23", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-24", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-21", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-22", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-20", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-29", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-27", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-28", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-25", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-26", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-12", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-13", "isController": false}, {"data": [[1.66271268E12, 551.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-10", "isController": false}, {"data": [[1.66271268E12, 281.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-11", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-18", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-19", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-16", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-17", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-14", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-15", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-61", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-60", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-58", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-44", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-57", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-43", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-56", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-46", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-55", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-45", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-40", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-42", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-59", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-41", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-47", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-50", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-54", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-53", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-52", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-51", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-47", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-46", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-45", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-44", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-49", "isController": false}, {"data": [[1.66271268E12, 0.0]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-48", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66271268E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 76.0, "minX": 1.66271268E12, "maxY": 6103.0, "series": [{"data": [[1.66271268E12, 6103.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.66271268E12, 814.200000000001]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.66271268E12, 4406.770000000003]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.66271268E12, 1301.9999999999989]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.66271268E12, 76.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.66271268E12, 160.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66271268E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 88.0, "minX": 1.0, "maxY": 1982.5, "series": [{"data": [[1.0, 1982.5], [8.0, 713.0], [2.0, 1809.5], [9.0, 154.0], [18.0, 207.0], [20.0, 157.0], [21.0, 88.0], [22.0, 166.5], [12.0, 314.5], [13.0, 367.0], [27.0, 139.0], [14.0, 154.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 27.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 1496.0, "series": [{"data": [[1.0, 1496.0], [8.0, 509.5], [2.0, 919.0], [9.0, 0.0], [18.0, 189.0], [20.0, 148.5], [21.0, 80.0], [22.0, 148.5], [12.0, 228.5], [13.0, 261.0], [27.0, 80.0], [14.0, 0.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 27.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 3.533333333333333, "minX": 1.66271268E12, "maxY": 3.533333333333333, "series": [{"data": [[1.66271268E12, 3.533333333333333]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66271268E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 1.2, "minX": 1.66271268E12, "maxY": 2.3333333333333335, "series": [{"data": [[1.66271268E12, 2.3333333333333335]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.66271268E12, 1.2]], "isOverall": false, "label": "304", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66271268E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.66271268E12, "maxY": 0.016666666666666666, "series": [{"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-11-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-28-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-17-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-41-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-43-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-0-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-1-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-10-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-5-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-8-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-35-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-50-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-26-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-9-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-9-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-44-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "Test-success", "isController": true}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-1-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-29-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-52-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-37-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-58-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-35-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-13-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-3-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-4-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-21-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-23-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-4-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-53-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-49-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-16-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-32-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-44-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-12-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-32-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-19-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-16-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-48-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-2-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-20-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-15-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-12-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-4-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-20-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-6-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-41-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-12-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-24-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-7-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-26-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-37-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-7-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-21-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-2-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-52-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-28-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-7-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-37-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-45-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-43-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-7-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-19-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-18-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-32-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-18-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-46-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-15-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-61-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-35-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-11-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-27-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-5-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-15-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-8-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-23-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-25-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-10-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-42-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-18-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-14-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-51-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-29-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-10-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-2-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-34-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-17-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-46-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-31-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-4-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-38-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-5-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-10-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-55-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-2-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-43-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-14-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-34-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-5-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-54-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-3-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-22-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-5-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-22-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-9-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-13-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-30-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-39-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-47-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-16-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-15-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-48-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-33-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-1-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-17-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-13-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-45-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-18-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-31-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-40-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-13-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-21-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-6-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-16-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-25-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-39-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-27-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-8-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-0-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-2-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-27-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-36-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-20-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-40-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-12-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-19-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-6-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-44-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-8-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-9-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-19-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-36-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-0-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-28-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-45-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-57-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-36-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-12-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-24-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-16-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-41-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-24-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-13-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-19-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-33-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-50-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-11-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-11-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-20-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-1-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-15-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-47-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-33-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-30-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-3-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-49-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-14-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-56-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-20-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-39-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-21-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-11-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-3-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-42-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-10-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-22-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-40-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-51-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-25-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-38-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-6-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-6-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-23-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-1-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-0-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-7-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-38-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-8-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-18-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-31-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-47-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-17-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-42-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-46-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-34-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-60-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/company-9-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-59-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-30-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-14-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=cms/feature-26-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-29-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-14-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-22-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=common/home-4-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-17-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=marketplace/extension-0-success", "isController": false}, {"data": [[1.66271268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.opencart.com/index.php?route=account/login-3-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66271268E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 3.55, "minX": 1.66271268E12, "maxY": 3.55, "series": [{"data": [[1.66271268E12, 3.55]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66271268E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
