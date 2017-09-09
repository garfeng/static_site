import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';

import {fromJS,is} from 'immutable';

import {Link,Route,Redirect} from 'react-router-dom';
import {GetListData,GetOneData,GetDetailsOfList} from '../handler/ajax';
import PageNation from './pagenation';
import Context from './context';

import List from './list';

export class OneArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data || {}
    };
    this.on_data_loaded = this.on_data_loaded.bind(this);
  }

  on_data_loaded(data = {}) {
    this.setState({data:data});
  }

  componentDidMount() {
    if (typeof this.props.data === "undefined") {
      GetOneData(this.props.info.name,this.props.match.params.id,this.on_data_loaded);
    }
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

  title(){
    if (typeof this.state.data.title != "undefined") {
      return <h1>{this.state.data.title}</h1>
    } else {
      return null;
    }
  }

  render(){
    const data = this.state.data;
    return (<div key={`post_${data.pid}`}>
      {this.title()}
    <hr />
    <p className="text-muted">
    <Link to={data.home_path || "/"}>{data.username}</Link>
    {" "} posted in {data.time}</p>
    <Context src_type={this.props.info.src_type}>
      {data.context}
    </Context>
    </div>);
  }
}

export default class Arcticle extends Component{
  constructor(props) {
    super(props);
    const model_info = props.info;
    this.OneArticle = (props) => (<OneArticle {...props} info={model_info} />)

    this.ListArticle = (props) => (<List {...props} info={model_info} />)
    this.DefaultRoute = (props)=> (<Redirect to={`/${model_info.name}/list/1`} />)

  }
  render(){
    return <div>
    <Route exact path={`/${this.props.info.name}`} component={this.DefaultRoute}  />
    <Route path={`/${this.props.info.name}/list/:page`} component={this.ListArticle} />
    <Route path={`/${this.props.info.name}/p/:id`} component={this.OneArticle} />
    </div>
  }
}