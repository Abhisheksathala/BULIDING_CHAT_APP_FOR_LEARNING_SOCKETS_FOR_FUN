export const getothermember = (members, userId) => {
  return members.find((members) => members._id.toString() !== userId.toString());
};
