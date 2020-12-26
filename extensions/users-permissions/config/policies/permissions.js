module.exports = async (ctx, next) => {
  // authorization is already handled by 'is-authorized' custom policy
  return next();
}