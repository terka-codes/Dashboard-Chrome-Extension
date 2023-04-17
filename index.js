fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.full})`
		document.getElementById("author").textContent = `By: ${data.user.name}`
    })
    .catch(err => {
        // Use a default background image/author
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`
		document.getElementById("author").textContent = `By: Dodi Achmad`
    })

function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"})
}

setInterval(getCurrentTime, 1000)

navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${data.main.temp.toFixed(0)}º</p>
                <p class="weather-city">${data.name}</p>
            `
        })
        .catch(err => console.error(err))
})

chrome.bookmarks.getTree(bookmarks => {
    const bookmarksBar = bookmarks[0].children[0]
    const bookmarksBarBookmarks = bookmarksBar.children.filter(bookmark => bookmark.url)
    const bookmarksList = document.getElementById("bookmarks-list")
  
    for (let i = 0; i < 28 && i < bookmarksBarBookmarks.length; i++) {
      const bookmark = bookmarksBarBookmarks[i];
      const faviconUrl = `https://s2.googleusercontent.com/s2/favicons?domain_url=${bookmark.url}`
      bookmarksList.innerHTML += `
        <li>
          <a href="${bookmark.url}" alt="bookmark for ${bookmark.title}">
            <img src=${faviconUrl} />
            <span>${bookmark.title}</span>
          </a>
        </li>`
    }
  })

