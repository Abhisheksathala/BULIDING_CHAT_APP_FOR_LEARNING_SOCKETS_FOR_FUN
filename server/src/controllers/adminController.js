import userModel from "../models/userModel.js"
import ChatModel from "../models/chatModel.js"



export const allusers = async (req, res) => {
  try {
    const users = await userModel.find({});

    const transform = await Promise.all(
      users.map(async ({ name, username, avater, _id }) => {
        const [groups, friends] = await Promise.all([
          ChatModel.countDocuments({ groupChat: true, members: _id }),
          ChatModel.countDocuments({ groupChat: false, members: _id }),
        ]);

        return {
          _id,
          name,
          username,
          avatar: avater?.url || null,
          groups,
          friends,
        };
      })
    );

    return res.status(200).json({
      success: true,
      users: transform,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const allChats = async (req,res) => {

  try {

    const chats = await ChatModel.find({}).populate("members", "name avater").populate("creator","name avatar")

    const transformChat = await Promise.all(chats.map(async({members,_id,groupChat,name,creator})=>{
      try {

      } catch (error) {

      }
    }))

  } catch (error) {
console.log(error)
  }

}


