export type ParseResult = {
  success: boolean;
  data: Record<string, unknown> | null;
  errors: string[];
};
