import React, { useEffect, useState } from 'react';

export default function Toast({ message, type, showTime }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
      }, 2000); // Hide after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [message, showTime]);

  return (
    <div className={`toast ${type} ${show ? 'show' : ''}`} id="toast">
      {message}
    </div>
  );
}
