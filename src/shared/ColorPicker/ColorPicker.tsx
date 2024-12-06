import { IColorPickerProps } from "../constants/types";
import "./ColorPicker.css";

export const ColorPicker: React.FC<IColorPickerProps> = ({
  value,
  onChange,
}) => {
  return (
    <input
      className="input-color"
      type="color"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
