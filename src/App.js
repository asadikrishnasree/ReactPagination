import './App.css';
import React, { Component } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate'
import connect from './product.connect'
import { setJsonData } from "./products.action"
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      data: [],
      perPage: 5,
      currentPage: 0
    };
    this.handlePageClick = this
      .handlePageClick
      .bind(this);
  }
  deleteItem(selectedData) {
    const data = this.props?.products?.JsonList;
    const index = data?.findIndex(item => item.id == selectedData.id);
    let res = data.splice(index, 1);
    this.props.setJsonData(res);
    this.receivedData();
  }
  receivedData() {
    const data = this.props?.products?.JsonList;
    const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
    const postData =
      <React.Fragment>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Image</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {slice.map((item, i) => {
              return (
                <tr>
                  <td>{i+1}</td>
                  <td>{item.title}</td>
                  <td>
                    <img src={item.thumbnailUrl} alt="" />
                  </td>
                  <td><button onClick={() => this.deleteItem(item)}>Delete</button></td>
                </tr>)
            })}
          </tbody>
        </table>
      </React.Fragment>

    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      postData
    })
  }
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
      currentPage: selectedPage,
      offset: offset
    }, () => {
      this.receivedData()
    });

  };

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/photos`).then(res => {
      const data = res.data;
      this.props.setJsonData(data);
      // this.setState({ data: data }, () => { 
      this.receivedData()
      //  })
    })
  }
  render() {
    return (
      <div>
        {this.state.postData}
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"} />
      </div>

    )
  }
}

export default connect(App);