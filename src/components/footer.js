import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';
import {Container,Row,Col} from 'reactstrap';


export default class Footer extends Component {
  render (){
    return <Container>
      <Row>
        <Col lg={12}>
          <hr />
          <div style={{textAlign:"center",minHeight:"100px"}}>
            页面底部说明
          </div>
        </Col>
      </Row>
    </Container>
  }
}