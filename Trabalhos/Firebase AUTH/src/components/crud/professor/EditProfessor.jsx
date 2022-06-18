import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import FirebaseContext from "../../../utils/FirebaseContext";
import FirebaseProfessorService from "../../../services/FirebaseprofessorService";


const EditProfessorPage = () =>
    <FirebaseContext.Consumer>
        {(firebase)=><EditProfessor firebase={firebase} />}
    </FirebaseContext.Consumer>

function EditProfessor(props) {

    const [name, setName] = useState("")
    const [course, setUniversity] = useState("")
    const [degree, setDegree] = useState(0)
    const params = useParams()
    const navigate = useNavigate()

    //https://pt-br.reactjs.org/docs/hooks-effect.html
    useEffect(
        () => {

            //axios.get('http://localhost:3001/professors/' + params.id)
            /*axios.get('http://localhost:3002/crud/professors/retrieve/' + params.id)
                .then(
                    (res) => {
                        setName(res.data.name)
                        setCourse(res.data.course)
                        setdegree(res.data.degree)
                    }
                )
                .catch(
                    (error) => {
                        console.log(error)
                    }
                )*/
            //FirebaseService.retrieve(
            FirebaseProfessorService.retrieve_promisse(
                props.firebase.getFirestoreDb(),
                (professor)=>{
                    setName(professor.name)
                    setUniversity(professor.course)
                    setDegree(professor.degree)
                },
                params.id
            )

        }
        ,
        [params.id,props]
    )

    const handleSubmit = (event) => {
        event.preventDefault()
        const updatedProfessor =
        {
            name, course, degree
        }
        //axios.put('http://localhost:3001/professors/' + params.id, updatedprofessor)
        /*axios.put('http://localhost:3002/crud/professors/update/' + params.id, updatedprofessor)
            .then(
                res => {
                    //console.log(res.data)
                    //props.history.push('/listprofessor');
                    //console.log(props)
                    navigate("/listprofessor")
                }
            )
            .catch(error => console.log(error))*/
        FirebaseProfessorService.update(
            props.firebase.getFirestoreDb(),
            ()=>{
                navigate("/listprofessor")
            },
            params.id,
            updatedProfessor)
    }

    return (
        <>
            <main>
                <h2>
                    Editar Professor
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nome: </label>
                        <input type="text"
                            className="form-control"
                            value={(name == null || name === undefined) ? "" : name}
                            name="name"
                            onChange={(event) => { setName(event.target.value) }} />
                    </div>
                    <div className="form-group">
                        <label>Curso: </label>
                        <input type="text"
                            className="form-control"
                            value={course ?? ""}
                            name="course"
                            onChange={(event) => { setUniversity(event.target.value) }} />
                    </div>
                    <div className="form-group">
                        <label>degree: </label>
                        <input type="text"
                            className="form-control"
                            value={degree ?? 0}
                            name="degree"
                            onChange={(event) => { setDegree(event.target.value) }} />
                    </div>
                    <div className="form-group" style={{ paddingTop: 20 }}>
                        <input type="submit" value="Atualizar Estudante" className="btn btn-primary" />
                    </div>
                </form>
            </main>
            <nav>
                <Link to="/">Home</Link>
            </nav>
        </>
    );
}

export default EditProfessorPage