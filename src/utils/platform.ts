/*
 * @Author: 你我
 * @Date: 2025-06-07 19:13:55
 * @Last Modified by: 你我
 * @Last Modified time: 2025-06-07 19:24:55
 */
export const platform = __UNI_PLATFORM__
export const isH5 = __UNI_PLATFORM__ === 'h5'
export const isApp = __UNI_PLATFORM__ === 'app'
export const isMp = __UNI_PLATFORM__.startsWith('mp-')
export const isMpWeixin = __UNI_PLATFORM__.startsWith('mp-weixin')
export const isMpAplipay = __UNI_PLATFORM__.startsWith('mp-alipay')
export const isMpToutiao = __UNI_PLATFORM__.startsWith('mp-toutiao')

const PLATFORM = {
  platform,
  isH5,
  isApp,
  isMp,
  isMpWeixin,
  isMpAplipay,
  isMpToutiao,
}
export default PLATFORM
