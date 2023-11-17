const Channel = require('../models/Channel');

const CreateChannel = async (req, res) => {
  try {
    const {creatorId, channelUrl, chatMateId} = req.body

    const checkChannel = await Channel.findOne({
      where: {
        channelUrl,
      }
    })

    if (checkChannel) {
      return res.status(400).json({
        code: 400,
        success: false,
        description: `Channel with URL ${channelUrl} already exists`
      })
    }
    
    const channel = await Channel.create({
      creatorId,
      channelUrl,
      chatMateId,
    })

    return res.status(201).json({
      code: 201,
      success: true,
      data: channel,
      message: `Success creating channel with URL ${channelUrl}`
    })
  } catch (error) {
    console.log('Error POST channel: ', error)
    return res.status(500).json({
      code: 500,
      success: false,
      message: error?.message || error || "Error creating channel"
    })
  }
}

const GetAllChannels = async (_req, res) => {
  try {
    const channels = await Channel.findAll()

    return res.status(200).json({
      code: 200,
      success: true,
      data: channels,
      description: "Success getting all channels"
    })
  } catch (error) {
    console.log('Error GET channels: ', error)
    return res.status(500).json({
      code: 500,
      success: false,
      message: error?.message || error || "Error fetching all channels"
    })
  }
}

const UpdateChannel = async (req, res) => {
  try {
    const id = req.params.id
    const {creatorId, channelUrl, chatMateId} = req.body

    const channel = await Channel.findByPk(id)

    if (!channel) {
      return res.status(404).json({
        code: 404,
        success: false,
        description: `Channel with ID ${id} not found`
      })
    }

    await Channel.update({
      creatorId: creatorId ?? channel.creatorId,
      channelUrl: channelUrl ?? channel.channelUrl,
      chatMateId: chatMateId ?? channel.chatMateId,
    }, {
      where: {
        id
      }
    })
    const updatedChannel = await Channel.findByPk(id)

    return res.status(200).json({
      code: 200,
      success: true,
      data: updatedChannel,
      message: `Success updating channel with ID ${id}`
    })
  } catch (error) {
    console.log('Error PUT channel: ', error)
    return res.status(500).json({
      code: 500,
      success: false,
      message: error?.message || error || "Error updating channel"
    })
  }
}

module.exports = {
  CreateChannel,
  GetAllChannels,
  UpdateChannel
}