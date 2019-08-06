import React, {Component} from 'react';
import "../styles/MovieDetails.css";
import Spinner from 'react-spinner-material';
import CharacterDetail from "./CharacterDetail";

class MovieDetails extends Component {
    state = {
        details: [],
        loading: true
    };

    moviePosters = [
        "https://i0.wp.com/themediabyte.com/wp-content/uploads/2019/05/vstar-was-a-new-hope-albert-hall-2.jpg?resize=1000%2C500&ssl=1",
        "https://static1.srcdn.com/wp-content/uploads/2017/12/Star-Wars-Jedi-fight.jpg",
        "https://clashingsabers.files.wordpress.com/2019/05/anakin-qgj.jpg?w=1000",
        "https://aleteiaen.files.wordpress.com/2016/01/hero-darth-vader-lucas-arts-promo.jpg?quality=100&strip=all&w=1200",
        "https://vignette.wikia.nocookie.net/26a1a0d3-0b80-4b31-822b-aea09179fee6/scale-to-width-down/1000",
        "http://www.channelstarwars.com/wp-content/uploads/2017/04/DARTHVADER_Eng-1000x500-2.jpg",
        "https://image.dynamixse.com/s/crop/1200x500/https://static.whereyat.com/whereyatcom_598173146.jpg"
    ];

    componentDidMount() {
        console.log(this.props.movieSelected);
        this.fetchFilmDetails(this.props.movieSelected);

    }

    async fetchFilmDetails(film) {
        await fetch(film)
            .then(async res => {
                let response = await res.json();
                this.setState({
                    details: [...this.state.details, response],
                    loading: false,
                    title: response.title,
                    charactersURL: response.characters
                });
                return res
            });

        console.log(this.state.details[0]);
    }

    closeDetails() {
        document.getElementById("movie-details-wrapper").style.animation = "close .5s ease forwards";
        document.getElementById("bottom").style.animation = "open .5s ease forwards";
        document.getElementById("top").style.animation = "open .5s ease forwards";
        this.props.closeDetails();
    }

    render() {
        return (
            <div className="movie-details-wrapper" id="movie-details-wrapper">
                {
                    (this.state.loading ?
                            <div className="spinner">
                                <Spinner size={220}
                                         spinnerColor={"#e9c2e9"}
                                         spinnerWidth={4}
                                         visible={true}/>
                            </div>
                            :
                            <div className="test">
                                <div className="poster"
                                     style={{backgroundImage: `url(${this.moviePosters[this.props.index]})`}}>
                                    <button className="close-button"
                                            onClick={() => {
                                                this.closeDetails()
                                            }}>X
                                    </button>
                                </div>
                                <div className="details-title">
                                    {this.state.details[0].title}

                                    <div className="star-wars fade">
                                        <div className="opening-crawl">{this.state.details[0].opening_crawl}</div>
                                    </div>
                                </div>
                                {
                                    this.state.details.length > 0 &&
                                    <CharacterDetail charactersURL={this.state.details[0].characters}/>
                                }
                            </div>
                    )
                }
            </div>
        )
    }
}

export default MovieDetails;


/*

 <section>
                                    <h3>{this.state.details[0].director}</h3>
                                    <h3>{this.state.details[0].episode_id}</h3>
                                    <h3>{this.state.details[0].producer}</h3>
                                    <h3>{this.state.details[0].release_date}</h3>
                                    <h3>{this.state.details[0].species}</h3>
                                    <h3>{this.state.details[0].starships}</h3>
                                </section>


* */