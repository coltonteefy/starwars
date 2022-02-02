import React, {Component} from 'react';
import "../styles/Films.css";
import MovieDetails from "./MovieDetails";

class Films extends Component {

    state = {
        data: [],
        movieDetailsOpen: false,
        movieSelected: "",
        index: 0
    };

    posterImages = [
        "a-new-hope.jpg",
        "empire-strikes-back.jpg",
        "return-jedi.jpg",
        "phantom-menace.jpg",
        "attack-of-the-clones.jpg",
        "revenge-of-sith.jpg"
    ];

    movieClicked(movie, index) {
        this.setState({
            movieDetailsOpen: true,
            movieSelected: movie,
            index: index
        });

        document.getElementById("bottom").style.animation = "close .5s ease forwards";
        document.getElementById("top").style.animation = "close .5s ease forwards";
    }

    closeMovieDetails() {
        setTimeout(() => {
            this.setState({
                movieDetailsOpen: false,
                movieSelected: ""
            });
        }, 500)
    }

    async getFilms() {
        let data = [];
        this.setState({
            data: []
        });

        await fetch("https://swapi.dev/api/films/")
            .then(async (res) => {
                let response = await res.json();
                data = [...data, response.results];
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            });

        data[0].map((res, index) => {
            this.setState({
                data: [...this.state.data, res]
            });
            return res;
        });
    }

    componentWillMount() {
        this.getFilms();
    }

    render() {
        return (
            <div className="films-wrapper">
                <div className="top" id="top">
                    <img src="./logo.png" alt="logo"/>
                </div>
                <div className="bottom" id="bottom">
                    <ul>
                        {this.state.data.map((res, index) => {
                                return (
                                    <li key={index}
                                        className="movie-list"
                                        style={{backgroundImage: `url(${this.posterImages[index]})`}}
                                        onClick={() => {
                                            this.movieClicked(res.url, index)
                                        }}>
                                        <div className="title">{res.title}</div>
                                    </li>
                                )
                            }
                        )}
                    </ul>
                </div>

                {
                    this.state.movieDetailsOpen === true &&
                    <MovieDetails movieSelected={this.state.movieSelected}
                                  index={this.state.index}
                                  closeDetails={() => {
                                      this.closeMovieDetails()
                                  }}/>
                }
            </div>
        )
    }
}

export default Films;