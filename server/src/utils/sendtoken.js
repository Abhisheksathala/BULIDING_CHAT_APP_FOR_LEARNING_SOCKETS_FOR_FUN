import jwt from 'jsonwebtoken';

export const sendToken = (res, user, code, message) => {
  if (!user) {
    return res.status(400).json({ success: false, message: 'send user details for token' });
  }
  const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '15d',
  });

  return res
    .status(code)
    .cookie('chattu-token', token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    })
    .json({
      success: true,
      message,
      user,
    });
};
