import React from "react";
import ReactApexChart from "react-apexcharts";
import { connect } from "react-redux";

class ApexChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
      options: {
        chart: {
          type: "line",
          stacked: true,
          height: 350,
          zoom: {
            type: "x",
            enabled: false,
            autoScaleYaxis: true
          }
        },
        stroke: {
          width: 3,
          curve: "smooth"
        },
        title: {
          text: "Retail Sales",
          align: "left"
        },

        yaxis: {
          labels: {
            show: false
          }
        },
        xaxis: {
          type: "datetime"
        }
      }
    };
  }

  componentDidMount() {
    const salesDates = this.props.store.data.sales.map((obj) => {
      return { ...obj, date: new Date(obj.weekEnding) };
    });
    const sortedSales = salesDates.sort(
      (objA, objB) => Number(objA.date) - Number(objB.date)
    );
    var wholesale = [];
    var retail = [];
    sortedSales.forEach((element) => {
      wholesale.push({
        x: new Date(element.weekEnding),
        y: element.wholesaleSales
      });
      retail.push({
        x: new Date(element.weekEnding),
        y: element.retailSales
      });
    });

    this.setState({
      series: [
        {
          name: "Wholesale Sales",
          data: wholesale
        },
        {
          name: "Retail Sales",
          data: retail
        }
      ]
    });
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={300}
        />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    store: state
  }),
  (dispatch) => ({})
)(ApexChart);
