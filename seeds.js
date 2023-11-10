const mongoose = require('mongoose');
const Tweet = require('./models/tweet')
mongoose.connect('mongodb://localhost:27017/tweetsApp')
.then(()=>{
    console.log(' mongo connection open');
})
.catch((err)=>{
    console.log('issue issue with mongo');
    console.log(err);
})

// const tweet = new Tweet({
//     author: '1eduard',
//     title:'Marquez set to join Ducati Gresini in 2024!',
//     text: `Gresini Racing has announced Marc Marquez will join them for the 
//     2024 season a little more than a week after he and Honda 
//     HRC said they would mutually part ways with one year remaining on their contract. 
//     “I'm excited about this new challenge,” Marquez said in a press release.`,
//     category: 'MotoGP'
// })

// tweet.save()
// .then(tweet =>{
//     console.log(tweet)
// })
// .catch(err=>{
//     console.log(err);
// })

// const seedTweets = [
//     {
//         author:'UEFA Champions League',
//         title: 'Højlund & Morata tied on 🖐️',
//         text: 'Højlund & Morata are tied on this UCL season goals with 5 each after round 4th.',
//         category: 'Football'
//     },

//     {
//         author: 'FC Barcelona',
//         title: 'Full Time. #ShakhtarBarca1-0, #ChampionsLeague',
//         text: 'FC Barcelona loses 0-1 away with Shakhtar Donetsk after Sikan scored the only goal in 40th minute.',
//         category: 'Football'
//     },

//     {
//         author: 'Oracle Red Bull Racing',
//         title: 'Leaving São Paulo with 51 points scored across Saturday and Sunday',
//         text: 'Following the sprint and main races here at Brazil, we are very proud to say that we leave Sao Paolo with a great number of points in the bag.',
//         category: 'Formula 1'
//     },

//     {
//         author: 'NBA',
//         title: 'Keegan 🤝 Kris',
//         text: 'The Murray twins swap jerseys after their matchup in Sacramento.',
//         category: 'Basketball'
//     },

//     {
//         author: 'Snooker',
//         title: 'International Championship 2023 Quarterfinals: 8 best players continue to fight for the title.',
//         text: `Stephen Maguire 󠁧󠁢󠁳 - Jordan Brown  \n Tom Ford - Barry Hawkins \n Ronnie O'Sullivan - Ali Carter \n Zhang Anda - Ding Junhui`,
//         category: 'Snooker'

//     },

//     {
//         author: 'F1',
//         title: 'Throwing it back to when Checo and Red Bull Racing took over Las Vegas in style!',
//         text: `We can't wait for next weekend's inaugural race!`,
//         category: 'Formula 1'
//     }
// ]

// Tweet.insertMany(seedTweets)
// .then(res =>{
//     console.log(res)
// })
// .catch(err=>{
//     console.log(err);
// })