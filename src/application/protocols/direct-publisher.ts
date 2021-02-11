export interface DirectPublisher {
  publishDirect: <T = unknown>(key: string, params: T) => Promise<void>;
}
