# ReactAutoSizeInput

一个会根据输入内容自动调整宽度的输入框组件。

## 功能特性

- 根据输入内容自动调整输入框宽度
- 支持最小宽度设置
- 支持自定义样式
- 支持禁用状态
- 支持placeholder
- 支持失焦事件

## 安装

```bash
npm install @batype/react-autosize-input
```

## 使用示例

```ts
import ReactAutoSizeInput from '@batype/react-autosize-input';

function App() {
  const [value, setValue] = React.useState('');
  
  return (
    <ReactAutoSizeInput
      value={value}
      onChange={setValue}
      minWidth={10}
      placeholder="请输入"
    />
  );
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 输入框内容 | string | - |
| onChange | 输入内容变化时的回调函数 | (value: string) => void | - |
| onBlur | 失焦时的回调函数 | (value: string) => void | - |
| minWidth | 最小宽度(px) | number | 0 |
| placeholder | 占位符 | string | - |
| disabled | 是否禁用 | boolean | false |
| inputClassName | 输入框的自定义类名 | string | - |
| inputRef | 获取输入框 DOM 元素的引用函数 | (el: HTMLInputElement) => void | - |

## 样式自定义

组件默认提供了基础样式,你可以通过 inputClassName 传入自定义类名来覆盖默认样式。

## 注意事项

1. 组件会自动根据内容调整宽度,但建议设置一个合适的 minWidth 来保证较好的用户体验
2. 组件内部使用了一个隐藏的 span 元素来计算文本宽度,因此需要确保字体相关样式正确设置

## License

MIT
