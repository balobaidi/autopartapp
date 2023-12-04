
function handleError(req, res) {
}

function getErrorMessage(err) {

        let message = '';

        if (err.errors) {
            for (const key in err.errors) {
                if (err.errors.hasOwnProperty(key)) {
                    message += `${err.errors[key].message}\n`;
                }
            }
        } else {
            message = 'Unknown error';
        }

        return message.trim();  
}


export default  {
    handleError: handleError,
    getErrorMessage:getErrorMessage
};
