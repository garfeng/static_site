import React, {
	Component
} from 'react';
import ReactDOM from 'react-dom';
import {
	Navbar as NavbarBootstrap,
	//NavLink,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	Container,
	Row,
	Col,
	Collapse
} from 'reactstrap';

export default class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false
		};

		this.toggle = this.toggle.bind(this);
	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}
	render() {
		/*
		<OnLogin component={UserInfo} updateState={this.props.updateState}/>
          <OnNotLogin component={LoginLink} updateState={this.props.updateState} />
		 */
		return (
			<NavbarBootstrap toggleable className="fixed-top navbar-inverse bg-primary">
        <NavbarToggler right onClick={this.toggle} />
        <Container>
          <NavbarBrand href={this.props.config.address}>{this.props.config.name}</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
          <Nav navbar>
	          {this.props.children}
          </Nav>
        </Collapse>
      </Container>
      </NavbarBootstrap>
		);
	}
}

