import React from "react";
import './styles/Pagination.css'

const Pagination = ({characterPerPage, currentPage, setCurrentPage, totalCharacter}) => {

    const pageNumber = []

    for (let i = 1; i <= Math.ceil(totalCharacter / characterPerPage); i++){
        pageNumber.push(i)
    }

    const onSpecificPage = (n) =>{
        setCurrentPage(n)
    }


  return (
    <nav
      className="pagination is-centered p-6"
      role="navigation"
      aria-label="pagination"
    >
      <ul className="pagination-list">
        {
            pageNumber.map(noPage => (
                <li key={noPage}>
                    <a className={`pagination-link ${noPage === currentPage ? 'is-current' : ''}`} onClick={() => onSpecificPage(noPage)} >{noPage}</a>
                </li>
            ))
        }     
      </ul>
    </nav>
  );
};

export default Pagination;
