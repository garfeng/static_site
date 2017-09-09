import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';

import {NavItem,Container,Row,Col} from 'reactstrap';
import {HashRouter,NavLink,Link,Route,Redirect} from 'react-router-dom';

import algoliasearch from 'algoliasearch';

import NavBar from './navbar';

import Footer from './footer'
import Index from './index';

export default class MainWindow extends Component{
  constructor(props) {
    super(props);
    this.allModels = props.config.model;
    this.AllModelComponents = {};
    this.allModelNameList = [];
    this.initializeAllModel();
    const config = props.config;
    this.DefaultClass = (props) => (<Index {...props} info={config} />);
  }

  initializeAllModel(){
    for (let model in this.allModels) {
      this.allModelNameList.push(model);
      this.AllModelComponents[model] = require('./'+this.allModels[model].type).default;
    }
  }

  NavItem(model){
    const model_info = this.allModels[model];
    return (
      <NavItem key={`nav_item_${model}`}>
        <NavLink to={`/${model}`} className="nav-link" activeClassName="active">
          {model_info.title}
        </NavLink>
      </NavItem>
      );
  }
  
  Model(model){
    const model_info = this.allModels[model];
    const ModelComponent = this.AllModelComponents[model];
    const Md = (props) => (
      <ModelComponent {...props} info={model_info} />
      );

    return (
      <Route path={`/${model}`} key={`model_${model}`} component={Md} />
      );
  }

  search(){
    var client = algoliasearch("5NL7A4OHNQ", "5ad511be53e2aeac1fdca2aadb251004");
    var index = client.initIndex('test');
    index.search('测试', function(err, content) {
    console.log(content.hits);
});

  }

  render(){
    this.search();
    return (
    <HashRouter basename="/">
    <div>
    <NavBar config={this.props.config}>
     {this.allModelNameList.map(this.NavItem.bind(this))} 
    </NavBar>
      <div style={{height:100}}> </div>
    <Container>
      <Row>
      <Col lg={8} md={8} sm={12} xs={12}>
        <Route exact path="/" component={this.DefaultClass} />
        {this.allModelNameList.map(this.Model.bind(this))}
      </Col>
      <Col lg={4} md={4} sm={12} xs={12}>
        侧边栏，可以放一些大家频繁使用的链接，
        比如MOG汉化说明合集。或xx的xx教程导航帖。
      </Col>
      </Row>
    </Container>
    <Footer/>
    </div>
    </HashRouter>);
  }
}