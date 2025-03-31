interface TextareaProps {
  name: string;
  value: string;
  placeholder?: string;
  rows?: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea: React.FC<TextareaProps> = ({ name, value, placeholder, rows = 5, onChange }) => {
  return <textarea name={name} value={value} onChange={onChange} placeholder={placeholder} required rows={rows} className="bg-background w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:ring-0 focus:outline-none dark:border-gray-700" />;
};

export default Textarea;
