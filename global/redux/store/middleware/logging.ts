import {SettingsAction, SettingsState} from "../../reducers/settingsReducer";

const loggingMiddleware = (store : any) => (next : Function) => (action : any) => {
    console.info('%cINFO:', 'color: yellow', `Dispatching a ${action.type} action with payload:`, action);
    const result = next(action);
    console.info('%cNext State:','color: cyan', store);
    return result;
};

export default loggingMiddleware;
