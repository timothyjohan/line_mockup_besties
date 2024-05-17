const express = require('express');
const router = express.Router();
const data = require('../data/data.json');

router.post('/chat/:idChat', (req, res) => {
    const { idChat } = req.params
    let chats = data.pinned
    const find = chats.find((elements)=>{
        console.log(elements);
        return elements.id == idChat
    })

    if(!find){
        let chat = data.chats.find((element) =>{
            return element.id == idChat
        })

        data.pinned.push(chat)
    }else{
        data.pinned = data.pinned.filter((element) => {
            return element.id != idChat;
        });
    }

    data.pinned.sort((a, b) => a.id - b.id);

    return res.status(201).send({
        pinned:data.pinned
    })
})

router.get('/', (req, res) => {
  res.send('GET request to the homepage')
})


module.exports = router