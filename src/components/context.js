import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';

import markdown from '../handler/markdown';

import bbcode from 'bbcode';

class Markdown extends Component {
  update(){
    const nd = this.refs["context"];
    $(nd).html(markdown(this.props.src));
  }

  componentDidMount() {
    this.update();  
  }

  componentDidUpdate(prevProps, prevState) {
    this.update();
  }

  render() {
    return <div ref="context"></div>
  }
}

class BBCode extends Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }
  
  update(src) {
    const nd = this.refs["context"];
    $(nd).html(src);
    //$("#context").html(src);
  }

  parse(){
    bbcode.parse(this.props.src,this.update);
  }

  componentDidMount() {
    this.parse();
  }

  componentDidUpdate(prevProps, prevState) {
    this.parse();
  }

  render(){
    return <div ref="context"></div>
  }
}

class Html extends Component {
  update() {
    const nd = this.refs["context"];
    $(nd).html(this.props.src);
  }
  componentDidMount() {
    this.update();
  }

  componentDidUpdate(prevProps, prevState) {
    this.update();
  }

  render(){
    return <div ref="context"></div>
  }
}

export default class Context extends Component {
  render() {
    const type = this.props.src_type;
    let CompType = "div";
    switch (type) {
      case "markdown":
        CompType = Markdown;
        break;
      case "bbcode":
        CompType = BBCode;
        break;
      default:
        CompType = Html;
    }
    return <CompType src={this.props.children} />;
  }
}