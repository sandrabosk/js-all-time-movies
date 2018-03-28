/* eslint no-restricted-globals: 'off' */

// Turn duration of the movies from hours to minutes 

function turnHoursToMinutes(moviesArray) {
    //.map because we will work on every element of the array
  return moviesArray.map(function(elem) {
    var hours = 0;
    var minutes = 0;

    // The indexOf() method returns the first index at which a given element can
    // be found in the array, or -1 if it is not present.
    // The parseInt() function parses a string argument and returns an integer of 
    //the specified radix (the base in mathematical numeral systems, usually defaulting the value 10).
    if (elem.duration.indexOf("h") !== -1) {
      hours = parseInt(elem.duration[0], 10) * 60;
    }
    if (elem.duration.indexOf("min") !== -1) {
      minutes = parseInt(
          //parseInt has 2 arguments, the 1st is elem.duration.substring
        elem.duration.substring(
            // .substring has 2 arguments (start position and end position)
          elem.duration.length - 5,
          elem.duration.length - 3
        ),
        //this is the 2nd argument- called radix
        10
      );
    }
    // The Object.assign() method is used to copy the values of all enumerable own properties from one or more source objects to a target object. 
    //It will return the target object.
    return Object.assign({}, elem, { duration: hours + minutes });
  });
}
turnHoursToMinutes(movies);
console.log(movies);
// Mosi's solution:
// function turnHoursToMinutes(array) {
//   var result = movies.map(function (elem) {
//     var split = elem.duration.split(" ");
//     var totalMinutes = parseInt(split[0]) * 60 + parseInt(split[1]);
//     return {
//       title: elem.title,
//       year: elem.year,
//       director: elem.director,
//       duration: totalMinutes,
//       genre: elem.genre,
//       rate: elem.rate
//     }
//   })
//   return result;
// }

// Danny Autrey solution - he made an array of minutes:
// var turnHoursToMinutes = movies.map(function (movie) {
//   splitDuration = movie.duration.split(" ");
//   hourConvert = parseInt(splitDuration[0]) * 60;
//   minuteConvert = parseInt(splitDuration[1]);

//   return hourConvert + minuteConvert;
// })
// console.log(turnHoursToMinutes)


// Get the average of all rates with 2 decimals 
function ratesAverage(moviesArray) {
    // The reduce() method applies a function against an accumulator and each 
    // element in the array (from left to right) to reduce it to a single value.
  var rateSum = moviesArray.reduce(function(accumulator, movie) {
      // accumulator and movie are like previous and current (adding them to get the sum)
    return accumulator + Number(movie.rate);
  }, 0);
                                            // toFixed => 2 decimals
  return Number((rateSum / moviesArray.length).toFixed(2));
}

console.log("The average rate is: " + ratesAverage(movies));
// Mosi's solution:
// function ratesAverage(array) {
//   var sumRating = array.reduce(function (a, rating) {
//     return a + parseFloat(rating.rate);
//   }, 0);
//   average = sumRating / array.length;
//   return average;
// }

// Get the average of Drama Movies

function dramaMoviesRate(movieArray) {
 // The filter() method creates a new array with all elements that pass the test 
 // implemented by the provided function.
  var dramaMovies = movieArray.filter(function(movieElement) {
    return movieElement.genre.indexOf("Drama") !== -1;
  });
  if (isNaN(ratesAverage(dramaMovies))) {
    return undefined;
  }
  return ratesAverage(dramaMovies);
}

console.log(
  'The average rate of "Drama" movies is: ' + dramaMoviesRate(movies)
);

// Mosi's solution:
// function dramaMoviesRate(array) {
//   var filtered = array.filter(function (elem) {
//     return elem.genre.includes("Drama");
//   })
//   var sumAverage = filtered.reduce(function (a, rating) {
//     return a + Number(rating.rate);
//   }, 0);
//   if (sumAverage === 0) {
//     return undefined;
//   }
//   result = sumAverage / filtered.length;
//   return Number(result.toFixed(2));
// }

// Order by time duration, in growing order

function orderByDuration(moviesArray) {
   // The sort() method sorts the elements of an array and returns the array.
  moviesArray.sort(function(a, b) {
    if (a.duration === b.duration) {
      if (a.title > b.title) {
        return 1;
      }
    }
    return a.duration - b.duration;
  });
  return moviesArray;
}

console.log(orderByDuration(movies));
// Mosi's solution:
// function orderByDuration(array) {
//   var minutes = turnHoursToMinutes(array);
//   var result = minutes.sort(function (a, b) {
//     return a.duration - b.duration;
//   });
//   return result;
// }
// How many movies did STEVEN SPIELBERG
function howManyMovies(moviesArr) {
  if (moviesArr.length === 0) {
    return undefined;
  }
  var directorMovies = moviesArr.filter(function(e) {
    return e.director === "Steven Spielberg" && e.genre.indexOf("Drama") !== -1;
  });
  return (
    "Steven Spielberg directed " + directorMovies.length + " drama movies!"
  );
}

console.log(howManyMovies(movies));
// Mosi's solution:
// function howManyMovies(array) {
//   if (array.length === 0) {
//     return undefined;
//   }
//   var filteredOne = array.filter(function (elem) {
//     return (elem.genre.includes("Drama"));
//   });
//   var filteredTwo = filteredOne.filter(function (elem) {
//     return (elem.director.includes("Steven Spielberg"));
//   });
//   return "Steven Spielberg directed " + filteredTwo.length + " drama movies!";
// }

// Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  moviesArray.sort(function(a, b) {
    return a.title < b.title ? -1 : 1;
  });
  var top20Movies = [];
  var limit = 20;
  if (moviesArray.length < 20) {
    limit = moviesArray.length;
  }
  for (var i = 0; i < limit; i++) {
    top20Movies.push(moviesArray[i].title);
  }
  return top20Movies;
}

console.log(orderAlphabetically(movies));

// Mosi's solution: 
// function orderAlphabetically(array){
// var titleArray = [];
// array.forEach(function (elem) {
//   titleArray.push(elem.title);
// });
// titleArray.sort();
// if (titleArray.length >= 20) {
//   titleArray = titleArray.slice(0, 20);
// }
// return titleArray;
// }

// Best yearly rate average


function bestYearAvg(moviesArr) {
  var ratesYear = {};
  var moviesYear = {};
  var averageYear = {};
  if (moviesArr.length === 0) {
    return undefined;
  }
  moviesArr.forEach(function(e) {
    if (ratesYear[e.year]) {
      moviesYear[e.year] += 1;
      ratesYear[e.year] += parseFloat(e.rate);
      averageYear[e.year] = parseFloat(
        (ratesYear[e.year] / moviesYear[e.year]).toFixed(2)
      );
    } else {
      ratesYear[e.year] = parseFloat(e.rate);
      moviesYear[e.year] = 1;
      averageYear[e.year] = parseFloat(e.rate);
    }
  });
  var year = Object.keys(averageYear).reduce(function(a, b) {
    if (averageYear[a] === averageYear[b]) {
      if (b < a) {
        return b;
      }
      return a;
    } else if (averageYear[a] > averageYear[b]) {
      return a;
    }
    return b;
  });
  return (
    "The best year was " +
    year +
    " with an average rate of " +
    averageYear[year]
  );
}

console.log(bestYearAvg(movies));