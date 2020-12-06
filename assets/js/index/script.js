var _nw = {}

_nw.data = {}
_nw.logic = {};
_nw.setting = {};
_nw.news = {};
_nw.user = {};
_nw.newsConfigration = {}
_nw.setDOMS = {}
_nw.urlHandler = {}
_nw.display = {}
_nw.backGroundProccessHandeler = {}
_nw.DOMValueHandeler = {}

_nw.data._apiKey = "2c63515288264e2fafd5003fea326cd7";

_nw.data.allNews = [];

_nw.data.width = window.innerWidth;

_nw.data.newsConfigrations = {};
_nw.data.listerners = {};
_nw.data.backGroundProccess = {};

_nw.data.vaildCountries = [
    "ae",
    "ar",
    "at",
    "au",
    "be",
    "bg",
    "br",
    "ca",
    "ch",
    "cn",
    "co",
    "cu",
    "cz",
    "de",
    "eg",
    "fr",
    "gb",
    "gr",
    "hk",
    "hu",
    "id",
    "ie",
    "il",
    "in",
    "it",
    "jp",
    "kr",
    "lt",
    "lv",
    "ma",
    "mx",
    "my",
    "ng",
    "nl",
    "no",
    "nz",
    "ph",
    "pl",
    "pt",
    "ro",
    "rs",
    "ru",
    "sa",
    "se",
    "sg",
    "si",
    "sk",
    "th",
    "tr",
    "tw",
    "ua",
    "us",
    "ve",
    "ze"
];

_nw.data._urls = {
    "top_headlines": "https://newsapi.org/v2/top-headlines",
    // "everything": "https://newsapi.org/v2/everything",
    // "sources": "https://newsapi.org/v2/sources"
};

_nw.data._languages = {
    "ar": "Arabic",
    "de": "German",
    "en": "English",
    "es": "Spanish",
    "fr": "French",
    "he": "Hebrew",
    "it": "Italian",
    "nl": "Dutch",
    "no": "Norwegian",
    "pt": "Portuguese",
    "ru": "Russian",
    "se": "Sami",
    "zh": "Chinese",
};

_nw.data._catagory = [
    "--Select--",
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
]

var toggleSettings = document.getElementById("toggleSettings")
var newsFeed = document.getElementById("newsFeed")
var country = document.getElementById("country")
var type = document.getElementById("type")
// var language = document.getElementById("language")
// var catagory = document.getElementById("catagory")

// _nw.data.settingOpened = false;

_nw.__init__ = () => {

    _nw.data.defaultData = {
        country: _nw.logic.getParam("country"),
        type: "top_headlines",
        language: "en",
        catagory: ""
    };

    _nw.display.__init__()

    _nw.news.loading(true)
    _nw.setDOMS.__init__()
    _nw.newsConfigration.__init__()
    _nw.urlHandler.__init__()
    _nw.backGroundProccessHandeler.__init__()
    _nw.DOMValueHandeler.__init__()

    setTimeout(() => {
        _nw.news.__init__()
    }, 500);

    _nw.setDOMS.showCards()
};

_nw.news.loading = (visible = true, color = "primary", string = "Loading...") => {
    if (visible) {
        newsFeed.innerHTML = `
            <div class="d-flex align-items-center">
                <strong>${string}</strong>
                <div class="spinner-border text-${color} ml-auto" role="status" aria-hidden="true"></div>
            </div>
        `;
    } else {
        $("#loader").remove()
    }
}

_nw.news.__init__ = async () => {
    data = {
        country: country.value,
        type: type.value,
        // language: language.value,
        // catagory: catagory.value
    }

    data = _nw.news.setData()

    createdUrl = _nw.news.createUrl(data)

    console.log(data)

    console.log(createdUrl)
    _nw.news.fetch(createdUrl, data)
}

_nw.news.fetch = (url, GETData = _nw.data.defaultData) => {

    GETData.apiKey = _nw.data._apiKey;


    $.get(url, GETData, (data, status) => {
        // console.log(data);
        if (data.totalResults > 0 && data.status == "ok" && data.articles.length > 0) {
            _nw.news.createDOMS(data)
        } else if (data.totalResults == 0) {
            _nw.news.error("HEYYYY!!! Wait i Didnt Find any News!!! Can You Please Try Again With Different Configration???")
        } else if (data.status != "ok") {
            _nw.news.error("Hello o_o !!! Server Told me That Somthing is Wrong In Configration... Now? Reload the Page...")
        } else {
            _nw.news.error(`Something Went Wrong!!!`)
        }
    })
}

_nw.news.createDOMS = (data) => {
    allNews = ``;

    data.articles.forEach(e => {
        tempNews = ``

        newsId = _nw.logic.randomToken(15)

        tempNews = `
            <div class="col my-2">
                <div class="card mb-3 newsCard" id="${newsId}">
                    <img src="${e.urlToImage}" id="newsCardImage" class="card-img-top">
                    <div class="card-header">${e.title}</div>
                    <div class="card-body" id="newsCardBody">
                        ${e.content} <a href="${e.url}" target="_blank">Read More</a>

                    </div>
                </div>
            </div>
        `

        insertingObj = {
            newsId: newsId,
            data: e
        };

        if (e.content == null || e.urlToImage == null || e.title == null) {
        } else {
            _nw.data.allNews.push(insertingObj)
            allNews += tempNews
        }
    });

    _nw.news.loading(false)

    newsFeed.innerHTML = allNews
}

