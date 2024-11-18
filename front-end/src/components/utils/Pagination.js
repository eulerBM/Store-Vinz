import { useState, useEffect } from 'react';

function Pagination({totalPages_, pageAtual_, onPageChange}) {
    const [totalPages, setTotalPages] = useState(totalPages_);
    const [PageAtual, setPageAtual] = useState(pageAtual_)

    useEffect(() => {
        setTotalPages(totalPages_);
        setPageAtual(pageAtual_);
    }, [totalPages_, pageAtual_]);

    function activeCssInButtons (pageAtualUser) {

        const activeLinks = document.querySelectorAll('.page-link.active');

        activeLinks.forEach(link => link.classList.remove('active'));

        let links = document.getElementById(`pagination-${pageAtualUser}`);

        if (links) {

            links.classList.add("active");

        } 
    }

    const pageViews = ({pageClick, proxima, voltar}) => {

        if (pageClick > totalPages || PageAtual < 0) return;

        if (pageClick){

            onPageChange(pageClick)
                
            activeCssInButtons(PageAtual);

        } 
        else if ( proxima == true){

            if (PageAtual >= totalPages -1){

                onPageChange(0)
                activeCssInButtons(PageAtual);

            } else {
                
                onPageChange(PageAtual + 1)
                activeCssInButtons(PageAtual);

            }
        }
        else if (voltar == true){

            onPageChange(PageAtual - 1)

            activeCssInButtons(PageAtual);

        }
    };

    return (
        <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item">
                    <a class="page-link" aria-label="Previous" onClick={() => pageViews({voltar: true})}>
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                    </li>

                    {totalPages > 0 ? (

                        Array.from({ length: totalPages }, (_, index) => (
                            <li className="page-item" key={index}>
                                <a className="page-link" id={`pagination-${index}`} onClick={() => pageViews({ pageClick: index})}>{index +1}</a>
                            </li>
                        ))
                    ) : (
                        <p>Erro no sistema!</p>
                    )}
                                        
                    <li class="page-item">
                    <a class="page-link" aria-label="Next" onClick={() => pageViews({proxima: true})}>
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                    </li>
                </ul>
        </nav>
    );
}

export default Pagination;
