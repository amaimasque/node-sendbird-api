const User = require('../models/User');

const CreateUser = async (req, res) => {
  try {
    const {id, nickname, profilePhoto} = req.body

    const checkUser = await User.findOne({
      where: {
        userIdentifier: id
      }
    })

    if (checkUser) {
      return res.status(400).json({
        code: 400,
        success: false,
        description: `User with ID ${id} already exists`
      })
    }
    
    const user = await User.create({
      userIdentifier: id,
      userNickname: nickname,
      profilePhoto,
    })

    return res.status(201).json({
      code: 201,
      success: true,
      data: user,
      message: `Success creating user with ID ${id}`
    })
  } catch (error) {
    console.log('Error POST user: ', error)
    return res.status(500).json({
      code: 500,
      success: false,
      message: error?.message || error || "Error creating user"
    })
  }
}

const GetAllUsers = async (_req, res) => {
  try {
    const users = await User.findAll()

    return res.status(200).json({
      code: 200,
      success: true,
      data: users,
      description: "Success getting all users"
    })
  } catch (error) {
    console.log('Error GET users: ', error)
    return res.status(500).json({
      code: 500,
      success: false,
      message: error?.message || error || "Error fetching all users"
    })
  }
}

const GetUser = async (req, res) => {
  try {
    const userIdentifier = req.params.id

    const user = await User.findOne({
      where: {
        userIdentifier,
      }
    })

    if (!user) {
      return res.status(404).json({
        code: 404,
        success: false,
        description: `User with ID ${userIdentifier} not found`
      })
    }

    return res.status(200).json({
      code: 200,
      success: true,
      data: user,
      description: `Success getting user with ID ${userIdentifier}`
    })
  } catch (error) {
    console.log('Error GET user: ', error)
    return res.status(500).json({
      code: 500,
      success: false,
      message: error?.message || error || "Error fetching user"
    })
  }
}

const UpdateUser = async (req, res) => {
  try {
    const userIdentifier = req.params.id
    const {id, nickname, profilePhoto} = req.body

    const user = await User.findOne({
      where: {
        userIdentifier,
      }
    })

    if (!user) {
      return res.status(404).json({
        code: 404,
        success: false,
        description: `User with ID ${userIdentifier} not found`
      })
    }

    await User.update({
      userNickname: nickname ?? user.userNickname,
      profilePhoto: profilePhoto ?? user.profilePhoto,
    }, {
      where: {
        userIdentifier
      }
    })

    const updatedUser = await User.findByPk(user.id)

    return res.status(200).json({
      code: 200,
      success: true,
      data: updatedUser,
      message: `Success updating user with ID ${id}`
    })
  } catch (error) {
    console.log('Error PUT user: ', error)
    return res.status(500).json({
      code: 500,
      success: false,
      message: error?.message || error || "Error updating user"
    })
  }
}

const DeleteUser = async (req, res) => {
  try {
    const userIdentifier = req.params.id

    const user = await User.findOne({
      where: {
        userIdentifier,
      }
    })

    if (!user) {
      return res.status(404).json({
        code: 404,
        success: false,
        description: `User with ID ${userIdentifier} not found`
      })
    }

    await User.destroy({
      where: {
        userIdentifier
      }
    })

    return res.status(200).json({
      code: 200,
      success: true,
      data: user,
      message: `Success deleting user with ID ${id}`
    })
  } catch (error) {
    console.log('Error DELETE user: ', error)
    return res.status(500).json({
      code: 500,
      success: false,
      message: error?.message || error || "Error deleting user"
    })
  }
}

module.exports = {
  CreateUser,
  GetAllUsers,
  GetUser,
  UpdateUser,
  DeleteUser
}