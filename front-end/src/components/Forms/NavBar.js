import '../../css/HomeCss.css';

function NavBar (){
    return (
        
                <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a class="navbar-brand" href="#">Store-Vinz</a>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Principal</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">Conta</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">Sair</a>
                </li>
            </ul>
            <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="..." aria-label="Search"/>
                <button class="btn btn-outline-success" type="submit">Procurar</button>
            </form>
            </div>
        </div>
        </nav>

    );
}

export default NavBar;