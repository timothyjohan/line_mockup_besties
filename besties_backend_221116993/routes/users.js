const express = require('express');
const router = express.Router();
const data = require('../data/data.json');
const Users = require('../models/Users');
const Chat = require('../models/Chat');
const Pinned = require('../models/Pinned');

router.get('/get', async (req, res) => {
    const coba = await Users.find()
    return res.status(200).send({
        users: coba
    })
})

//Get by username
router.get('/get/:username', async (req, res) => {
    const { username } = req.params
    
    const find = await Users.findOne({username:username})
    res.send(find)
})

//Register new user
router.post('/:username/:password/:phone', async (req, res) => {
    const { username, password, phone } = req.params
    let newID = await Users.countDocuments() + 1
    let newUser = {
        id: newID,
        username:username,
        password: password,
        phone: phone,
        friends:[]
    }
    await Users.create(newUser)
    // data.users.push(newUser)
    return res.status(201).send({
        user: newUser
    })
})

router.put('/friend/:idUser/:idFriend', async (req, res) => {
    const { idUser, idFriend } = req.params;

    try {
        const user1 = await Users.findOneAndUpdate({id:idUser}, { $push: { friends: idFriend } }, { new: true });
        const user2 = await Users.findOneAndUpdate({id:idFriend}, { $push: { friends: idUser } }, { new: true });

        if (user1 && user2) {
            return res.status(201).send({ success: true });
        } else {
            return res.status(404).send({ error: 'User not found' });
        }
    } catch (error) {
        return res.status(500).send({ error: 'Internal Server Error' });
    }
    return res.status(201).send({
        data
    })
})

//get all friends param username user
router.get('/get/allFriends/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const user = await Users.findOne({ username });

        if (user) {
            const friendIds = user.friends;
            const newFriends = await Users.find({ id: { $in: friendIds } });

            return res.status(200).send({ friends: newFriends });
        } else {
            return res.status(404).send({ error: 'User not found' });
        }
    } catch (error) {
        return res.status(500).send({ error: 'Internal Server Error' });
    }
})

//Get user by ID
router.get('/get/user/:id', async (req, res) => {
    const { id } = req.params
    
    const find = await Users.findOne({id:id})

    return res.status(200).send(
        find
    )
})

//Get chats for specific pipel
router.get('/chats/:idUser/:idFriend', async (req, res) => {
    const { idUser, idFriend } = req.params;

    try {
        const chats = await Chat.find({
            $or: [
                { from: idUser, to: idFriend },
                { from: idFriend, to: idUser }
            ]
        });

        return res.status(200).send({ chats });
    } catch (error) {
        return res.status(500).send({ error: 'Internal Server Error' });
    }
})

router.get('/chats/pinned/:idUser/:idFriend', async (req, res) => {
    const { idUser, idFriend } = req.params;

    try {
        const pinnedChats = await Pinned.find({
            $or: [
                { from: idUser, to: idFriend },
                { from: idFriend, to: idUser }
            ]
        });

        return res.status(200).send({ chats: pinnedChats });
    } catch (error) {
        return res.status(500).send({ error: 'Internal Server Error' });
    }
})

router.post('/chats/:idUser/:idFriend/:message', async (req, res) => {
    const {idUser, idFriend, message } = req.params
    let newID = await Chat.countDocuments() + 1
    let newChat ={
        id:newID,
        context:message,
        from:idUser,
        to:idFriend
    }
    Chat.create(newChat)

    return res.status(201).send({
        message: newChat
    })
})
module.exports = router