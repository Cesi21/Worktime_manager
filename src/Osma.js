import React from 'react';

import './Notif.css';

const NotificationsView = () => {
  const staticNotifications = [
    { id: 1, text: "Pomembno obvestilo 1", date: "2023-03-01" },
    { id: 2, text: "Dogodek prihaja kmalu", date: "2023-03-05" },

  ];

  return (
    <div>
      <h2>Obvestila</h2>
      <ul>
        {staticNotifications.map(notification => (
          <li key={notification.id}>
            <strong>{notification.date}:</strong> {notification.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsView;
