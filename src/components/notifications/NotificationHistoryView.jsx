import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import {
  Bell,
  CheckCheck,
  Trash2,
  ShoppingBag,
  AlertTriangle,
  CreditCard,
  Star,
  Clock,
} from 'lucide-react';

export const NotificationHistoryView = () => {
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    clearAllNotifications,
    deleteNotification,
  } = useApp();

  const [typeFilter, setTypeFilter] = useState('all');

  const filteredNotifications = notifications.filter(n => {
    if (typeFilter === 'all') return true;
    if (typeFilter === 'unread') return !n.read;
    return n.type === typeFilter;
  });

  const getNotifIcon = (type) => {
    switch (type) {
      case 'order':
        return <ShoppingBag className="w-5 h-5 text-blue-600" />;
      case 'inventory':
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case 'payment':
        return <CreditCard className="w-5 h-5 text-emerald-600" />;
      case 'review':
        return <Star className="w-5 h-5 text-yellow-600" />;
      default:
        return <Bell className="w-5 h-5 text-indigo-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Notification History & Logs</h2>
          <p className="text-xs text-slate-500">System audits, inventory alerts, incoming orders and customer activities</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            icon={CheckCheck}
            onClick={markAllAsRead}
          >
            Mark All Read
          </Button>
          <Button
            variant="ghost"
            size="sm"
            icon={Trash2}
            onClick={clearAllNotifications}
          >
            Clear All
          </Button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-1.5 flex-wrap text-xs">
        {['all', 'unread', 'order', 'inventory', 'payment', 'review'].map((tab) => (
          <Button
            key={tab}
            variant={typeFilter === tab ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setTypeFilter(tab)}
            className="capitalize"
          >
            {tab}
          </Button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-md border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {filteredNotifications.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <Bell className="w-9 h-9 mx-auto mb-2 opacity-30" />
            No notifications found under this filter.
          </div>
        ) : (
          filteredNotifications.map((n) => (
            <div
              key={n.id}
              onClick={() => markAsRead(n.id)}
              className={`p-4 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors ${
                !n.read ? 'bg-blue-50/40' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-100 border border-slate-200 rounded-md mt-0.5">
                  {getNotifIcon(n.type)}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className={`text-xs ${!n.read ? 'font-bold text-slate-900' : 'font-semibold text-slate-700'}`}>
                      {n.title}
                    </p>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                    )}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">{n.description}</p>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                    <Clock className="w-3.5 h-3.5" /> {n.time}
                  </span>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNotification(n.id);
                }}
                className="text-slate-300 hover:text-rose-600 p-1.5 rounded-md hover:bg-slate-100 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
