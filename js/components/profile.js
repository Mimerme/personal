const splashes = ["Do-oer of things"];
import "./profile.scss";
import {React, useState, useEffect} from 'react';
import SeedRandom from "../lib/seed_random";

export default function Profile(props) {
    let rng = new SeedRandom();
    let type1 = Math.floor(rng.randomWithSeed(props.seed) * 3);
    let type2 = Math.floor(rng.randomWithSeed(props.seed) * splashes.length);

    return (<div></div>);
}

