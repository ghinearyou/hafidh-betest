const { User } = require('../models/user.model')

const getUserByAccount = async (req, res) => {
  const {
    number
  } = req.params

  const cacheResult = await redisClient.get('accountNumber:'+number)
  let result = JSON.parse(cacheResult)
  if (!cacheResult) {
    const searchResult = await User.findOne({
      accountNumber: number
    })
    result = searchResult
    if(searchResult) await redisClient.set('accountNumber:'+number, JSON.stringify(searchResult))
  }

  res.send({
    msg: "Success",
    data: result
  })
}

const getUserByIdentity = async (req, res) => {
  const {
    number
  } = req.params

  const cacheResult = await redisClient.get('identityNumber:'+number)
  let result = JSON.parse(cacheResult)
  if (!cacheResult) {
    const searchResult = await User.findOne({
      identityNumber: number
    })
    result = searchResult
    if(searchResult) await redisClient.set('identityNumber:'+number, JSON.stringify(searchResult))
  }
  
  res.send({
    msg: "Success",
    data: result
  })
}

const createUser = async (req, res) => {
  try {
    const result = await User.create(req.body)
    res.send({
      msg: "Success",
      data: result
    })  
  } catch (err) {
    res.send({
      mgs: "Failed",
      detail: err
    })
  }
}

const updateUser = async (req, res) => {
  try {
    const {
      id
    } = req.params
  
    const searchResult = await User.findById(id)
    if (!searchResult) throw ({ error: 'Missing User' })
    
    await searchResult.updateOne(req.body)
  
    res.send({
      msg: "Success",
      data: searchResult  
    })  
  } catch (err) {
    res.send({
      mgs: "Failed",
      detail: err
    })
  }
}

const deleteUser = async (req, res) => {
  try {
    const {
      id
    } = req.params
  
    const searchResult = await User.findById(id)
    if (!searchResult) throw ({ error: 'Missing User' })

    await searchResult.deleteOne()
  
    res.send({
      msg: "Success",
      data: ""
    })
  } catch (err) {
    res.send({
      mgs: "Failed",
      detail: err
    })
  }
}

module.exports = {
  getUserByAccount,
  getUserByIdentity,
  createUser,
  updateUser,
  deleteUser
}