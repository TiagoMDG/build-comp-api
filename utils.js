// Error handling function
const handleError = (res, error, message) => {
  console.error(message, error);
  res.status(500).json({ error: message });
};

module.exports = handleError;
