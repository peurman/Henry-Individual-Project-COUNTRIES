import "../../styles/Pages.css";

export default function Pages({
  countriesPerPage,
  totalCountries,
  paginate,
  currentPage,
}) {
  const pageNum = [];

  let maxPages = 1 + Math.ceil((totalCountries - 9) / countriesPerPage); // -> entero maximo siguiente, saco 9 paises de pag 1

  for (let i = 1; i <= maxPages; i++) {
    pageNum.push(i); // -> arreglo con cada página
  }

  return (
    <>
      <nav className="pagination">
        <ul>
          {pageNum.map((number) => (
            <span
              className={currentPage === number ? "active" : null}
              key={number.toString()}
            >
              <button
                id="pag"
                onClick={() => {
                  paginate(number);
                }}
              >
                {number}
              </button>
            </span>
          ))}
        </ul>
      </nav>
    </>
  ); // -> activa y muestra boton de pag actual + manda NroPag al metodo paginate() > se arma nueva tanda de paises
}
