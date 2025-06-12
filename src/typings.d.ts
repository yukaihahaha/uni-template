// 全局要用的类型放到这里

declare global {
  type NWResData<T> = {
    code: number
    msg: string
    data: T
  }


}

export {} // 防止模块污染
