import { Socket } from 'socket.io';
import logger from '@fiora/utils/logger';

export const PLEASE_LOGIN = '请登录后再试';

/**
 * 拦截未登录用户请求需要登录态的接口
 */
export default function isLogin(socket: Socket) {
    const noRequireLoginEvent = new Set([
        'register',
        'login',
        'loginByToken',
        'guest',
        'getDefaultGroupHistoryMessages',
        'getDefaultGroupOnlineMembers',
        'getBaiduToken',
        'getGroupBasicInfo',
        'getSTS',
    ]);
    return async ([event, , cb]: MiddlewareArgs, next: MiddlewareNext) => {
        logger.trace(`isLogin event: ${event}`)
        if (!noRequireLoginEvent.has(event) && !socket.data.user) {
            cb(PLEASE_LOGIN);
        } else {
            next();
        }
    };
}
