import express from 'express'
import axios from 'axios'
import bodyParser from 'body-parser'

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get("/", (req,res)=>{
    res.render("index.ejs");
});

app.post("/submit", async (req,res)=>{
    const searchUp = req.body["title"];
    console.log(searchUp);
    const options = {
        method: 'GET',
        url: 'https://shazam.p.rapidapi.com/search',
        params: {
          term: searchUp,
          locale: 'en-US',
          offset: '0',
          limit: '5'
        },
        headers: {
          'x-rapidapi-key': '7282f18026msh72c4031b8718a26p15f078jsn517d683703e7',
          'x-rapidapi-host': 'shazam.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          console.log(response.data.tracks.hits[0].track.images.background);
          var titleSong = response.data.tracks.hits[0].track.title;
          var imageSong = response.data.tracks.hits[0].track.images.background;
          console.log(response.data.tracks.hits[0].track.title);
          res.render("submit.ejs", {
            artist: titleSong,
            test: response.data.tracks,
            imageSong: imageSong
          })
      } catch (error) {
          console.error(error);
      }

})





app.listen(port, ()=>{
    console.log("Listening");
})