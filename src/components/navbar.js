import React, {
	Component
} from 'react';
import ReactDOM from 'react-dom';
import {
	Navbar as NavbarBootstrap,
	NavLink,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	Container,
	Row,
	Col,
	Collapse
} from 'reactstrap';

class OneItem extends Component {
	render() {
		const className = window.data.class.SmallName == this.props.name ? "active" : "";
		return <NavItem>
			<NavLink href={`/m/${this.props.name}`} className={className}>{this.props.children}</NavLink>
		</NavItem>
	}
}

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
          <NavbarBrand href="/">Name</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
          <Nav navbar>
	          <OneItem name="app">App</OneItem>
	          <OneItem name="game">Game</OneItem>
          </Nav>
        </Collapse>
      </Container>
      </NavbarBootstrap>
		);
	}
}

const node = document.getElementById("react_navbar");
ReactDOM.render(<Navbar/>, node);