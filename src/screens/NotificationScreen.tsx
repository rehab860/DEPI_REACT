import { Check, Bell, Info, ShieldAlert, Sparkles, CheckCheck } from 'lucide-react';
import { AppNotification } from '../types';

interface NotificationScreenProps {
  notifications: AppNotification[];
  onMarkAllAsRead: () => void;
  onToggleRead: (notificationId: string) => void;
  onClearNotification: (notificationId: string) => void;
}

export default function NotificationScreen({
  notifications,
  onMarkAllAsRead,
  onToggleRead,
  onClearNotification
}: NotificationScreenProps) {
  
  const todayNotifications = notifications.filter(n => n.isToday);
  const earlierNotifications = notifications.filter(n => !n.isToday);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="notification-history-page">
      
      {/* Title Header area */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold tracking-widest text-[#6366f1] uppercase font-mono block">COMMUNITY FEED</span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
            Notifications Center
          </h1>
          <p className="text-xs text-slate-500 font-sans">
            Stay updated with peer scorecard helpful upvotes, hiring pipeline alerts, and system database revisions.
          </p>
        </div>

        {/* Mark as read button */}
        {notifications.some(n => !n.read) && (
          <button
            onClick={onMarkAllAsRead}
            className="text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-2xs flex items-center space-x-1.5 cursor-pointer max-w-fit"
            id="mark-all-read-btn"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark all as read</span>
          </button>
        )}
      </div>

      {/* Primary Stack List */}
      <div className="space-y-8" id="notifications-primary-list">
        
        {/* Section 1: Today vs Yesterday */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-bold tracking-widest text-slate-400 uppercase font-mono border-b border-slate-50 pb-1">
            Today & Yesterday
          </h3>
          
          {todayNotifications.length > 0 ? (
            <div className="space-y-3" id="today-notifications-container">
              {todayNotifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => onToggleRead(n.id)}
                  className={`border rounded-xl p-4 sm:p-5 flex items-start justify-between gap-4 transition-all hover:bg-slate-50/50 cursor-pointer ${
                    n.read 
                      ? 'bg-white border-slate-100 text-slate-600' 
                      : 'bg-indigo-50/30 border-indigo-100 text-slate-900 shadow-2xs'
                  }`}
                  id={`notif-${n.id}`}
                >
                  <div className="flex items-start space-x-3.5">
                    {/* Category Icons */}
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                      n.category === 'Match' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                      n.category === 'Activity' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {n.category === 'Match' ? <Sparkles className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-xs">{n.title}</h4>
                        {!n.read && (
                          <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                        )}
                      </div>
                      <p className="text-xs text-slate-500 font-sans leading-relaxed">{n.description}</p>
                    </div>
                  </div>

                  <div className="text-right text-[10px] text-slate-400 font-mono flex flex-col justify-between h-full min-w-[60px] shrink-0">
                    <span>{n.timeSimple}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onClearNotification(n.id);
                      }}
                      className="text-[9px] text-slate-400 hover:text-slate-900 mt-2 cursor-pointer uppercase font-mono"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl bg-white text-xs text-slate-400">
              No notifications for today.
            </div>
          )}
        </div>

        {/* Section 2: Earlier */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-bold tracking-widest text-slate-400 uppercase font-mono border-b border-slate-50 pb-1">
            Earlier Activity
          </h3>

          {earlierNotifications.length > 0 ? (
            <div className="space-y-3" id="earlier-notifications-container">
              {earlierNotifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => onToggleRead(n.id)}
                  className={`border rounded-xl p-4 sm:p-5 flex items-start justify-between gap-4 transition-all hover:bg-slate-50/50 cursor-pointer ${
                    n.read 
                      ? 'bg-white border-slate-100 text-slate-500' 
                      : 'bg-indigo-50/30 border-indigo-100 text-slate-900'
                  }`}
                  id={`notif-${n.id}`}
                >
                  <div className="flex items-start space-x-3.5">
                    <div className="h-8 w-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
                      <Bell className="w-4 h-4" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-xs text-slate-800">{n.title}</h4>
                        {!n.read && (
                          <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 animate-pulse" />
                        )}
                      </div>
                      <p className="text-xs text-slate-500 font-sans leading-relaxed">{n.description}</p>
                    </div>
                  </div>

                  <div className="text-right text-[10px] text-slate-400 font-mono flex flex-col justify-between h-full min-w-[60px] shrink-0">
                    <span>{n.timeSimple}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onClearNotification(n.id);
                      }}
                      className="text-[9px] text-slate-400 hover:text-slate-900 mt-2 cursor-pointer uppercase font-mono"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl bg-white text-xs text-slate-400">
              No earlier activity.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
