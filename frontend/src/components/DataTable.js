import * as React from 'react';
import Cell from './Cell';
import {EventListener} from '@shopify/polaris';
import './DataTable.css';

export default class DataTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      cellHeights: [],
      
    };
    
    this.tableRef = React.createRef();
  }

  componentDidMount() {
    this.handleCellHeightResize();
  }

  renderHeadingRow = (_cell, cellIndex) => {
    const {headings} = this.props;
    const {cellHeights} = this.state;

    return (
      <Cell
        key={`heading-${cellIndex}`}
        content={headings[cellIndex]}
        header={true}
        fixed={cellIndex === 0 || cellIndex === 1}
        height= {cellHeights[0]}
        ind={cellIndex}
      />
    );
  };
  
  renderRow = (_row, rowIndex) => {
    const {rows} = this.props;
    const {cellHeights} = this.state;
    const heightIndex = rowIndex + 1;

    return (
      <tr key={`row-${rowIndex}`}>
        {rows[rowIndex].map((_cell, cellIndex) => {
          return (
            <Cell
              key={`${rowIndex}-${cellIndex}`}
              content={rows[rowIndex][cellIndex]}
              fixed={cellIndex === 0 || cellIndex == 1}
              height = {cellHeights[heightIndex]}
              ind={cellIndex}
            />
          )
        })}
      </tr>
    )
  };

  setTable = (table) => {
    this.table = table;
  }

  getTallestCellHeights = () => {
    const rows = Array.from(this.tableRef.current.getElementsByTagName('tr'));
    let {cellHeights} = this.state;

    (cellHeights = rows.map((row) => {
      const fixedCell1 = (row.childNodes)[0];
      const fixedCell2 = (row.childNodes)[1];
      return Math.max(row.clientHeight, fixedCell1.clientHeight, fixedCell2.clientHeight);
    }));

    return cellHeights;
  }

  handleCellHeightResize = () => {
    this.setState({cellHeights: this.getTallestCellHeights()});
  }

  render() {
    const {headings, rows, title} = this.props;

    this.renderHeadingRow = this.renderHeadingRow.bind(this);
    this.renderRow = this.renderRow.bind(this);
    
    const theadMarkup = (
      <tr key="heading">
        {headings.map(this.renderHeadingRow)}
      </tr>
    );

    const tbodyMarkup = rows.map(this.renderRow);
  
    return (
      <div className="DataTable">
          <div className="ScrollContainer">
          <EventListener event="resize" handler={this.handleCellHeightResize} />
          <table className="Table" ref={this.tableRef}>
            <caption>{title}</caption>
            <thead>{theadMarkup}</thead>
            <tbody>{tbodyMarkup}</tbody>
          </table>
          </div>
      </div>
    );
  }
}