import React from "react";
import "./offdetails.css";
import { useParams } from "react-router-dom";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export const OfficerDetails = ({ detail, setDetail, info, allWorkers }) => {
  const { id } = useParams();
  let officer = info.find(({ _id }) => _id === id);
  const [editMode, setEdit] = useState(false);
  const [password, setPassword] = useState("");
  const [firstName, setName] = useState(officer.firstName);
  const [lastName, setSurname] = useState(officer.lastName);
  const [approved, setApproved] = useState(officer.approved);

  const handleEdit = (e) => {
    e.preventDefault();
    setEdit(!editMode);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setEdit(!editMode);

    axios
      .put(
        `https://sf-final-project-be.herokuapp.com/api/officers/${officer._id}`,
        {
          firstName: firstName,
          lastName: lastName,
          approved: approved,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        allWorkers();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  //удаляем сотрудника
  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(
        `https://sf-final-project-be.herokuapp.com/api/officers/${officer._id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        allWorkers(); 
        setDetail(!detail); 
      })
      .catch((err) => {
        console.log(err);
      });
  };

  
  return (
    <main className="details">
      <div className="businessCard">
        <div className="detailContainer">
          <div>
            <Link to={`/officers/`}>
              <span className="link" onClick={() => setDetail(!detail)}>
                X
              </span>
            </Link>

            <form className="surname">
              <label htmlFor="">Имя:</label>
              <input
                onChange={(e) => setName(e.target.value)}
                disabled={!editMode ? true : false}
                type="text"
                value={firstName}
              />
              <label htmlFor="">Фамилия:</label>
              <input
                onChange={(e) => setSurname(e.target.value)}
                type="text"
                value={lastName}
                disabled={!editMode ? true : false}
              />
              <label>Эл.почта:</label>
              <input type="text" value={officer.email} disabled />
              <label>Пароль:</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                value={password}
                disabled
              />
              <label>Идент.номер:</label>
              <input type="text" value={officer._id} disabled />
              <div className="approved">
                <label>Одобрен</label>
                <input
                  type="checkbox"
                  value={approved}
                  disabled={!editMode ? true : false}
                  checked={approved}
                  onChange={() => setApproved(!approved)}
                />
              </div>
              <div className="butts">
                {(!editMode && (
                  <button className="edit" onClick={handleEdit}>
                    редактировать
                  </button>
                )) || (
                  <button className="saveRedact" onClick={handleSubmit}>
                    сохранить
                  </button>
                )}
                <button className="delete" onClick={handleDelete}>
                  удалить
                </button> 
               
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};