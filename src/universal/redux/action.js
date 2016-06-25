export default (type, payload, status = {}) => ({
  type, payload, ...status
});
