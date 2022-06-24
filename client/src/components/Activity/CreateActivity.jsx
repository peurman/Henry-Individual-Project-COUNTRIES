import React from "react";
import { useDispatch } from "react-redux";
import { createActivity } from "../../redux/actions";

export default function CreateActivity() {
  const dispatch = useDispatch();

  let [myForm, setMyForm] = React.useState({
    // -> uso estado local
    name: "",
    difficulty: 0,
    duration: "",
    season: 0,
    countries: [],
  });

  let handleChange = (e) => {
    setMyForm({
      ...myForm,
      [e.target.name]: e.target.value, // -> voy seteando cada valor
    });
  };
  let handleSubmit = (e) => {
    e.preventDefault(); // -> al querer salir  aviso x info cargada
    dispatch(createActivity(myForm)); /// -> con el submit hago el post
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input
          type="text"
          onChange={(e) => handleChange(e)}
          value={myForm.name}
          name="name"
        />
        <label>Difficulty: </label>
        <input
          type="number"
          onChange={(e) => handleChange(e)}
          value={myForm.difficulty}
          name="difficulty"
        />
        <label>Duración: </label>
        <input
          type="number"
          onChange={(e) => handleChange(e)}
          value={myForm.duration}
          name="duration"
        />
        <label>Season: </label>
        <input
          type="text"
          onChange={(e) => handleChange(e)}
          value={myForm.season}
          name="season"
        />
        <label>Countries: </label>
        <input
          type="text"
          onChange={(e) => handleChange(e)}
          value={myForm.countries}
          name="countries"
        />

        <button type="submit">Create Activity</button>
      </form>
    </div>
  );
}
