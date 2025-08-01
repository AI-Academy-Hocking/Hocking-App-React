import { useEffect, useState, useRef, useCallback } from 'react';

interface WebSocketHookOptions {
  onOpen?: (event: WebSocketEventMap['open']) => void;
  onMessage?: (event: WebSocketEventMap['message']) => void;
  onClose?: (event: WebSocketEventMap['close']) => void;
  onError?: (event: WebSocketEventMap['error']) => void;
  reconnectInterval?: number;
  reconnectAttempts?: number;
}

interface UseWebSocketReturn {
  socket: WebSocket | null;
  isConnected: boolean;
  lastMessage: MessageEvent<any> | null;
  sendMessage: (data: string | ArrayBufferLike | Blob | ArrayBufferView) => void;
  reconnect: () => void;
}

export function useWebSocket(
  url: string | (() => string),
  options: WebSocketHookOptions = {}
): UseWebSocketReturn {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<MessageEvent<any> | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectCountRef = useRef(0);
  const reconnectTimeoutRef = useRef<number | null>(null);
  
  const {
    onOpen,
    onMessage,
    onClose,
    onError,
    reconnectInterval = 3000,
    reconnectAttempts = 5
  } = options;
  
  const getWebSocketUrl = useCallback(() => {
    if (typeof url === 'function') {
      return url();
    }
    return url;
  }, [url]);
  
  const connect = useCallback(() => {
    // Close existing connection if any
    if (socketRef.current) {
      socketRef.current.close();
    }
    
    // Create new WebSocket connection
    const wsUrl = getWebSocketUrl();
    
    // Validate URL before creating WebSocket
    if (!wsUrl || wsUrl.includes('undefined')) {
      console.warn('Invalid WebSocket URL:', wsUrl);
      return;
    }
    
    try {
      const socket = new WebSocket(wsUrl);
      socketRef.current = socket;
    
    socket.onopen = (event) => {
      setIsConnected(true);
      reconnectCountRef.current = 0;
      onOpen?.(event);
    };
    
    socket.onmessage = (event) => {
      setLastMessage(event);
      onMessage?.(event);
    };
    
    socket.onclose = (event) => {
      setIsConnected(false);
      onClose?.(event);
      
      // Attempt to reconnect if it wasn't a clean close
      if (!event.wasClean && reconnectCountRef.current < reconnectAttempts) {
        reconnectCountRef.current += 1;
        
        if (reconnectTimeoutRef.current) {
          window.clearTimeout(reconnectTimeoutRef.current);
        }
        
        // @ts-ignore - setTimeout returns number in browser
        reconnectTimeoutRef.current = window.setTimeout(() => {
          connect();
        }, reconnectInterval);
      }
    };
    
    socket.onerror = (event) => {
      onError?.(event);
    };
    
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      onError?.(new Event('error'));
    }
    
  }, [getWebSocketUrl, onOpen, onMessage, onClose, onError, reconnectInterval, reconnectAttempts]);
  
  const reconnect = useCallback(() => {
    reconnectCountRef.current = 0;
    connect();
  }, [connect]);
  
  const sendMessage = useCallback((data: string | ArrayBufferLike | Blob | ArrayBufferView) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(data);
    } else {
      console.error('WebSocket is not connected');
    }
  }, []);
  
  // Connect on mount and disconnect on unmount
  useEffect(() => {
    connect();
    
    return () => {
      if (reconnectTimeoutRef.current) {
        window.clearTimeout(reconnectTimeoutRef.current);
      }
      
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [connect]);
  
  return {
    socket: socketRef.current,
    isConnected,
    lastMessage,
    sendMessage,
    reconnect
  };
}