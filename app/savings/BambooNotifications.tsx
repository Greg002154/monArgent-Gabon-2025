'use client';

import { useState, useEffect } from 'react';

interface Notification {
  id: number;
  type: 'success' | 'reminder' | 'warning' | 'info';
  title: string;
  message: string;
  date: string;
  read: boolean;
  action?: string;
}

export default function BambooNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'success',
      title: 'Transfert réussi',
      message: 'Votre transfert de 25 000 FCFA vers le compte Bamboo a été effectué avec succès.',
      date: '2024-01-15 14:30',
      read: false,
      action: 'Voir détails'
    },
    {
      id: 2,
      type: 'info',
      title: 'Intérêts crédités',
      message: 'Vos intérêts mensuels de 1 250 FCFA ont été ajoutés à votre compte.',
      date: '2024-01-01 09:00',
      read: false,
      action: 'Consulter'
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Rappel d\'épargne',
      message: 'N\'oubliez pas votre épargne mensuelle de 30 000 FCFA pour votre objectif voyage.',
      date: '2024-01-10 10:00',
      read: true,
      action: 'Épargner'
    },
    {
      id: 4,
      type: 'warning',
      title: 'Objectif en retard',
      message: 'Votre objectif "Nouveau téléphone" prend du retard. Augmentez vos versements.',
      date: '2024-01-08 16:00',
      read: true,
      action: 'Ajuster'
    },
    {
      id: 5,
      type: 'info',
      title: 'Déblocage proche',
      message: 'Votre épargne de 150 000 FCFA sera débloquée dans 30 jours.',
      date: '2024-01-05 12:00',
      read: true,
      action: 'Planifier'
    }
  ]);

  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
    setSelectedNotification(null);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return { icon: 'ri-check-line', color: 'green' };
      case 'reminder':
        return { icon: 'ri-alarm-line', color: 'blue' };
      case 'warning':
        return { icon: 'ri-alert-line', color: 'orange' };
      case 'info':
        return { icon: 'ri-information-line', color: 'purple' };
      default:
        return { icon: 'ri-notification-line', color: 'gray' };
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    // Simulate real-time notifications
    const interval = setInterval(() => {
      // Add random notifications for demo
      const randomNotifications = [
        {
          id: Date.now(),
          type: 'success' as const,
          title: 'Transfert automatique',
          message: 'Votre épargne mensuelle de 15 000 FCFA a été transférée automatiquement.',
          date: new Date().toLocaleString('fr-FR'),
          read: false,
          action: 'Voir'
        },
        {
          id: Date.now() + 1,
          type: 'reminder' as const,
          title: 'Rappel d\'épargne',
          message: 'Il est temps d\'épargner pour votre objectif du mois.',
          date: new Date().toLocaleString('fr-FR'),
          read: false,
          action: 'Épargner'
        }
      ];

      // Add notification randomly (10% chance every 30 seconds)
      if (Math.random() < 0.1) {
        const newNotif = randomNotifications[Math.floor(Math.random() * randomNotifications.length)];
        setNotifications(prev => [newNotif, ...prev]);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-notification-line text-gray-400 text-2xl"></i>
            </div>
            <h3 className="font-medium text-gray-800 mb-2">Aucune notification</h3>
            <p className="text-sm text-gray-500">Vos notifications Bamboo apparaîtront ici</p>
          </div>
        ) : (
          notifications.map((notification) => {
            const { icon, color } = getNotificationIcon(notification.type);
            return (
              <div
                key={notification.id}
                onClick={() => {
                  setSelectedNotification(notification);
                  markAsRead(notification.id);
                }}
                className={`bg-white rounded-xl p-4 shadow-sm border cursor-pointer transition-all hover:shadow-md ${
                  notification.read ? 'border-gray-100' : 'border-orange-200 bg-orange-50/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 bg-${color}-50 rounded-full flex items-center justify-center flex-shrink-0`}>
                    <i className={`${icon} text-${color}-600`}></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-800">{notification.title}</h4>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{notification.date}</span>
                      {notification.action && (
                        <span className="text-xs text-orange-600 font-medium">{notification.action}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Notification Detail Modal */}
      {selectedNotification && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Notification</h3>
              <button
                onClick={() => setSelectedNotification(null)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <i className="ri-close-line text-gray-600"></i>
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-${getNotificationIcon(selectedNotification.type).color}-50 rounded-full flex items-center justify-center`}>
                  <i className={`${getNotificationIcon(selectedNotification.type).icon} text-${getNotificationIcon(selectedNotification.type).color}-600 text-xl`}></i>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{selectedNotification.title}</h4>
                  <p className="text-sm text-gray-500">{selectedNotification.date}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-gray-700">{selectedNotification.message}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => deleteNotification(selectedNotification.id)}
                  className="flex-1 py-3 bg-red-50 text-red-600 rounded-xl font-medium !rounded-button"
                >
                  Supprimer
                </button>
                {selectedNotification.action && (
                  <button
                    onClick={() => setSelectedNotification(null)}
                    className="flex-1 py-3 bg-orange-600 text-white rounded-xl font-medium !rounded-button"
                  >
                    {selectedNotification.action}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}