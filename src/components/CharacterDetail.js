import React, {Component} from 'react';
import "../styles/CharacterDetail.css";

class CharacterDetail extends Component {

    state = {
        charaterDetails: []
    };

    currentOpenedDetail = "";

    componentDidMount() {
        this.fetchCharacterDetails();
    }

    async fetchCharacterDetails() {
        let id = "";

        Promise.all(
            this.props.charactersURL.map(async url => {
                id = url.replace(/[^0-9]/g, '');

                await fetch("https://cdn.rawgit.com/akabab/starwars-api/0.2.1/api/id/" + id + ".json")
                    .then(async res => {
                        let details = await res.json();

                        this.setState({
                            charaterDetails: [...this.state.charaterDetails, details]
                        });
                        return details
                    });
                return url
            })
        );
    }

    showCharacterDetails(index) {
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
    }

    render() {
        return (
            <div className="characters">
                <h1>Characters</h1>
                <ul className="names-list">
                    {
                        this.state.charaterDetails.length === this.props.charactersURL.length &&
                        this.props.charactersURL.map((res, index) => {
                            console.log(this.state.charaterDetails);
                            return (
                                <li key={index}
                                    onClick={() => {
                                        this.showCharacterDetails(index)
                                    }}>
                                    <img
                                        src={this.state.charaterDetails[index].image}
                                        alt="profile"/>
                                    <div>{this.state.charaterDetails[index].name}</div>
                                    <section className={"character-detail"}
                                             id={"character-detail-" + index}
                                             style={{visibility: "visible"}}>
                                        <i className="fas fa-caret-up"/>
                                        <h5>gender: {this.state.charaterDetails[index].gender}</h5>
                                        <h5>eye color: {this.state.charaterDetails[index].eyeColor}</h5>
                                        <h5>home world: {this.state.charaterDetails[index].homeworld}</h5>
                                    </section>
                                </li>
                            )
                                ;
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default CharacterDetail

/*
<div key={index}>{this.state.charaterDetails[index].name}</div>



affiliations: (3) ["House of Organa", "Alliance to Restore the Republic", "Alliance Military"]
died: 0
diedLocation: "tantive iv, tatoo system"
eyeColor: "brown"
formerAffiliations: []
gender: "male"
hairColor: "brown"
height: 1.88
homeworld: "alderaan"
id: 81
image: "https://vignette.wikia.nocookie.net/starwars/images/8/80/Raymus_card_trader.png"
mass: 79
name: "Raymus Antilles"
skinColor: "fair"
species: "human"
wiki: "http://starwars.wikia.com/wiki/Raymus_Antilles"
*/