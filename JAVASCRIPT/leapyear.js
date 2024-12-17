function isleap(y) {
    if ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0) {
        console.log("LEAP YEAR");
    } else {
        console.log("not a LEAP YEAR");
    }
}

isleap(2024);
