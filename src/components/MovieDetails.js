import React, {Component} from 'react';
import "../styles/MovieDetails.css";
import Spinner from 'react-spinner-material';
import CharacterDetail from "./CharacterDetail";

class MovieDetails extends Component {
    state = {
        title: "",
        loading: true,
        charactersURL: []
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
                    loading: false,
                    title: response.title,
                    charactersURL: response.characters
                });
                return res
            });
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
                                    {this.state.title}
                                </div>
                                {
                                    this.state.charactersURL.length > 0 &&
                                    <CharacterDetail charactersURL={this.state.charactersURL}/>
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

import React, {Component} from 'react';
import "../styles/MovieDetails.css";
import Spinner from 'react-spinner-material';

class MovieDetails extends Component {
    state = {
        title: "",
        nameList: [],
        idList: [],
        imageURL: [],
        allCharacterDetails: [],
        openedCharacterDetail: [],
        loading: true,
        detailsOpen: false
    };

    details;
    url;
    currentOpenedDetail = "";

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
        this.fetchMovieDetails();
    }

    async fetchMovieDetails() {
        await fetch(this.props.movieSelected)
            .then(async res => {
                this.details = await res.json();
            });

        this.fetAllCharacters();
    }

    async fetAllCharacters() {
        await Promise.all(
            this.details.characters.map(async (link, index) => {
                await fetch(link)
                    .then(async res => {
                        let characterDetails = await res.json();

                        this.url = await this.fetchAllCharactersImages(characterDetails.url.replace(/[^0-9]/g, ''));

                        this.setState({
                            nameList: [...this.state.nameList, characterDetails.name],
                            idList: [...this.state.idList, characterDetails.url.replace(/[^0-9]/g, '')]
                        })
                    });
                return link;
            })
        ).then(nameURL => {
            console.log("DONE", nameURL)
        });

        this.setState({
            title: this.details.title,
            loading: false
        });

        console.log(this.state);
    }

    fetchAllCharactersImages(id) {
        fetch("https://cdn.rawgit.com/akabab/starwars-api/0.2.1/api/id/" + id + ".json")
            .then(async res => {
                let response = await res.json();
                // this.imageURL = [...this.imageURL, response.image];
                // console.log(response);
                this.setState({
                    imageURL: [...this.state.imageURL, response.image],
                    allCharacterDetails: [...this.state.allCharacterDetails, response]
                });
                return response.image
            })
    }


    closeDetails() {
        document.getElementById("movie-details-wrapper").style.animation = "close .5s ease forwards";
        document.getElementById("bottom").style.animation = "open .5s ease forwards";
        document.getElementById("top").style.animation = "open .5s ease forwards";
        this.props.closeDetails();
    }

    showCharacterDetails(index) {
        this.setState({
            openedCharacterDetail: []
        });

        let charDetail = document.getElementById("character-detail-" + index);
        if (this.currentOpenedDetail === "") {
            charDetail.style.animation = "charDetailsOpen .5s ease forwards";
            this.currentOpenedDetail = "character-detail-" + index;
        } else if (this.currentOpenedDetail === "character-detail-" + index) {
            charDetail.style.animation = "charDetailsOpen .5s ease forwards" ? "charDetailsClose .5s ease forwards" : "charDetailsOpen .5s ease forwards"
            this.currentOpenedDetail = "";
        } else {
            charDetail.style.animation = "charDetailsOpen .5s ease forwards";
            document.getElementById(this.currentOpenedDetail).style.animation = "charDetailsClose .5s ease forwards";
            this.currentOpenedDetail = "character-detail-" + index;
        }

        console.log(this.state);
        this.setState({
            openedCharacterDetail: [...this.state.openedCharacterDetail, this.state.allCharacterDetails[index]]
        });
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
                                    {this.state.title}
                                </div>
                                <div className="characters">
                                    <h1>Characters</h1>
                                    <ul className="names-list">
                                        {this.state.nameList.map((name, index) => {
                                            return (
                                                <li key={index}
                                                    onClick={() => {
                                                        this.showCharacterDetails(index)
                                                    }}>
                                                    <img
                                                        src={this.state.imageURL[index]}
                                                        alt="profile"/>
                                                    <div>{name}</div>
                                                    <section className={"character-detail"}
                                                             id={"character-detail-" + index}
                                                             style={{visibility: "visible"}}>
                                                        <i className="fas fa-caret-up"/>
                                                        test
                                                    </section>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                    )
                }
            </div>
        )
    }
}

export default MovieDetails;




* */