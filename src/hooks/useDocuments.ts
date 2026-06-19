import { useCallback, useEffect, useRef, useState } from "react"

import {
  createDocumentId,
  deriveTitle,
  upsertDocument,
  type EditorMode,
  type VitrineDocument,
} from "@/domain/document"
import { WELCOME_HTML, WELCOME_TITLE } from "@/domain/sample"
import { documentRepository } from "@/infrastructure/storage/documentRepository"
import { renderDocument } from "@/services/rendering/renderDocument"

const COMMIT_DELAY = 450
const TITLE_DELAY = 400

type Timer = ReturnType<typeof setTimeout>

interface DocumentsState {
  docs: VitrineDocument[]
  currentId: string | null
  code: string
  title: string
  titleManual: boolean
  mode: EditorMode
  rendered: string
}

const INITIAL_STATE: DocumentsState = {
  docs: [],
  currentId: null,
  code: "",
  title: "",
  titleManual: false,
  mode: "html",
  rendered: "",
}

export interface UseDocumentsResult extends DocumentsState {
  newDocument: () => void
  selectDocument: (id: string) => void
  deleteDocument: (id: string) => void
  clearAll: () => void
  changeCode: (code: string) => void
  changeTitle: (title: string) => void
  setMode: (mode: EditorMode) => void
  saveNow: () => void
}

/**
 * The studio's core use case: the open document, the recents library, and the
 * rules that keep them in sync with localStorage.
 *
 * Editing is debounced — code commits (save + re-render) {@link COMMIT_DELAY}ms
 * after typing stops, the title persists after {@link TITLE_DELAY}ms — so the
 * preview iframe is not rebuilt on every keystroke.
 */
export function useDocuments(): UseDocumentsResult {
  const [state, setState] = useState<DocumentsState>(INITIAL_STATE)

  // Always-fresh mirror so debounced callbacks read the latest values.
  const stateRef = useRef(state)
  stateRef.current = state

  const commitTimer = useRef<Timer | undefined>(undefined)
  const titleTimer = useRef<Timer | undefined>(undefined)

  // Restore the persisted session once, on mount.
  useEffect(() => {
    const docs = documentRepository.loadAll()
    const currentId = documentRepository.loadCurrentId()
    const current = docs.find((doc) => doc.id === currentId)

    let seed: Pick<DocumentsState, "code" | "title" | "titleManual" | "mode" | "currentId">
    if (current) {
      seed = {
        code: current.html,
        title: current.title,
        titleManual: !!current.titleManual,
        mode: current.mode || "html",
        currentId: current.id,
      }
    } else if (docs.length) {
      seed = { code: "", title: "", titleManual: false, mode: "html", currentId: null }
    } else {
      seed = {
        code: WELCOME_HTML,
        title: WELCOME_TITLE,
        titleManual: false,
        mode: "html",
        currentId: null,
      }
    }

    setState({
      ...INITIAL_STATE,
      docs,
      ...seed,
      rendered: renderDocument(seed.code, seed.mode),
    })
  }, [])

  // Drop pending timers when the studio unmounts.
  useEffect(
    () => () => {
      clearTimeout(commitTimer.current)
      clearTimeout(titleTimer.current)
    },
    [],
  )

  const commit = useCallback((code: string) => {
    const snapshot = stateRef.current
    const nextTitle = snapshot.titleManual ? snapshot.title : deriveTitle(code)

    if (!code.trim()) {
      setState((prev) => ({ ...prev, rendered: "", title: nextTitle }))
      return
    }

    const id = snapshot.currentId ?? createDocumentId(Date.now())
    const doc: VitrineDocument = {
      id,
      title: nextTitle,
      html: code,
      titleManual: snapshot.titleManual,
      mode: snapshot.mode,
      updatedAt: Date.now(),
    }
    const docs = upsertDocument(snapshot.docs, doc)
    documentRepository.saveAll(docs)
    documentRepository.saveCurrentId(id)

    setState((prev) => ({
      ...prev,
      docs,
      currentId: id,
      title: nextTitle,
      rendered: renderDocument(code, snapshot.mode),
    }))
  }, [])

  // Flush the pending autosave and persist the current code immediately.
  const saveNow = useCallback(() => {
    clearTimeout(commitTimer.current)
    commit(stateRef.current.code)
  }, [commit])

  const changeCode = useCallback(
    (code: string) => {
      setState((prev) => ({ ...prev, code }))
      clearTimeout(commitTimer.current)
      commitTimer.current = setTimeout(() => commit(code), COMMIT_DELAY)
    },
    [commit],
  )

  const changeTitle = useCallback((title: string) => {
    setState((prev) => ({ ...prev, title, titleManual: true }))
    clearTimeout(titleTimer.current)
    titleTimer.current = setTimeout(() => {
      const snapshot = stateRef.current
      if (!snapshot.currentId) return
      const docs = snapshot.docs.map((doc) =>
        doc.id === snapshot.currentId
          ? { ...doc, title: snapshot.title, titleManual: true }
          : doc,
      )
      documentRepository.saveAll(docs)
      setState((prev) => ({ ...prev, docs }))
    }, TITLE_DELAY)
  }, [])

  const setMode = useCallback((mode: EditorMode) => {
    const snapshot = stateRef.current
    if (mode === snapshot.mode) return

    const docs = snapshot.currentId
      ? snapshot.docs.map((doc) =>
          doc.id === snapshot.currentId ? { ...doc, mode } : doc,
        )
      : snapshot.docs
    if (snapshot.currentId) documentRepository.saveAll(docs)

    setState((prev) => ({
      ...prev,
      mode,
      docs,
      rendered: renderDocument(prev.code, mode),
    }))
  }, [])

  const newDocument = useCallback(() => {
    clearTimeout(commitTimer.current)
    documentRepository.saveCurrentId(null)
    setState((prev) => ({
      ...prev,
      currentId: null,
      code: "",
      title: "",
      titleManual: false,
      rendered: "",
    }))
  }, [])

  const selectDocument = useCallback((id: string) => {
    const snapshot = stateRef.current
    const doc = snapshot.docs.find((item) => item.id === id)
    if (!doc) return

    clearTimeout(commitTimer.current)
    documentRepository.saveCurrentId(id)
    const mode = doc.mode || "html"

    setState((prev) => ({
      ...prev,
      currentId: id,
      code: doc.html,
      title: doc.title,
      titleManual: !!doc.titleManual,
      mode,
      rendered: renderDocument(doc.html, mode),
    }))
  }, [])

  const deleteDocument = useCallback((id: string) => {
    const snapshot = stateRef.current
    const docs = snapshot.docs.filter((doc) => doc.id !== id)
    documentRepository.saveAll(docs)

    if (snapshot.currentId === id) {
      documentRepository.saveCurrentId(null)
      setState((prev) => ({
        ...prev,
        docs,
        currentId: null,
        code: "",
        title: "",
        titleManual: false,
        rendered: "",
      }))
    } else {
      setState((prev) => ({ ...prev, docs }))
    }
  }, [])

  const clearAll = useCallback(() => {
    const snapshot = stateRef.current
    if (!snapshot.docs.length) return

    documentRepository.clear()
    clearTimeout(commitTimer.current)
    setState((prev) => ({
      ...prev,
      docs: [],
      currentId: null,
      code: "",
      title: "",
      titleManual: false,
      rendered: "",
    }))
  }, [])

  return {
    ...state,
    newDocument,
    selectDocument,
    deleteDocument,
    clearAll,
    changeCode,
    changeTitle,
    setMode,
    saveNow,
  }
}
