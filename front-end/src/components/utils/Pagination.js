import { useState } from 'react';

function Pagination({ totalPages, onPageChange }) {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
            onPageChange(page);  // Chama a função para carregar os dados da nova página
        }
    };

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item">
                    <a 
                        className="page-link" 
                        href="#"
                        onClick={() => handlePageChange(currentPage - 1)} 
                        aria-label="Previous"
                    >
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                {[...Array(totalPages)].map((_, index) => (
                    <li className="page-item" key={index + 1}>
                        <a 
                            className={`page-link ${currentPage === index + 1 ? 'active' : ''}`} 
                            href="#"
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </a>
                    </li>
                ))}
                <li className="page-item">
                    <a 
                        className="page-link" 
                        href="#"
                        onClick={() => handlePageChange(currentPage + 1)} 
                        aria-label="Next"
                    >
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;
