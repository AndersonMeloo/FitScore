import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface InputProps {
    placeholder: string,
    password?: boolean,
    // filled?: boolean,
    value?: string,
    required?: boolean,
    onChange?: (newValue: string) => void,
    className?: string
}
// filled
function Input({ placeholder, password, value, required, onChange }: InputProps) {

    const [showPassword, setShowPassword] = useState(false)

    return (

        <>
            <div className="flex items-center gap-2 border rounded px-2">
                <input
                    type={password && !showPassword ? 'password' : 'text'}
                    placeholder={placeholder}
                    value={value}
                    onChange={e => onChange && onChange(e.target.value)}
                    required={required}
                    className="flex-1 outline-none bg-transparent"
                />

                {password && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                )}
            </div>
            <p>teste</p>
        </>
    );
}

export default Input;