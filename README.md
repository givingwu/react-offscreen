# react-offscreen

keep-alive的react版本，它基于Suspense实现，通过它我们可以实现在切换组件时不销毁组件，以达到状态保持的目的。

## 使用方法

```typescript
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Offscreen } from 'react-offscreen';

const Count = () => {
  const [count, setCount] = useState(0);

  return <p onClick={() => setCount(count + 1)}>{count}</p>;
};

const App = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setVisible(!open)}>{open}</button>
      <Offscreen mode={open ? 'visible' : 'hidden'}>
        <Count />
      </Offscreen>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
```

## 注意

如果你使用的react18，且使用了concurrent feature，那么需要注意由concurrent feature触发更新引起的组件挂起不会切换回退显示，所以如果出现mode为hidden时子组件无法隐藏的话请改为同步渲染即可正常工作，具体可以参考https://zh-hans.react.dev/reference/react/Suspense#preventing-already-revealed-content-from-hiding

### 错误示例
```typescript
import { useState, startTransition } from 'react';
import ReactDOM from 'react-dom/client';
import { Offscreen } from 'react-offscreen';

const Count = () => {
  const [count, setCount] = useState(0);

  return <p onClick={() => setCount(count + 1)}>{count}</p>;
};

const App = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => startTransition(() => setVisible(!open))}>{open}</button>
      <Offscreen mode={open ? 'visible' : 'hidden'}>
        <Count />
      </Offscreen>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
```
### 正确示例
移除startTransition或者useDeferredValue即可
```typescript
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Offscreen } from 'react-offscreen';

const Count = () => {
  const [count, setCount] = useState(0);

  return <p onClick={() => setCount(count + 1)}>{count}</p>;
};

const App = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setVisible(!open)}>{open}</button>
      <Offscreen mode={open ? 'visible' : 'hidden'}>
        <Count />
      </Offscreen>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
```

## Activity
由于react官方已经将Offscreen重名民为Activity，为了与官方保持一致，我们同时导出了Offscreen和Activity。

## unstable hooks
我们实验性的支持了激活 失活的hooks，但是它的执行时机是晚于Effect的，这与react未来规划不符，所以我们不准备将其合并至主分支，有兴趣的可以自行fork使用。
具体可以参考https://github.com/IVLIU/react-offscreen/tree/feat/unstable-hooks
```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Offscreen, useActivated } from 'react-offscreen';

const Count = () => {
  const [count, setCount] = React.useState(0);

  useActivated(() => {
    console.log('activated');
    return () => {
      console.log('deactivated')
    }
  });

  return <p onClick={() => setCount(count + 1)}>{count}</p>;
};

const App = () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <div>
      <button onClick={() => setVisible(!visible)}>{visible}</button>
      <Offscreen mode={visible ? 'visible' : 'hidden'}>
        <Count />
      </Offscreen>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
```

## 注意
仅支持react 17版本及以上