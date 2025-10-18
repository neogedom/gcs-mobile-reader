// Interface para parsers de arquivos .gcs (JSON)
import { ParseResult } from '../types/ParseResult';
import { SchemaVersion } from '../types/SchemaVersion';

export interface IFileParser {
  parseFile(content: string): Promise<ParseResult>;
  detectSchema(content: string): SchemaVersion;
}
