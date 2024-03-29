import "../../styles/Pages.css";

export default function Pages({
  countriesxPage,
  totalCountries,
  paginating,
  currentPage,
}) {
  const pageNum = [];

  let maxPages = 1 + Math.ceil((totalCountries - 9) / countriesxPage);

  for (let i = 1; i <= maxPages; i++) {
    pageNum.push(i);
  }

  return (
    <>
      <nav className="pagination">
        <ul>
          {pageNum.map(
            (
              number // -> mapeo y voy mostrando cada nro de pagina
            ) => (
              <span
                className={currentPage === number ? "active" : null} // -> solo ACTIVO la pagina actual
                key={number.toString()}
              >
                <button
                  id="pag"
                  onClick={() => {
                    paginating(number);
                  }}
                >
                  {number}
                </button>
              </span>
            )
          )}
        </ul>
      </nav>
    </>
  ); // -> manda cada NroPag al metodo paginating(), que genera tanda de paises
}
