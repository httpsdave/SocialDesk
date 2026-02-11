import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      position="top-right"
      toastOptions={{
        style: {
          background: 'white',
          color: '#1f2937',
          border: '1px solid #e5e7eb',
        },
        classNames: {
          toast: 'group toast',
          title: 'text-sm font-medium',
          description: 'text-sm text-gray-600',
          actionButton: 'bg-purple-600 text-white hover:bg-purple-700',
          cancelButton: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
