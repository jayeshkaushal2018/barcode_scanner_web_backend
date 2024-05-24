const dbErrorHandler = (error) => {
    let message = 'Database error';
    let statusCode = 500;
  
    if (error.code) {
      switch (error.code) {
        case 'ER_DUP_ENTRY':
          message = 'Duplicate entry';
          statusCode = 400;
          break;
        case 'ER_BAD_FIELD_ERROR':
          message = 'Invalid field';
          statusCode = 400;
          break;
        case 'ER_NO_REFERENCED_ROW_2':
          message = 'Foreign key constraint fails';
          statusCode = 400;
          break;
        // Add more cases as needed
        default:
          message = error.message;
      }
    } else {
      message = error.message || message;
    }
  
    return { message, statusCode };
  };
  
  module.exports = dbErrorHandler;
  