import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';

import {NavItem,Container,Row,Col} from 'reactstrap';

import {fromJS,is} from 'immutable';

import Context from './context';

import {GetByPath} from '../handler/ajax';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:{}
    };
    this.on_data_loaded = this.on_data_loaded.bind(this);
  }

  componentDidMount() {
    this.LoadData();
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

  on_data_loaded(data = {}) {
    this.setState({data:data})
  }

  LoadData(){
    GetByPath("index",this.on_data_loaded);
  }
  
  render(){
    return <Context src_type={this.props.info.src_type}>
      {this.state.data.context || ""}
    </Context>
  }
}