console.log('let the game begin');

// gnews api: 40d80c397e4597e39735e58a0f81b3b0
// newsapi.org api: 8b772fd8e9fa4703b21d199eb45f8ad4

// variables initialization
const gnewsAPI = '40d80c397e4597e39735e58a0f81b3b0'; // gnews api key
const newsAPI = '40d80c397e4597e39735e58a0f81b3b0'; // news.org api key
let gnewsURL = `https://gnews.io/api/v4/top-headlines?lang=en&country=in&token=${gnewsAPI}`;
let newsURL = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${newsAPI}`;

// getting the container from html
let newsAccordion = document.getElementById('newsAccordion');


// ******************************* ajax get request *******************************
let xhr = new XMLHttpRequest();
xhr.open('GET', gnewsAPI, true);

// onload
xhr.onload = function() {
    if(this.status == 200){
        let res = JSON.parse(this.responseText);
        let articles = res.articles;
        console.log(articles);
        let tobeAdd = ``;
        articles.forEach(function (news,index) {
            // console.log(index);
            // console.log(news);

            let cardHtml = `
            <!-- cards inside collapse -->
            <div class="accordion-item" id="accordion-item${index+1}">
                <h2 class="accordion-header" id="heading${index+1}">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index+1}" aria-expanded="false" aria-controls="collapse${index+1}">
                    <strong style="margin-right: 10px;">${index+1}</strong>. ${news['title']} 
                  </button>
                </h2>
                <div id="collapse${index+1}" class="accordion-collapse collapse" aria-labelledby="heading${index+1}" data-bs-parent="#newsAccordion">
                  <div class="accordion-body">
                    ${news['content']}
                    <a href="${news['url']}" target="_blank">Read more</a>
                  </div>
                </div>
            </div>
            <!-- ____________ -->
            `;
            tobeAdd += cardHtml;

            newsAccordion.innerHTML = tobeAdd;
        });
    }
    else{
        console.log('Something went wrong!');
    }
}

xhr.send(); // sending the request




// **************************** "GET request" can be also used instead
//  for this we have to add jquery ajax script to the html
//  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
//
// $.get(gnewsURL, function(res, status){
//     if(status == 200){
//         res = JSON.parse(res);
//         console.log(res);
//     }
//     else{
//         console.log('not done');
//     }
// });



let searchNews = document.getElementById('searchNews');
searchNews.addEventListener('input', (e) => {
    let input = searchNews.value;
    let temp = document.getElementsByClassName('accordion-header');
    Array.from(temp).forEach(element => {
        let text = element.innerText;
        text = text.toLowerCase();
        let id = element.id;
        id = id.replace('heading', 'accordion-item');
        let tobeDisplayOrBlock;
        if(text.includes(input)){
            tobeDisplayOrBlock = document.getElementById(id);
            tobeDisplayOrBlock.style.display = 'block';
        }
        else{
            tobeDisplayOrBlock = document.getElementById(id);
            tobeDisplayOrBlock.style.display = 'none';
        }
    });

});