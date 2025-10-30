var teamApiUrl = './team_info_api.json';
var apiUrl = './travel_recommendation_api.json';


var searchResults = [];
var team = [];

const bookNowBtn = document.getElementById("bookNowBtn");
bookNowBtn.addEventListener('click', onBookNow);

const searchContainer = document.getElementById("searchContainer")
const searchClearBtn = document.getElementById("searchClearBtn");
const searchBtn = document.getElementById("searchNavBtn");
searchClearBtn.addEventListener('click', clearSearch);
searchBtn.addEventListener('click', onSearch);

const nametext = document.getElementById("formName").value;
const emailText = document.getElementById("formEmail").value;
const messageText = document.getElementById("formMessage").value;

const form = document.getElementById('contactForm').addEventListener('submit', onSubmit);

document.getElementById("twIcon").addEventListener('click', onTwIconClick);
document.getElementById("fbIcon").addEventListener('click', onFbIconClick);
document.getElementById("igIcon").addEventListener('click', onIgIconClick);
document.getElementById("ytIcon").addEventListener('click', onYtIconClick);

getTeamList();

function onBookNow() {
    alert("just booked an awsome trip!");
}

function onSearch() {
    const searchText = document.getElementById("searchInput").value.toLowerCase();
    if(searchText != '') {
        fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
            switch (searchText) {
                case 'country':
                case 'countries':
                    searchResults = data.countries[0].cities.concat(data.countries[1].cities, data.countries[2].cities);
                    break;
            
                case 'beach':
                case 'beaches':
                    searchResults = data.beaches;
                    break;
            
                case 'temple':
                case 'temples':
                    searchResults = data.temples; 
                    break;
                case 'australia':
                    searchResults = data.countries[0].cities;
                    break;
                case 'japan':
                    searchResults = data.countries[1].cities;
                    break;
                case 'brazil':
                case 'brasil':
                    searchResults = data.countries[2].cities;
                    break;
            
                default:
                    searchResults = [];
            }
            if(searchResults.length === 0) {
                const errorInfo = document.getElementById('searchListContainer');
                errorInfo.innerHTML = `
                    <div class='searchErrorContainer'>
                        <p class='description'>No Results found for this query try:</p>
                        <p class='description'>country</p>
                        <p class='description'>beach</p>
                        <p class='description'>temple</p>
                    </div>`;
            } else {
                showSearchResults();
            }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          const errorInfo = document.getElementById('searchListContainer');
          errorInfo.innerHTML = `
            <div class='searchErrorContainer'>
              <p class='description'>Unable to load travel data. Please check your connection or try again later.</p>
            </div>`;
        });
    }      
}

function showSearchResults() {
    const searchResultsDiv = searchResults.map(res => `
    <div class='cardContainer'>
        <img src='${res.imageUrl}' class="cardImage">
        <div class='cardTextContainer'>
            <p class='cardCityTitle'>${res.name}</p>
            <p class='cardCityDescription'>${res.description}</p>
        </div>
    </div>`);

    document.getElementById('searchListContainer').innerHTML = searchResultsDiv.join('');
}

function getTeamList() {
    fetch(teamApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            team = data;
            if (Array.isArray(team) && team.length > 0) {
                showTeamList();
            } else {
                throw new Error("Team data is empty or invalid");
            }
        })
        .catch(error => {
            console.error('Error fetching team data:', error);
            const errorInfo = document.getElementById('teamListContainer');
            errorInfo.innerHTML = `
                <div class='searchErrorContainer'>
                    <p class='description'>Error retrieving team info. Please try again later.</p>
                </div>`;
        });
}


function showTeamList() {
    if(team.length > 0) {
        const teamDiv = team.map(employee => `
        <div class="teamCardContainer">
            <img src="${employee.image}" class="teamInfoImage">
            <div class="teamDataContainer">
                <p class="teamMemberName">${employee.name}</p>
                <p class="teamMemberDescriptionText">${employee.description}</p>
                <div class="jobPositionTitleContainer">
                    <p class="positionText">${employee.role}</p>
                </div>
            </div>
        </div>`);
        document.getElementById('teamListContainer').innerHTML = teamDiv.join('');
    }
}

function clearSearch() {
    const searchText = document.getElementById("searchInput")
    searchText.value = "";
    searchResults = [];
    const searchListContainer = document.getElementById('searchListContainer');
    searchListContainer.innerHTML = '';
}

function onSubmit() {
    event.preventDefault();
    const nametext = document.getElementById("formName");
    const emailText = document.getElementById("formEmail");
    const messageText = document.getElementById("formMessage");

    if(nametext.value === '') {
        nametext.focus();
     } else if(emailText.value === '') {
        emailText.focus();
     } else if (messageText.value === '') {
        messageText.focus();
     } else {
        alert(`from:${nametext.value} - ${emailText.value}\n body: ${messageText.value}`);
        nametext.value = "";
        emailText.value = "";
        messageText.value = "";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const searchContainer = document.querySelector(".searchContainer");
    const homeSection = document.querySelector("#home");
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Home section is visible → show search bar
            searchContainer.style.display = "flex";
          } else {
            // Home section is out of view → hide search bar
            searchContainer.style.display = "none";
          }
        });
      },
      { threshold: 0.2 } // triggers when at least 20% of #home is visible
    );
    observer.observe(homeSection);
  });
  
  function onTwIconClick() {
    window.open("https://x.com/coursera", "_blank");
  }
  function onFbIconClick() {
    window.open("https://www.facebook.com/Coursera/", "_blank");
  }
  function onIgIconClick() {
    window.open("https://www.instagram.com/coursera/?hl=en", "_blank");
  }

  function onYtIconClick() {
    window.open("https://www.youtube.com/user/coursera", "_blank");
  }
  