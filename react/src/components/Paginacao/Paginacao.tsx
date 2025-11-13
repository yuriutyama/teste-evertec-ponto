import "./styles.css"

type PaginacaoProps = {
    itensPorPagina: number;
    totalItens: number;
    paginar: (...args: any[]) => any;
}


export default function Paginacao(props: PaginacaoProps) {
    const numeroPaginas = []

    for (let i = 1; i <= Math.ceil(props.totalItens / props.itensPorPagina); i++) {
        numeroPaginas.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
                {numeroPaginas.map(numero => (
                    <li key={numero} className="page-item">
                        <p onClick={() => props.paginar(numero)} className="page-link">
                            {numero}
                        </p>
                    </li>
                ))}
            </ul>
        </nav>
    );
}