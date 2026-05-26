import { describe, it, expect } from 'vitest';
import { filterAndSortFiles } from './fileFilter';
import { generateRenamedFiles } from './renameEngine';

// Mock simples da classe File do navegador para testes no Node
class MockFile {
  name: string;
  type: string;
  size: number;
  
  constructor(parts: any[], name: string, options: { type?: string } = {}) {
    this.name = name;
    this.type = options.type || '';
    this.size = parts.length;
  }
}

// Sobrescrevendo a global File no ambiente de teste
global.File = MockFile as any;

describe('Testes do PRD - Renomeador de Gabaritos', () => {

  describe('Teste 02: Filtragem de Extensões (RF02)', () => {
    it('Deve ignorar PNG e PDF, mantendo apenas JPG/JPEG', () => {
      const mockFiles = [
        new File([], 'imagem1.jpg', { type: 'image/jpeg' }),
        new File([], 'imagem2.png', { type: 'image/png' }),
        new File([], 'documento.pdf', { type: 'application/pdf' }),
        new File([], 'imagem3.JPEG', { type: 'image/jpeg' })
      ];

      const filtered = filterAndSortFiles(mockFiles as any);
      
      expect(filtered).toHaveLength(2);
      expect(filtered.map(f => f.name)).toEqual(['imagem1.jpg', 'imagem3.JPEG']);
    });
  });

  describe('Teste 03: Validação da Ordenação Lexmark (RF05)', () => {
    it('Deve ordenar arquivos cronologicamente/alfabeticamente antes da renomeação', () => {
      const mockFiles = [
        new File([], 'scan_1003.jpg', { type: 'image/jpeg' }),
        new File([], 'scan_1001.jpg', { type: 'image/jpeg' }),
        new File([], 'scan_1002.jpg', { type: 'image/jpeg' })
      ];

      const filteredAndSorted = filterAndSortFiles(mockFiles as any);
      
      expect(filteredAndSorted.map(f => f.name)).toEqual([
        'scan_1001.jpg',
        'scan_1002.jpg',
        'scan_1003.jpg'
      ]);

      const renamed = generateRenamedFiles(filteredAndSorted as any, { prefix: 'ORDEM_', padding: 1 });
      
      expect(renamed[0].newName).toBe('ORDEM_1.jpg');
      expect(renamed[1].newName).toBe('ORDEM_2.jpg');
      expect(renamed[2].newName).toBe('ORDEM_3.jpg');
    });
  });

  describe('Teste 04: Regra das Casas Decimais (RF04, RF06)', () => {
    it('Deve preencher zeros à esquerda conforme configurado', () => {
      // Criar 15 mock files em ordem
      const mockFiles = Array.from({ length: 15 }, (_, i) => 
        new File([], `img_${i + 1}.jpg`, { type: 'image/jpeg' })
      );

      const renamed = generateRenamedFiles(mockFiles as any, { prefix: 'GABARITO_', padding: 3 });
      
      expect(renamed).toHaveLength(15);
      expect(renamed[0].newName).toBe('GABARITO_001.jpg');
      expect(renamed[1].newName).toBe('GABARITO_002.jpg');
      expect(renamed[14].newName).toBe('GABARITO_015.jpg');
    });
  });
});
