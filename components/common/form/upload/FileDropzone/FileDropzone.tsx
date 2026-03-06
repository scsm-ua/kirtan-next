import { DragEvent, RefObject } from 'react';
import './FileDropzone.scss';

/**/
interface Props {
  fileInputRef: RefObject<HTMLInputElement | null>;
  onBoxClick: () => void;
  onDrop: (e: DragEvent) => void;
  onFileSelect: (files: FileList | null) => void;
}

/**
 *
 */
export function FileDropzone({
  fileInputRef,
  onBoxClick,
  onDrop,
  onFileSelect
}: Props) {
  const handleDragOver = (e: DragEvent) => e.preventDefault();
  const handleFileSelect = (e) => onFileSelect(e.target.files)

  return (
    <div
      className="AppTextInput--base FileDropzone"
      onClick={onBoxClick}
      onDragOver={handleDragOver}
      onDrop={onDrop}
    >
      <label
        className="FileDropzone__label"
        htmlFor="fileUpload"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="FileDropzone__box">
          <b>Upload image or drag & drop it here</b>
          <span>(2MB max)</span>
        </div>
      </label>

      <input
        accept="image/*"
        className="FileDropzone__input"
        id="fileUpload"
        onChange={handleFileSelect}
        ref={fileInputRef}
        type="file"
      />
    </div>
  );
}
