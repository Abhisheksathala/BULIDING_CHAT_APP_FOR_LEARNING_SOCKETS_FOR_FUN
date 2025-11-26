export const emitEvent = (req, event, user, data) => {
  console.log('emitEvent called with:', { req, event, user, data });
};

export const deletfilesfromclodinary = async (public_id) => {
  console.log('deletfilesfromclodinary called with:', { public_id });
};
