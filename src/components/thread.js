import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';

import {Link,Route,Redirect} from 'react-router-dom';

import {GetListData,GetOneData} from '../handler/ajax';

import {RandId} from '../handler/base';

import {OneArticle} from './article';
import List from './list';

class OneThread extends Component{
  constructor(props) {
    super(props);
    this.state = {
      data:{}
    };
    this.on_data_loaded = this.on_data_loaded.bind(this);
    this.OnePost = this.OnePost.bind(this);
  }

  on_data_loaded(data = {}) {
    this.setState({data:data});
  }

  componentDidMount() {
    GetOneData(this.props.info.name, this.props.match.params.id, this.on_data_loaded);
  }
  
  OnePost(data){
    return (<OneArticle info={this.props.info} key={RandId()} data={data}/>);
  }

  render(){
    const data = this.state.data;
    const posts = data.posts || [];
    return <div>
    <h1>
      {data.title}
    </h1>
     {posts.map(this.OnePost)}
    </div>;
  }
}


export default class Thread extends Component{
  constructor(props) {
    super(props);
    const model_info = props.info;
    this.OneThread = (props) => (<OneThread {...props} info={model_info} />)

    this.ListThread = (props) => (<List {...props} info={model_info}/>);
    this.DefaultRoute = (props)=> (<Redirect to={`/${model_info.name}/list/1`} />)
  }

  render(){
    return <div>
      <Route exact path={`/${this.props.info.name}`} component={this.DefaultRoute}  />
      <Route path={`/${this.props.info.name}/list/:page`} component={this.ListThread} />
      <Route path={`/${this.props.info.name}/p/:id`} component={this.OneThread} />
      </div>
  }
}