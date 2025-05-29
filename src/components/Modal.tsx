import { X } from "lucide-react";
import type { ReactNode } from "react";

const Modal = ({ children, isOpen, onClose, title }: ModalProps) => {
  if (!children || !isOpen) return null;
  return (
    <div
      className=" bg-black/50 fixed inset-0 flex items-center justify-center h-screen overflow-hidden p-2"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-lg bg-white p-4 rounded-lg shadow-lg space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{title || ""}</h2>
          <button className=" cursor-pointer" onClick={onClose}>
            <X className="size-5 text-orange-800" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}
