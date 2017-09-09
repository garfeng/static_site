import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';

import {fromJS,is} from 'immutable';

import {Link,Route} from 'react-router-dom';
import {GetListData,GetOneData,GetDetailsOfList} from '../handler/ajax';
import PageNation from './pagenation';

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : props.data || [],
      details : props.details || {}
    }

    this.on_data_loaded = this.on_data_loaded.bind(this);
    this.on_details_loaded = this.on_details_loaded.bind(this);
    this.OneItem = this.OneItem.bind(this);
    this.Pages = this.Pages.bind(this);
  }

  on_data_loaded(data = []) {
    console.log("list = ",data)
    this.setState({data:data})
    this.LoadDetails();
  }

  on_details_loaded(details = {}){
    this.setState({details:details})
  }

  componentDidUpdate(prevProps, prevState) {
    const current_state = fromJS(this.state);
    const prev_state = fromJS(prevState);
    if (!is(current_state,prev_state)) {
      console.log("update");
      return;
    }

    const current_props = fromJS(this.props);
    const prev_props = fromJS(prevProps);

    if (!is(current_props,prev_props)) {
      console.log("update props");
      this.LoadData();
    }
    return;
  }



  LoadData(){
    if (typeof this.props.data === "undefined") {
      GetListData(this.props.info.name,this.props.match.params.page,this.on_data_loaded);
    } else {
      this.LoadDetails();
    }
  }

  LoadDetails(){
    if(typeof this.props.details === "undefined"){
      GetDetailsOfList(this.props.info.name,this.on_details_loaded);
    }
  }

  OneItem(data){
    return (
    <li key={`${this.props.info.name}_${data.id}`}>
    <Link to={`/${this.props.info.name}/p/${data.id}`}>{data.title}</Link>
    {" by "}
    <Link to={`/user/${data.uid}`}>{data.username}</Link>
    { ` (${data.time}) `}
    </li>
    );
  }

  Pages() {
    return (
      <PageNation info={this.props.info} 
      currentPage={parseInt(this.props.match.params.page)} 
      details={this.state.details}
      />
      );
  }

  componentDidMount() {
   this.LoadData();
  }

  render(){
    console.log("render")
    const data = this.state.data;
    const details = this.state.details;
    return (
      <div>
        <ul>
          {data.map(this.OneItem)}
        </ul>
        <hr />
        {this.Pages()}
      </div>
      );
  }
}
