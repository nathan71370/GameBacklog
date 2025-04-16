import React, { useState } from "react";

interface EndGameModalProps {
  open: boolean;
  initialGrade?: number;
  initialComment?: string;
  onClose: () => void;
  onSave: (grade: number, comment: string) => void;
}

const EndGameModal: React.FC<EndGameModalProps> = ({ open, initialGrade = 0, initialComment = "", onClose, onSave }) => {
  const [grade, setGrade] = useState<number>(initialGrade);
  const [comment, setComment] = useState<string>(initialComment);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-80 shadow-lg relative">
        <h2 className="text-lg font-bold mb-4">Finish Game</h2>
        <label className="block mb-2 text-sm font-medium">Grade (0-10):</label>
        <select
          className="mb-4 w-full px-2 py-1 border rounded"
          value={grade}
          onChange={e => setGrade(Number(e.target.value))}
        >
          {[...Array(11)].map((_, i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
        <label className="block mb-2 text-sm font-medium">Comment (optional):</label>
        <textarea
          className="mb-4 w-full px-2 py-1 border rounded resize-none"
          rows={3}
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Share your thoughts..."
        />
        <div className="flex justify-end gap-2">
          <button className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200" onClick={onClose}>Cancel</button>
          <button className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700" onClick={() => onSave(grade, comment)}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EndGameModal;
