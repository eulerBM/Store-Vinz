import NavBar from "../Forms/NavBar";

function Product() {
    const [searchParams] = useSearchParams();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const searchTerm = searchParams.get('name');

    useEffect(() => {

        const fetchResults = async () => {

        try {

            const response = await axios.get('http://localhost:8080/products/get', {

            params: { id: searchTerm }

            });

            setResults(response.data);

        } catch (err) {

            setError('Erro ao buscar os resultados');

        } finally {

            setLoading(false);

        }
        };

        if (searchTerm) {

            fetchResults();

        }
    }, [searchTerm]);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <NavBar/>


    )
}

export default Product