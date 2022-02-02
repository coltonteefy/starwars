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
        "https://cdn.dribbble.com/users/75868/screenshots/1323753/star_wars_anewhope_ps_fin_s_c_web2.jpg",
        "https://dvdmedia.ign.com/dvd/image/ep2_wallpaper800.jpg",
        "https://images.techtimes.com/data/images/full/180695/phantommenacereviewroundupheader.jpg?w=600&h=300",
        "http://simonz.co.hu/wallp/ep3/800/battleheroes-wallp.jpg",
        "https://www.starwarsnewsnet.com/wp-content/uploads/2013/10/star-wars-return-of-the-jedi1-300x2251.jpg",
        "http://filmjunkee.com/wp-content/uploads/2013/10/star-wars-empire-strikes-back.jpg",
        "https://i.gadgets360cdn.com/large/star-wars-episode-9-poster-crop_1553756556398.jpg"
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