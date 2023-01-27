const Notification = ({ message, type }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={`alert-msg ${type}`}>
        {message}
      </div>
    )
  }

  export default Notification;