import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';

import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import {
  NavLink,Link
} from 'react-router-dom';

export default class PageNation extends Component {
  
  PreviousDisabled(){
    if (this.props.currentPage <= 1) {
      return {
        disabled:true
      };
    }
    return {};
  }

  NextDisabled(){
    if (this.props.currentPage >= this.props.details.page_num) {
      return {
        disabled:true
      };
    }
    return {};
  }

  Url(page){
    return `/${this.props.info.name}/list/${page}`;
  }

  Active(page,currentPage){
    if (page == currentPage) {
        return {
        active:true
      }
    }
    return {};
  }

  ShowPages(){
    const currentPage = this.props.currentPage || 1;
    const startPage = Math.max(currentPage-3,1);
    const endPage = Math.min(currentPage+3,this.props.details.page_num||0);
    let PageList = [];
    console.log(currentPage,startPage,endPage);

    for(let i = startPage;i<= endPage;i++){
      PageList.push(
        <PaginationItem key={`${this.props.info.name}_page_${i}`} {...this.Active(i,currentPage)}>
          <Link className="page-link" to={this.Url(i)}>
            {i}
          </Link>
        </PaginationItem>
        );
    }
    return PageList;
  }

// <a class="page-link" href="#">«</a>
  render() {
    const PageList = this.ShowPages();
    console.log(PageList);
    return (
      <Pagination>
        <PaginationItem {...this.PreviousDisabled()}>
          <Link className="page-link" to={this.Url(this.props.currentPage-1)}>«</Link>
        </PaginationItem>
        {PageList}
        <PaginationItem {...this.NextDisabled()}>
          <Link className="page-link" to={this.Url(this.props.currentPage+1)}>»</Link>
        </PaginationItem>
      </Pagination>
    );
  }
}