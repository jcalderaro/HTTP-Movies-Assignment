//-----------------------------------------------------------//
// - Create a component with a form to update the chosen movie
//-----------------------------------------------------------//


//-----------------------------------------------------------//
import React, { useState, useEffect } from "react";
import axios from "axios";
//-----------------------------------------------------------//

const initialValue = {

    title: "",
    director: "",
    metascore: "",
    stars: []
};

//-----------------------------------------------------------//

const UpdateMovie = props => {
    const [ movie, setMovie ] = useState(initialValue);

    useEffect(() => {
        console.log(props.movies);
        const movieToEdit = props.movies.find(movie => {
                    return `${movie.id}` === props.match.params.id;
        });

        console.log("MovieToEdit", movieToEdit);
        if (movieToEdit){
            setMovie(movieToEdit);
        }

    }, []);

//-----------------------------------------------------------//

    const changeHandler = event => {
        setMovie({...movie, [event.target.name]:event.target.value});
    }

    const handleSubmit = event => {
        event.preventDefault();
        axios
        .put(`http://localhost:3000/movies/${props.match.params.id}`, movie)
        .then(response => {
            console.log(response)
            props.history.push(props.match.params.id)
        })
        .catch(error => {
            console.log(error)
        })
    }

//-----------------------------------------------------------//

    return(
        <div>
            <h1>Update Movies!</h1>
            <form>
            <input
                type="text"
                name="title"
                onChange={changeHandler}
                placeholder="Title"
                value={movie.title}
            />
            <input
                type="text"
                name="director"
                onChange={changeHandler}
                placeholder="Director"
                value={movie.director}
            />
            <input
                type="text"
                name="metascore"
                onChange={changeHandler}
                placeholder="Metascore"
                value={movie.metascore}
            />
            <input
                type="text"
                name="stars"
                onChange={changeHandler}
                placeholder="Stars"
                value={movie.stars}
            />
            <button onClick={(event) => props.editMovie(event, movie)}>Update Movie</button>
            </form>
        </div>
    );
};

//-----------------------------------------------------------//

export default UpdateMovie;

//-----------------------------------------------------------//