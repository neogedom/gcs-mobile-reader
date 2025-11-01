export type ParseResult<T = Record<string, unknown>> = {
  success: boolean;
  data: T | null;
  errors: string[];
};
