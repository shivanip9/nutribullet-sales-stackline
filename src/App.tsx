import "./styles.css";
import StackLineLogo from "./stackline_logo.svg";
import Chevron from "react-chevron";
import { connect } from "react-redux";
import ApexChart from "./chart";

function App(props) {
  const formatDate = (date) => {
    var d = date.split("-");
    return [d[1], d[2], d[0].substr(-2)].join("-");
  };

  return (
    <div className="App">
      <div className="heading">
        <img
          className="stackLineLogo"
          src={StackLineLogo}
          alt="StackLine Logo"
        />
      </div>
      <div className="product">
        <div className="productInfo">
          <img
            className="nutribulletLogo"
            src={props.store.data.image}
            alt="nutribullet"
          />
          <h4 className="title">{props.store.data.title}</h4>
          <p className="subTitle">{props.store.data.subtitle}</p>
          <div className="tagContainer">
            {props.store.data.tags.map((tag, index) => (
              <span className="tags" key={index}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="productDetails">
          <div className="sales-chart">
            <ApexChart />
          </div>
          <div className="sales-table">
            <div id="table">
              <div id="table-header">
                <div className="table-header-cell">
                  WEEK ENDING
                  <Chevron direction={"down"} />
                </div>
                <div className="table-header-cell">
                  RETAIL SALES
                  <Chevron direction={"down"} />
                </div>
                <div className="table-header-cell">
                  WHOLESALE SALES
                  <Chevron direction={"down"} />
                </div>
                <div className="table-header-cell">
                  UNITS SOLD
                  <Chevron direction={"down"} />
                </div>
                <div className="table-header-cell">
                  RETAILER MARGIN
                  <Chevron direction={"down"} />
                </div>
              </div>
              <div id="table-body">
                {props.store.data.sales.map((sale, index) => {
                  return (
                    <div id="table-row" key={index}>
                      <div className="table-body-cell">
                        {formatDate(sale.weekEnding)}
                      </div>
                      <div className="table-body-cell">
                        {sale.retailSales.toLocaleString()}
                      </div>
                      <div className="table-body-cell">
                        {sale.wholesaleSales.toLocaleString()}
                      </div>
                      <div className="table-body-cell">{sale.unitsSold}</div>
                      <div className="table-body-cell">
                        {sale.retailerMargin.toLocaleString()}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(
  (state) => ({
    store: state
  }),
  (dispatch) => ({})
)(App);
