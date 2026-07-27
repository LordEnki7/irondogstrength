// Lightweight alert dialog replacement
import React from "react";

interface AlertDialogProps {
  children: React.ReactNode;
}

interface AlertDialogTriggerProps {
  children: React.ReactNode;
  onClick?: () => void;
}

interface AlertDialogContentProps {
  children: React.ReactNode;
  className?: string;
}

interface AlertDialogHeaderProps {
  children: React.ReactNode;
}

interface AlertDialogTitleProps {
  children: React.ReactNode;
}

interface AlertDialogDescriptionProps {
  children: React.ReactNode;
}

interface AlertDialogFooterProps {
  children: React.ReactNode;
}

interface AlertDialogActionProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

interface AlertDialogCancelProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export function AlertDialog({ children }: AlertDialogProps) {
  return <div>{children}</div>;
}

export function AlertDialogTrigger({ children, onClick }: AlertDialogTriggerProps) {
  return <button onClick={onClick}>{children}</button>;
}

export function AlertDialogContent({ children, className = "" }: AlertDialogContentProps) {
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${className}`}>
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        {children}
      </div>
    </div>
  );
}

export function AlertDialogHeader({ children }: AlertDialogHeaderProps) {
  return <div className="mb-4">{children}</div>;
}

export function AlertDialogTitle({ children }: AlertDialogTitleProps) {
  return <h3 className="text-lg font-semibold">{children}</h3>;
}

export function AlertDialogDescription({ children }: AlertDialogDescriptionProps) {
  return <p className="text-sm text-gray-600 mt-2">{children}</p>;
}

export function AlertDialogFooter({ children }: AlertDialogFooterProps) {
  return <div className="flex justify-end space-x-2 mt-6">{children}</div>;
}

export function AlertDialogAction({ children, onClick, className = "" }: AlertDialogActionProps) {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${className}`}
    >
      {children}
    </button>
  );
}

export function AlertDialogCancel({ children, onClick }: AlertDialogCancelProps) {
  return (
    <button 
      onClick={onClick}
      className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
    >
      {children}
    </button>
  );
}