_nw.news.setData = () => {
    if (type.value == "top_headlines") {

        console.log(country.value)
        data = {
            country: country.value,
            type: type.value,
            // language: language.value,
            // catagory: catagory.value
        }
    }

    return data;
}

_nw.news.error = (str) => {
    _nw.news.loading(false)

    newsFeed.innerHTML = `
        <div class="col mx-auto my-2">
            <div class="card mb-3">
                <div class="card-header bg-danger text-white"><h4>ERRORRRRR!!!</h4></div>
                <div class="card-body">
                    ${str}
                </div>
            </div>
        </div>
    `;

}

_nw.news.createUrl = (data = {}) => {
    let mainUrl = _nw.data._urls[data.type]
    for (const key in data) {
        mainUrl = _nw.logic.insertParamInGivenURL(mainUrl, key, data[key])
    }

    return mainUrl;
}

_nw.urlHandler.__init__ = () => {

    if (_nw.logic.isParamInUrl("country") == false) {
        _nw.user.getData((data, status) => {
            _nw.logic.insertParam("country", data.countryCode.toLowerCase())
        })
    }
    if (_nw.logic.isParamInUrl("type") == false) {
        _nw.logic.insertParam("type", _nw.data.defaultData.type)
    }
    // if (_nw.logic.isParamInUrl("language") == false) {
    //     _nw.logic.insertParam("language", _nw.data.defaultData.language)
    // }
    // if (_nw.logic.isParamInUrl("catagory") == false) {
    //     _nw.logic.insertParam("catagory", _nw.data.defaultData.catagory)
    // }
}

_nw.newsConfigration.__init__ = () => {
    _nw.newsConfigration.createListeners()
}

_nw.newsConfigration.createListeners = () => {
    _nw.data.listerners.country = country.addEventListener("input", () => {
        _nw.logic.insertParam("country", country.value)
    })
    _nw.data.listerners.type = type.addEventListener("input", () => {
        _nw.logic.insertParam("type", type.value)
    })
    // _nw.data.listerners.language = language.addEventListener("input", () => {
    //     _nw.logic.insertParam("language", language.value)
    // })
    // _nw.data.listerners.catagory = catagory.addEventListener("input", () => {
    //     _nw.logic.insertParam("catagory", catagory.value)
    // })
}

_nw.setDOMS.__init__ = () => {
    _nw.setDOMS.setCountries()
    _nw.setDOMS.autoSetCountry()
    _nw.setDOMS.newsType()
    // _nw.setDOMS.language()
    // _nw.setDOMS.catagory()

    setTimeout(() => {
        _nw.setDOMS.setValuesFromUrl()
    }, 600);
}

_nw.setDOMS.setCountries = (defaultCountry = null) => {
    country.innerHTML += ''
    for (let i = 0; i < AllCountryAndCountryCodeData.length; i++) {
        for (let j = 0; j < _nw.data.vaildCountries.length; j++) {
            if (AllCountryAndCountryCodeData[i].code.toLowerCase() == _nw.data.vaildCountries[j]) {
                addingCountryName = AllCountryAndCountryCodeData[i].name;
                addingCountryCode = AllCountryAndCountryCodeData[i].code.toLowerCase();

                if (defaultCountry != null && addingCountryCode == defaultCountry) {
                    country.innerHTML += `
                        <option selected value="${addingCountryCode}">${addingCountryName}</option>
                    `
                } else {
                    country.innerHTML += `
                        <option value="${addingCountryCode}">${addingCountryName}</option>
                            `;
                }

                if (_nw.logic.isParamInUrl("country") == true) {
                    country.value = _nw.logic.getParam("country");
                }
            }
        }
    }
}

_nw.setDOMS.autoSetCountry = () => {
    _nw.user.getData((data, status) => {
        this.userCountry = data.countryCode.toLowerCase()

        _nw.setDOMS.setCountries(this.userCountry)
    })
}

_nw.setDOMS.newsType = () => {
    type.innerHTML += ''
    for (const key in _nw.data._urls) {
        keyName = "";
        keyNameSplitted = key.split("_")
        keyNameSplitted.forEach(e => {
            keyName += e.charAt(0).toUpperCase() + e.slice(1) + " ";
        });

        type.innerHTML += `
            <option value="${key}">${keyName}</option>
        `;
    }
}

_nw.setDOMS.language = () => {
    language.innerHTML = ""
    for (const key in _nw.data._languages) {
        if (key == "en") {
            language.innerHTML += `
                <option selected value="${key}">${_nw.data._languages[key]}</option>
            `;
        } else {
            language.innerHTML += `
                <option value="${key}">${_nw.data._languages[key]}</option>
            `;
        }
    }
}

