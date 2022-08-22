// import { reportPageError } from '@/services/common';
import { modelsType } from '@/model/modelsRegister';
import { useModel } from '@/model/plugin-model/useModel';
import ErrorPage from '@/pages/ErrorPage';
import React from 'react';

function connectModel(key: string, name: modelsType, attrKeys?: string[]): any {
  return function (WrappedComponent: ClassDecorator) {
    return function (props: any) {
      const model = useModel(name, (modal) => {
        if (!attrKeys) return { ...modal };
        const obj = {};
        attrKeys.forEach((k) => (obj[k] = modal[k]));
        return obj;
      });
      const data = { [key]: model };
      return <WrappedComponent {...props} {...data} />;
    };
  };
}

@connectModel('initModel', 'useGlobalModel', ['pageInfo'])
export default class ErrorBoundary extends React.Component<any, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    const errInfo = {} as any;
    try {
      const { pageInfo } = this.props.initModel;
      errInfo.userId = pageInfo?.user_id;
      console.log(pageInfo?.user_id);
      // console.error('getDerivedStateFromError', error);
      // TypeError;
      // Cannot read properties of undefined (reading 'b');
      // Cannot read properties...
      const { name, message, stack } = error || {};
      const { componentStack } = errorInfo;
      Object.assign(errInfo, {
        errName: name,
        errMsg: message,
        errStack: stack,
        errComponentStack: componentStack,
      });
    } catch (err: any) {
      const { name, message, stack } = err || {};
      Object.assign(errInfo, {
        errName: name,
        errMsg: message,
        errStack: stack,
      });
    }
    console.log('componentDidCatch', errInfo);
    // todo 你同样可以将错误日志上报给服务器
    // reportPageError(errInfo);
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <ErrorPage />;
    }

    return this.props.children;
  }
}
