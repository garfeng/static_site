import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';

import {Link,Route} from 'react-router-dom';

import {GetListData,GetOneData} from '../handler/ajax';

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
    return (<div key={`post_${data.pid}`}>
    <hr />
    <p className="text-muted">
    <Link to={data.home_path || "/"}>{data.username}</Link>
    {" "} posted in <strong>{data.time}</strong></p>
    {data.context}
    </div>);
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

class ListThread extends Component{
  render(){
    console.log(this.props);
    return <div>list thread</div>;
  }
}

export default class Thread extends Component{
  constructor(props) {
    super(props);
    const model_info = props.info;
    this.OneThread = (props) => (<OneThread {...props} info={model_info} />)

    this.ListThread = (props) => (<ListThread {...props} info={model_info}/>);
  }

  render(){
    return <div>
      <Route path="/thread/list/:page" component={this.ListThread} />
      <Route path="/thread/p/:id" component={this.OneThread} />
      </div>
  }
}