_nw.setDOMS.catagory = () => {
    catagory.innerHTML = ""
    for (let i = 0; i < _nw.data._catagory.length; i++) {
        catagory.innerHTML += `
            <option value="${_nw.data._catagory[i]}">${_nw.data._catagory[i].charAt(0).toUpperCase() + _nw.data._catagory[i].slice(1)}</option>
        `
    }
}

_nw.setDOMS.showCards = () => {
    $(".newsCard").show()
}

_nw.setDOMS.hideCards = () => {
    $(".newsCard").hide()
}

_nw.setDOMS.disableDom = (DOM) => {
    DOM.setAttribute("disabled", "")
}

_nw.setDOMS.unDisableDom = (DOM) => {
    DOM.removeAttribute("disabled")
}


_nw.setDOMS.setValuesFromUrl = () => {
    country.value = _nw.logic.getParam("country")
    type.value = _nw.logic.getParam("type")
    // language.value = _nw.logic.getParam("language")
    // catagory.value = _nw.logic.getParam("catagory")
}

_nw.logic.isParamInUrl = (param) => {
    let url = window.location.href;
    if (url.indexOf('?' + param + '=') != -1) {
        return true;
    } else if (url.indexOf('&' + param + '=') != -1) {
        return true;
    } else {
        return false;
    }
}

_nw.logic.getParam = (param) => {
    let url = window.location;
    let params = new URLSearchParams(url.search);

    if (_nw.logic.isParamInUrl(param) == true) {
        return params.get(param);
    } else {
        return null;
    }

}


_nw.logic.insertParam = (key, value) => {
    key = encodeURIComponent(key); value = encodeURIComponent(value);

    var s = document.location.search;
    var kvp = key + "=" + value;

    var r = new RegExp("(&|\\?)" + key + "=[^\&]*");

    s = s.replace(r, "$1" + kvp);

    if (!RegExp.$1) { s += (s.length > 0 ? '&' : '?') + kvp; };

    //again, do what you will here
    document.location.search = s;

}


_nw.logic.insertParamInGivenURL = (givenUrl, key, value) => {
    returnUrl = ""

    var url = new URL(givenUrl);

    if (_nw.logic.isParamInGivenUrl(givenUrl)) {
        url.searchParams.set(key, value);
    } else {
        url.searchParams.append(key, value);
    }

    returnUrl = url.href;

    return returnUrl
}


_nw.logic.isParamInGivenUrl = (url, param) => {
    if (url.indexOf('?' + param + '=') != -1) {
        return true;
    } else if (url.indexOf('&' + param + '=') != -1) {
        return true;
    } else {
        return false;
    }
}

_nw.user.getData = (callback = () => { }) => {
    $.get("http://ip-api.com/json/", {}, (data, status) => {
        if (typeof (callback) == "function") {
            callback(data, status)
        }
    })
}

_nw.display.__init__ = () => {
    _nw.display.checkWidth(_nw.display.getWidth())
}

_nw.display.getWidth = () => {
    return window.innerWidth;
}

_nw.display.checkWidth = (width = _nw.display.getWidth()) => {
    for (let i = 0; i < _nw.data.allNews.length; i++) {
        newsId = _nw.data.allNews[i].newsId;
        card = document.getElementById(newsId)

        if (width > 1000) {
            newsFeed.classList.remove("row-cols-1")
            newsFeed.classList.add("row-cols-2")

            card.style.width = "510px";
            card.style.height = "auto";
        }
        if (width < 1000) {
            newsFeed.classList.remove("row-cols-1")
            newsFeed.classList.add("row-cols-2")

            card.style.width = "300px";
            card.style.height = "auto";
        }
        if (width < 800) {
            newsFeed.classList.remove("row-cols-2")
            newsFeed.classList.add("row-cols-1")

            card.style.width = "900px";
            card.classList.add("mx-auto")
            card.style.height = "auto";
        }
        if (width < 650) { }

    }

}

_nw.backGroundProccessHandeler.__init__ = () => {
    _nw.backGroundProccessHandeler.checkWidth()
}

_nw.backGroundProccessHandeler.checkWidth = () => {
    _nw.data.backGroundProccess.checkWidth = setInterval(() => {
        _nw.display.checkWidth()
    }, 1000);
}

_nw.logic.randomToken = (length = 10) => {
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var b = [];
    for (var i = 0; i < length; i++) {
        var j = (Math.random() * (a.length - 1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}

_nw.DOMValueHandeler.__init__ = () => {
    _nw.DOMValueHandeler.check()
}

_nw.DOMValueHandeler.check = () => {
    countryValue = country.value
    typeValue = type.value
    // languageValue = language.value
    // catagoryValue = catagory.value

    if (typeValue == "top_headlines") {
        // _nw.setDOMS.disableDom(language)
    }
    // } else if (typeValue == "everything") {
    //     _nw.setDOMS.disableDom(country)
    // } else if (typeValue == "sources") {

    // }
}






_nw.__init__()




