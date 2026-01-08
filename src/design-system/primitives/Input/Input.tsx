import { clsx } from "clsx";
import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";

/**
 * Input component following Hacker House design system
 */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs uppercase tracking-wider text-[#00ff00]"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            "w-full px-4 py-3 bg-[#0a0a0a] border",
            error ? "border-[#ff0000]" : "border-[#00ff0033]",
            "text-white font-mono text-sm",
            "focus:outline-none focus:border-[#00ff00] focus:shadow-[0_0_10px_rgba(0,255,0,0.3)]",
            "transition-all duration-200",
            className,
          )}
          {...props}
        />
        {error && <p className="text-xs text-[#ff0000] font-mono">{error}</p>}
        {helperText && !error && (
          <p className="text-xs text-[#999999] font-mono">{helperText}</p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

/**
 * Textarea component following Hacker House design system
 */
export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const generatedId = useId();
    const textareaId = id || generatedId;
    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-xs uppercase tracking-wider text-[#00ff00]"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={clsx(
            "w-full px-4 py-3 bg-[#0a0a0a] border",
            error ? "border-[#ff0000]" : "border-[#00ff0033]",
            "text-white font-mono text-sm",
            "focus:outline-none focus:border-[#00ff00] focus:shadow-[0_0_10px_rgba(0,255,0,0.3)]",
            "transition-all duration-200 resize-none",
            className,
          )}
          {...props}
        />
        {error && <p className="text-xs text-[#ff0000] font-mono">{error}</p>}
        {helperText && !error && (
          <p className="text-xs text-[#999999] font-mono">{helperText}</p>
        )}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

/**
 * Select component following Hacker House design system
 */
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, id, ...props }, ref) => {
    const generatedId = useId();
    const selectId = id || generatedId;
    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs uppercase tracking-wider text-[#00ff00]"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={clsx(
            "w-full px-4 py-3 bg-[#0a0a0a] border",
            error ? "border-[#ff0000]" : "border-[#00ff0033]",
            "text-white font-mono text-sm",
            "focus:outline-none focus:border-[#00ff00] focus:shadow-[0_0_10px_rgba(0,255,0,0.3)]",
            "transition-all duration-200",
            className,
          )}
          {...props}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-[#0a0a0a]"
            >
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs text-[#ff0000] font-mono">{error}</p>}
      </div>
    );
  },
);
Select.displayName = "Select";

/**
 * Checkbox component following Hacker House design system
 */
export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <label className="flex items-center gap-3 cursor-pointer group">
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            className="peer sr-only"
            {...props}
          />
          <div className="w-5 h-5 border border-[#00ff0033] bg-[#0a0a0a] peer-checked:bg-[#00ff00] peer-checked:border-[#00ff00] transition-all duration-200 peer-focus:shadow-[0_0_10px_rgba(0,255,0,0.3)]" />
          <svg
            className="absolute top-0.5 left-0.5 w-4 h-4 text-black opacity-0 peer-checked:opacity-100 transition-opacity"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <polyline
              points="20 6 9 17 4 12"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {label && (
          <span className="text-sm text-white font-mono group-hover:text-[#00ff00] transition-colors">
            {label}
          </span>
        )}
      </label>
    );
  },
);
Checkbox.displayName = "Checkbox";

/**
 * Radio component following Hacker House design system
 */
export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <label className="flex items-center gap-3 cursor-pointer group">
        <div className="relative">
          <input ref={ref} type="radio" className="peer sr-only" {...props} />
          <div className="w-5 h-5 rounded-full border border-[#00ff0033] bg-[#0a0a0a] peer-checked:border-[#00ff00] transition-all duration-200 peer-focus:shadow-[0_0_10px_rgba(0,255,0,0.3)]" />
          <div className="absolute top-1.5 left-1.5 w-2 h-2 rounded-full bg-[#00ff00] opacity-0 peer-checked:opacity-100 transition-opacity" />
        </div>
        {label && (
          <span className="text-sm text-white font-mono group-hover:text-[#00ff00] transition-colors">
            {label}
          </span>
        )}
      </label>
    );
  },
);
Radio.displayName = "Radio";
