import { SchemaVersion } from '../../domain/types/SchemaVersion';

/**
 * Detector de versão de schema para arquivos GCS.
 *
 * Suporta detecção de versão em:
 * - JSON: "version": X ou "schemaversion": X (onde X é 2, 3, 4 ou 5)
 *
 * Para conteúdo malformado ou sem versão identificada, retorna SchemaVersion.UNKNOWN.
 */
export class SchemaDetector {
  /**
   * Detecta a versão do schema em um conteúdo de arquivo.
   *
   * @param content - O conteúdo do arquivo a ser analisado
   * @returns A versão do schema detectada ou SchemaVersion.UNKNOWN se não identificada
   */
  public detect(content: string): SchemaVersion {
    // Tratamento de casos especiais
    if (!content || typeof content !== 'string') {
      return SchemaVersion.UNKNOWN;
    }

    // Remove espaços em branco do início e fim para facilitar a análise
    const trimmedContent = content.trim();

    if (!trimmedContent) {
      return SchemaVersion.UNKNOWN;
    }

    // Tenta detectar versão em JSON
    const jsonVersion = this.detectJsonVersion(trimmedContent);
    if (jsonVersion !== SchemaVersion.UNKNOWN) {
      return jsonVersion;
    }

    return SchemaVersion.UNKNOWN;
  }

  /**
   * Detecta versão em conteúdo JSON usando regex.
   * Busca por padrão "version": seguido de número (2-5).
   */
  private detectJsonVersion(content: string): SchemaVersion {
    // Busca por "version": seguido de número
    // Usa expressão regular para encontrar o padrão
    const versionRegex = /"version"\s*:\s*([2-5])/i;

    try {
      const match = versionRegex.exec(content);
      if (match && match[1]) {
        const version = parseInt(match[1], 10);
        if (version >= 2 && version <= 5) {
          return this.mapNumberToSchemaVersion(version);
        }
      }
    } catch (error) {
      // Em caso de erro na regex, retorna UNKNOWN
    }

    return SchemaVersion.UNKNOWN;
  }

  /**
   * Mapeia um número de versão para o enum SchemaVersion correspondente.
   */
  private mapNumberToSchemaVersion(version: number): SchemaVersion {
    switch (version) {
      case 2:
        return SchemaVersion.V2;
      case 3:
        return SchemaVersion.V3;
      case 4:
        return SchemaVersion.V4;
      case 5:
        return SchemaVersion.V5;
      default:
        return SchemaVersion.UNKNOWN;
    }
  }
}
