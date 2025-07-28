console.log("Let's write javaScript")
let currentSong = new Audio();
let songs;
let currFolder;
function secondsToMinutesSeconds(seconds){
    if(isNaN(seconds)||seconds<0){
        return "Invalid input";
    }
    const minutes = Math.floor(seconds/60);
    const remainingSeconds = Math.floor(seconds%60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

// Define song lists manually since we can't fetch directory listings without a server
const songLists = {
    "Songs/ncs": [
        "Astronaut In The Ocean.mp3",
        "Faded.mp3", 
        "Heat Waves.mp3"
    ],
    "Songs/bol": [
        "BESABRIYAAN.mp3",
        "Heeriye (feat. Arijit Singh).mp3"
    ]
};

const albumInfo = {
    "ncs": {
        "title": "Hitlist",
        "description": "Songs for you"
    },
    "bol": {
        "title": "Bollywood Songs", 
        "description": "Songs for you"
    }
};

async function getsongs(folder){
    currFolder = folder;
    songs = songLists[folder] || [];
    
    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    songUL.innerHTML=""
    for (const song of songs) {
        songUL.innerHTML= songUL.innerHTML +`<li>
        <img class="invert" src="music.svg" alt="">
        <div class="info">
            <div>${song.replaceAll("%20", " ")}</div>
            <div>Artist Name:Musico Player</div>
        </div>
        <div class="playnow">
            <span>play Now</span>
            <img class="invert" src="play.svg" alt="">
        </div>
    </li>`;
    }
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click", element=>{
            PlayMusic(e.querySelector(".info").firstElementChild.innerHTML)
        })
        
    })
    return songs
}

const PlayMusic = (track, pause=false)=>{
    currentSong.src=`/${currFolder}/` + track;
    if(!pause){
        currentSong.play()
        play.src="pause.svg"
    }
    
    document.querySelector(".songinfo").innerHTML=decodeURI(track)
    document.querySelector(".songtime").innerHTML="0:00/0:00"
}
async function displayAlbum(){
    let cardContainer = document.querySelector(".cardContainer")
    
    // Display albums manually
    for (const [folder, info] of Object.entries(albumInfo)) {
        cardContainer.innerHTML=cardContainer.innerHTML+`<div data-folder="${folder}" class="card">
        <div class="play">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" fill="none" />
                <path
                    d="M15.4531 12.3948C15.3016 13.0215 14.5857 13.4644 13.1539 14.3502C11.7697 15.2064 11.0777 15.6346 10.5199 15.4625C10.2893 15.3913 10.0793 15.2562 9.90982 15.07C9.5 14.6198 9.5 13.7465 9.5 12C9.5 10.2535 9.5 9.38018 9.90982 8.92995C10.0793 8.74381 10.2893 8.60868 10.5199 8.53753C11.0777 8.36544 11.7697 8.79357 13.1539 9.64983C14.5857 10.5356 15.3016 10.9785 15.4531 11.6052C15.5156 11.8639 15.5156 12.1361 15.4531 12.3948Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
            </svg>
        </div>
        <img src="https://images.pexels.com/photos/5109665/pexels-photo-5109665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="" srcset="">
        <h2>${info.title}</h2>
        <p>${info.description}</p>
    </div>`
    }
}
async function main(){
    await getsongs("Songs/ncs")
    PlayMusic(songs[0], true)
    await displayAlbum()

    play.addEventListener("click", ()=>{
        if(currentSong.paused){
            currentSong.play()
            play.src = "pause.svg"
        }
        else{
            currentSong.pause()
            play.src = "play.svg"
        }
    })
    currentSong.addEventListener("timeupdate", ()=>{
        console.log(currentSong.currentTime, currentSong.duration)
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime/currentSong.duration)*100 + "%";
    })
    document.querySelector(".seekbar").addEventListener("click", e=>{
        let percent = (e.offsetX/e.target.getBoundingClientRect().width)*100;
        document.querySelector(".circle").style.left= percent + "%";
        currentSong.currentTime=((currentSong.duration)*percent)/100
    })
    document.querySelector(".hamburger").addEventListener("click", ()=>{
        document.querySelector(".left").style.left="0"
    })
    document.querySelector(".close").addEventListener("click",()=>{
        document.querySelector(".left").style.left="-120%"
    })
    previous.addEventListener("click",()=>{
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if((index-1)>=0){
            PlayMusic(songs[index-1])
        }
    })
    next.addEventListener("click",()=>{
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if((index+1)< songs.length){
            PlayMusic(songs[index+1])
        }
    })
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e)=>{
        currentSong.volume = parseInt(e.target.value)/100
    })
    Array.from(document.getElementsByClassName("card")).forEach(e=>{
        e.addEventListener("click", async item=>{
            songs= await getsongs(`Songs/${item.currentTarget.dataset.folder}`)
            PlayMusic(songs[0])
        })

        
    });
    document.querySelector(".volume>img").addEventListener("click",e=>{
        if(e.target.src.includes("volume.svg")){
            e.target.src=e.target.src.replace("volume.svg","mute.svg")
            currentSong.volume=0;
            document.querySelector(".range").getElementsByTagName("input")[0].value=0;

        }
        else{
            e.target.src=e.target.src.replace("mute.svg","volume.svg")
            currentSong.volume=.10;
            document.querySelector(".range").getElementsByTagName("input")[0].value=10;
        }
    })
}
main()