import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';

import {NavItem,Container,Row,Col} from 'reactstrap';
import {HashRouter,NavLink,Link,Route} from 'react-router-dom';

import NavBar from './navbar.js';

export default class MainWindow extends Component{
  constructor(props) {
    super(props);
    this.allModels = props.config.model;
    this.AllModelComponents = {};
    this.allModelNameList = [];
    this.initializeAllModel();
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

  render(){
    return (
    <HashRouter basename="/">
    <Container className="fluid">
    <NavBar config={this.props.config}>
     {this.allModelNameList.map(this.NavItem.bind(this))} 
    </NavBar>
      <div style={{height:100}}> </div>
      <Row>
      <Col lg={10}>
        {this.allModelNameList.map(this.Model.bind(this))}
      </Col>
      </Row>
    </Container>
    </HashRouter>);
  }
}