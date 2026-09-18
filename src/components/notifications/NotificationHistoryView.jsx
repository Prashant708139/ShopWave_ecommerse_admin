import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  CheckCheck,
  Trash2,
  ShoppingBag,
  AlertTriangle,
  CreditCard,
  Star,
  Clock,
  Filter
} from 'lucide-react';

export const NotificationHistoryView = () => {
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    clearAllNotifications,
    deleteNotification,
    showToast
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
        return <ShoppingBag className="w-5 h-5 text-blue-500" />;
      case 'inventory':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'payment':
        return <CreditCard className="w-5 h-5 text-emerald-500" />;
      case 'review':
        return <Star className="w-5 h-5 text-yellow-500" />;
      default:
        return <Bell className="w-5 h-5 text-indigo-500" />;
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
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold rounded-xl transition-colors"
          >
            <CheckCheck className="w-4 h-4" /> Mark All Read
          </button>
          <button
            onClick={clearAllNotifications}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-xl transition-colors"
          >
            <Trash2 className="w-4 h-4" /> Clear All
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 flex-wrap text-xs">
        {['all', 'unread', 'order', 'inventory', 'payment', 'review'].map((tab) => (
          <button
            key={tab}
            onClick={() => setTypeFilter(tab)}
            className={`px-3.5 py-1.5 rounded-xl font-semibold capitalize transition-all ${
              typeFilter === tab ? 'bg-blue-600 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {filteredNotifications.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <Bell className="w-10 h-10 mx-auto mb-2 opacity-30" />
            No notifications found under this filter.
          </div>
        ) : (
          filteredNotifications.map((n) => (
            <div
              key={n.id}
              onClick={() => markAsRead(n.id)}
              className={`p-4 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50/80 transition-colors ${
                !n.read ? 'bg-blue-50/20' : ''
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl mt-0.5">
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
                    <Clock className="w-3 h-3" /> {n.time}
                  </span>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNotification(n.id);
                }}
                className="text-slate-300 hover:text-rose-600 p-1.5 rounded-lg hover:bg-slate-100"
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
