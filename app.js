import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const user = [{
    username: "bobesponja",
	avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info"
}];

app.post("/sign-up",(req,res)=>{
    const {username,avatar} = req.body;
   
    if(!username || !avatar) {
        res.status(400).send("Insira todos os campos");
        return;
    }

    const isRegistered = user.find((u)=> u.username === username)
    if (isRegistered) {
        res.status(401).send("Username já cadastrado");
        return;
    }
    user.push(req.body)
    res.send("OK")
})
const tweets = [{
		username: "bobesponja",
		avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
		tweet: "eu amo o hub"
}]

app.post("/tweets",(req,res)=>{
    const {username,tweet} = req.body;
   
    if(!username || !tweet) {
        res.status(400).send("Insira todos os campos");
        return;
    }
    const userFilter = user.filter ((u) => u.username === username)
    if (userFilter.length===0){
        res.status(400).send("Usuário não cadastrado");
        return;
    }

    const avatar = userFilter[0].avatar
 

    tweets.unshift({
		username,
		avatar,
		tweet
	})

    res.send("OK")
})

app.get("/tweets",(req,res)=>{
   
    if (tweets.length >= 10){
    res.send(tweets.slice(0,10))
    return;
}
    res.send(tweets)
})

app.listen(5000, () => {
    console.log(`Server running in port: ${5000}`);
  });