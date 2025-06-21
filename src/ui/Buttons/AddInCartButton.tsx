import { memo, type FC } from "react";

interface AddInCartButtonProps {
  src: string;
  onClick: () => void;
  title: string;
  alt: string;
  value?: number;
}
export const AddInCartButton: FC<AddInCartButtonProps> = memo(
  ({ src, onClick, title, alt, value }) => {
    return (
      <button className="button button--outline button--add" onClick={onClick}>
        <img src={src} alt={alt} />
        <span>{title}</span>
        <i>{value}</i>
      </button>
    );
  }
);
