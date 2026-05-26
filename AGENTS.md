# Agent Instructions: Renomeador de Gabaritos

This file contains high-signal, repo-specific guidance for AI agents working in this repository.

## Architecture & Constraints
- **100% Client-Side**: This is a static web application. There is **no backend**. Never create API routes, server actions, or make HTTP requests to send/process images.
- **Static Export**: Built with Next.js (App Router) configured for static export (`output: 'export'`) to be hosted on GitHub Pages.
- **Zero OCR**: The app *only* renames files and pads with zeros. It does not perform Optical Character Recognition (OCR).

## Tech Stack
- Next.js (React), TypeScript, Tailwind CSS.
- File manipulation: native browser APIs (`File`, `Blob`, `FileList`), `jszip` (for in-memory zipping), and `file-saver` (for triggering downloads).

## Core Implementation Details
- **File Input**: Directory selection relies exclusively on `<input type="file" webkitdirectory />`.
- **Memory Management**: Large batches of high-resolution images can cause Out-Of-Memory (OOM) errors in the browser. Always implement batching during zip generation and clean up object references (e.g., clear file arrays to `null`) immediately after download to trigger garbage collection.
- **Sorting**: Files must be sorted alphabetically by their original filename to maintain chronological order from the Lexmark scanner before renaming.

## Code Map Expectations
When scaffolding or modifying the codebase, adhere to this structure:
- `src/app/`: Next.js entry points (static view containers).
- `src/components/ui/`: Dumb/presentational Tailwind components.
- `src/components/`: Feature components (e.g., `FileUploadForm`).
- `src/hooks/`: Orchestration and state management (e.g., `useRenamerLogic`).
- `src/services/`: Pure business logic (e.g., `fileFilter.ts`, `renameEngine.ts`, `zipGenerator.ts`).
- `src/types/` & `src/utils/`: Globals and helpers.
