import { useState, useEffect } from "react";
import axios from "axios";

function EstadosECidades() {
    const [estados, setEstados] = useState([]);
    const [estadoSelecionado, setEstadoSelecionado] = useState("");
    const [cidades, setCidades] = useState([]);
    const [cidadeSelecionada, setCidadeSelecionada] = useState("");

    // Carregar lista de estados ao montar o componente
    useEffect(() => {
        axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
            .then(response => {
                const estadosOrdenados = response.data.sort((a, b) => a.nome.localeCompare(b.nome));
                setEstados(estadosOrdenados);
            })
            .catch(error => console.error("Erro ao buscar estados:", error));
    }, []);

    // Carregar cidades quando um estado for selecionado
    useEffect(() => {
        if (estadoSelecionado) {
            axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`)
                .then(response => setCidades(response.data))
                .catch(error => console.error("Erro ao buscar cidades:", error));
        } else {
            setCidades([]);
        }
    }, [estadoSelecionado]);

    
    useEffect(() => {
        localStorage.setItem("estado", estadoSelecionado)
        localStorage.setItem("cidade", cidadeSelecionada)
    }, [estadoSelecionado, cidadeSelecionada]);

    return (
        <div className="form-group mt-3">
            <label htmlFor="endereco">Endereço</label>

            {/* Dropdown de Estados */}
            <select
                className="form-select"
                value={estadoSelecionado}
                onChange={(e) => setEstadoSelecionado(e.target.value)}
            >
                <option value="">Selecione um estado</option>
                {estados.map((estado) => (
                    <option key={estado.id} value={estado.sigla}>
                        {estado.nome}
                    </option>
                ))}
            </select>

            {/* Dropdown de Cidades */}
            <select
                className="form-select mt-2"
                value={cidadeSelecionada}
                onChange={(e) => setCidadeSelecionada(e.target.value)}
                disabled={!estadoSelecionado}
            >
                <option value="">Selecione uma cidade</option>
                {cidades.map((cidade) => (
                    <option key={cidade.id} value={cidade.nome}>
                        {cidade.nome}
                    </option>
                ))}
            </select>

            {/* Exibir seleção */}
            {estadoSelecionado && cidadeSelecionada && (
                <p className="mt-2">
                    Você selecionou: {cidadeSelecionada} - {estadoSelecionado}
                </p>
            )}
        </div>
    );
}

export default EstadosECidades;
