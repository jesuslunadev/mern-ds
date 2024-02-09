import React, {createContext, useState, useEffect} from 'react';

export const WebSocketContext = createContext();

/**
 * WebSocketProvider component provides a WebSocket connection and message handling.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The children components to be wrapped by WebSocketProvider.
 * @returns {ReactNode} The wrapped components with WebSocket connection and message context.
 */
export const WebSocketProvider = ({children}) => {
  const [ws, setWs] = useState(null);
  const [wsMessage, setWsMessage] = useState(null);

  useEffect(() => {
    const websocket = new WebSocket(process.env.REACT_APP_WS_URL);

    websocket.onmessage = (event) => {
      try {
        setWsMessage(JSON.parse(event.data));
      } catch (e) {
        setWsMessage(null)
      }
    };

    setWs(websocket);

    return () => {
      if (websocket) {
        websocket.close();
      }
    }
  }, []);

  return (
      <WebSocketContext.Provider value={{ws, wsMessage}}>
        {children}
      </WebSocketContext.Provider>
  );
};