import "./logview.css"
import * as echarts from 'echarts'
import ReactECharts from 'echarts-for-react';
export default function Logview() {
  var dat=[['31.01.2022 15:10:24', '31.01.2022 15:10:25', '31.01.2022 15:10:26'], [3602, 3602, 3602]];  
  
  var option = option = {
    title: {
      text: 'Stacked Line'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['C1', 'C2', 'C3', 'C4', 'C5','C6','C6','C7']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: dat[0]
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Email',
        type: 'line',
        stack: 'Total',
        data: dat[1]
      },
      {
        name: 'Union Ads',
        type: 'line',
        stack: 'Total',
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: 'Video Ads',
        type: 'line',
        stack: 'Total',
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: 'Direct',
        type: 'line',
        stack: 'Total',
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: 'Search Engine',
        type: 'line',
        stack: 'Total',
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      }
    ]
  };
  return (
      <div className="home">
        asdasd
        <ReactECharts option={option}/>
      </div>
    )
  }