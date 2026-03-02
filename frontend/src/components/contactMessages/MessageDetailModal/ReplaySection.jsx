import React, { useState } from 'react';
import { X, Mail, Phone, Calendar, Tag } from 'lucide-react';
import MessageStatusBadge from '../MessageStatusBadge';
import api from '@/services/api';
import toast from 'react-hot-toast';

const ReplaySection = ({ message, replyMessage, setReplyMessage, onUpdate, onClose }) => {
  const [isSendingReply, setIsSendingReply] = useState(false);

  const handleReplyInternal = async () => {
    if (!replyMessage.trim()) {
      toast.error('Reply message cannot be empty');
      return;
    }

    setIsSendingReply(true);
    try {
      // API call to send reply
      const response = await api.patch(`/contact/${message.id}/reply/`, {
        reply_message: replyMessage
      });

      // Log the API response to help with debugging
      console.log('API Response:', response);

      if (response.data.success) {
        // Successful reply
        toast.success(response.data.message || 'Reply sent successfully');
        onUpdate();  // Trigger any update if necessary (e.g., refresh messages)
        onClose();   // Close the reply section or modal
      } else {
        // Handle case when API does not return success
        toast.error('Failed to send reply');
        console.error('Error from API:', response?.data?.message);
      }
    } catch (error) {
      console.error('Error sending reply:', error);
      toast.error('Failed to send reply');
    } finally {
      setIsSendingReply(false);
    }
  };

  if (!message) return null; // If no message, return null

  return (
    <div>
      {/* Reply Section */}
      <div className="pt-4 border-t border-gray-100">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {message.reply_message ? 'Sent Reply' : 'Send a Reply'}
        </label>

        {message.reply_message ? (
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <p className="text-gray-800 whitespace-pre-wrap">{message.reply_message}</p>
            <p className="text-xs text-green-600 mt-2 font-medium italic">Status: Replied via Email</p>
          </div>
        ) : (
          <div className="space-y-3">
            <textarea
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder="Type your reply here..."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#667eea] resize-none"
            />
            <button
              onClick={handleReplyInternal}
              disabled={isSendingReply || !replyMessage.trim()}
              className="w-full px-6 py-2 bg-linear-to-r from-[#667eea] to-[#764ba2] text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSendingReply ? 'Sending Reply...' : 'Send Reply via Email'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReplaySection;