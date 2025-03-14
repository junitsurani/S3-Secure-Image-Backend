interface InputProps {
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  const Input = ({ label, type, value, onChange }: InputProps) => {
    return (
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">{label}</label>
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
    );
  };
  
  export default Input;
  