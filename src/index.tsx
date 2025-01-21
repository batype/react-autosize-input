import classNames from "classnames";
import React, { memo, useCallback, useEffect, useMemo, useRef } from "react";
import "./index.css";

interface ReactAutoSizeInputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  placeholder?: string;
  minWidth: number;
  inputStyle?: React.CSSProperties;
  inputClassName?: string;
  disabled?: boolean;
  inputRef?: (el: any) => void;
}

const ReactAutoSizeInput: React.FC<ReactAutoSizeInputProps> = memo(
  ({
    defaultValue,
    value: propValue,
    onChange,
    onBlur,
    placeholder = "",
    minWidth = 12,
    inputStyle,
    inputClassName,
    disabled,
    ...rest
  }) => {
    const measureRef = useRef<HTMLDivElement>(null);
    const editableRef = useRef<HTMLDivElement>(null);

    const isFirstRender = useRef(true);

    // 处理 defaultValue 的初始化
    useEffect(() => {
      if (isFirstRender.current && editableRef.current) {
        if (defaultValue !== undefined) {
          editableRef.current.textContent = defaultValue;
        }
        isFirstRender.current = false;
      }
    }, [defaultValue]);

    const handleInput = useCallback(
      (e: React.FormEvent<HTMLDivElement>) => {
        const newValue = e.currentTarget.textContent || "";
        // saveCursorPosition();
        onChange?.(newValue);
      },
      [onChange]
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLDivElement>) => {
        const newValue = e.currentTarget.textContent || "";
        onBlur?.(newValue);
      },
      [onBlur]
    );

    useEffect(() => {
      if (
        editableRef.current &&
        propValue !== undefined &&
        propValue !== editableRef.current.textContent
      ) {
        editableRef.current.textContent = propValue;
      }
    }, [propValue]);

    const computedStyle = useMemo(
      () => ({
        ...inputStyle,
        display: "inline-block",
        cursor: !disabled ? "text" : "not-allowed",
        minWidth: minWidth ?? "10px",
        paddingRight: "2px",
      }),
      [inputStyle, disabled, minWidth]
    );

    const editableRefCallback = (el: HTMLDivElement) => {
      editableRef.current = el;
      if (typeof rest.inputRef === "function") {
        rest.inputRef(el);
      }
    };

    // 添加处理回车键的函数
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      },
      []
    );

    return (
      <>
        <div
          ref={measureRef}
          className='auto-width-input-measure-element'
          aria-hidden='true'
        />
        <div
          className={classNames("auto-width-input-container", inputClassName)}>
          <div
            ref={editableRefCallback}
            contentEditable={!disabled}
            onInput={handleInput}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onPaste={(e) => {
              e.preventDefault();
              // 获取纯文本
              const text = e.clipboardData.getData("text/plain");
              editableRef.current.textContent = text;
            }}
            className={classNames("auto-width-input", inputClassName)}
            style={computedStyle}
            data-placeholder={placeholder}
            suppressContentEditableWarning
          />
        </div>
      </>
    );
  }
);

ReactAutoSizeInput.displayName = "ReactAutoSizeInput";

export default ReactAutoSizeInput;
