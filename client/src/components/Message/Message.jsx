import "../../styles/Message.css";

export default function Message({ show, onClose }) {
  if (show === "none") return null; // -> si es FALSO NO HACE NADA

  return (
    <div className="messageMain" id="messageMain">
      <div className="messageContainerA">
        <div className="messageContainerB">
          <div className="messageText1">
            <span>
              {show === "createAct"
                ? "Activity successfully created!!"
                : "OOPS!! ..."}
            </span>
          </div>
          <div className="messageText2">
            <span>
              {show === "createAct"
                ? "Now you will see this activity to filter by activity in the HOME section"
                : show === "activityNotFound"
                ? "This activity is not found in the current selection of countries"
                : show === "countriesWithoutAct"
                ? "The countries currently selected do not have any activities"
                : show === "searchWithoutLetters"
                ? "You have to write something to do the search"
                : show === "searchWithSpaces"
                ? "Spaces are not allowed, please search one word"
                : show === "searchWithSpecChar"
                ? "It is not possible to use special characters or numbers to perform the search, please use only common letters"
                : show === "noCountriesInCont"
                ? "In the current selection of countries, none of them is located in this continent."
                : show === "onlyOnce"
                ? "You cannot add the same country more than one time"
                : "No countries were found with the selected search"}
            </span>
          </div>
          <div className="messageClose">
            <button onClick={() => onClose()}>CLOSE</button>
          </div>
        </div>
      </div>
    </div>
  );
}
