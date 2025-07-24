/**
 * Simple logging utility for the frontend
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: any;
  context?: string;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private formatMessage(level: LogLevel, context: string, message: string): string {
    const emoji = {
      info: 'ℹ️',
      warn: '⚠️', 
      error: '❌',
      debug: '🔍'
    };
    
    return `${emoji[level]} [${context}] ${message}`;
  }

  private createLogEntry(level: LogLevel, context: string, message: string, data?: any): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      data,
      context
    };
  }

  private shouldLog(level: LogLevel): boolean {
    // In production, only log errors and warnings
    if (!this.isDevelopment) {
      return level === 'error' || level === 'warn';
    }
    return true;
  }

  info(context: string, message: string, data?: any): void {
    if (!this.shouldLog('info')) return;
    
    const logEntry = this.createLogEntry('info', context, message, data);
    console.log(this.formatMessage('info', context, message), data || '');
    
    // In production, you could send this to an external service
    if (!this.isDevelopment) {
      this.sendToExternalService(logEntry);
    }
  }

  warn(context: string, message: string, data?: any): void {
    if (!this.shouldLog('warn')) return;
    
    const logEntry = this.createLogEntry('warn', context, message, data);
    console.warn(this.formatMessage('warn', context, message), data || '');
    
    if (!this.isDevelopment) {
      this.sendToExternalService(logEntry);
    }
  }

  error(context: string, message: string, error?: any): void {
    if (!this.shouldLog('error')) return;
    
    const errorData = {
      message: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
      ...(typeof error === 'object' ? error : {})
    };
    
    const logEntry = this.createLogEntry('error', context, message, errorData);
    console.error(this.formatMessage('error', context, message), errorData);
    
    // Always send errors to external service
    this.sendToExternalService(logEntry);
  }

  debug(context: string, message: string, data?: any): void {
    if (!this.shouldLog('debug')) return;
    
    const logEntry = this.createLogEntry('debug', context, message, data);
    console.debug(this.formatMessage('debug', context, message), data || '');
  }

  private sendToExternalService(logEntry: LogEntry): void {
    // TODO: Implement sending to external logging service
    // Examples: Sentry, LogRocket, DataDog, or your own backend endpoint
    
    if (typeof window !== 'undefined') {
      // Store in localStorage as fallback (with size limit)
      try {
        const logs = JSON.parse(localStorage.getItem('app_logs') || '[]');
        logs.push(logEntry);
        
        // Keep only last 100 logs to prevent storage bloat
        if (logs.length > 100) {
          logs.splice(0, logs.length - 100);
        }
        
        localStorage.setItem('app_logs', JSON.stringify(logs));
      } catch (e) {
        console.warn('Failed to store log in localStorage:', e);
      }
    }
  }

  // Method to retrieve logs for debugging
  getLogs(): LogEntry[] {
    try {
      return JSON.parse(localStorage.getItem('app_logs') || '[]');
    } catch {
      return [];
    }
  }

  // Method to clear stored logs
  clearLogs(): void {
    localStorage.removeItem('app_logs');
  }
}

export const logger = new Logger();
